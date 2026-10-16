import { randomUUID } from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

import type { SetTarget } from "@/lib/progression/engine";
import { DEFAULT_SET_COUNT, targetsFor } from "@/lib/progression/slot-targets";
import { useLastPerformances, useSaveExercise } from "@/lib/queries/exercises";
import { useActiveProgram } from "@/lib/queries/programs";
import { useSession, useUpdateSession } from "@/lib/queries/sessions";
import {
	setsToArrays,
	type Movement,
	type Slot,
	type Trophy,
} from "@/lib/queries/types";

import {
	completeStep,
	createDraft,
	exercisesToSend,
	goToStep,
	hasUnsent,
	isFinished,
	markSent,
	setRest,
	skipStep,
	type SessionDraft,
} from "./draft";
import { clearDraft, loadDraft, saveDraft } from "./draft-storage";
import { adjustRest, type RestTimer } from "./rest";
import { scheduleRestNotification } from "./rest-notification";
import { buildSetQueue, type QueueStep } from "./set-queue";

// A poor connection can leave a request hanging: give up so the next change or foreground retries.
// A late success is harmless, the write is idempotent on the logged exercise id.
const SEND_TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		const timer = setTimeout(
			() => reject(new Error("Pas de réponse du serveur")),
			SEND_TIMEOUT_MS,
		);
		promise.then(
			(value) => {
				clearTimeout(timer);
				resolve(value);
			},
			(error) => {
				clearTimeout(timer);
				reject(error);
			},
		);
	});
}

function queueSlots(slots: Slot[]) {
	return slots.map((slot) => ({
		id: slot.id,
		movementId: slot.movement_id,
		position: slot.position,
		supersetGroup: slot.superset_group,
		restSeconds: slot.rest_seconds,
		unilateral: slot.movement.unilateral,
		restPerSide: slot.rest_per_side,
		sets:
			slot.set_prescriptions.length > 0
				? slot.set_prescriptions.map((p) => ({
						position: p.position,
						restSeconds: p.rest_seconds,
					}))
				: Array.from({ length: DEFAULT_SET_COUNT }, (_, i) => ({
						position: i + 1,
						restSeconds: null,
					})),
	}));
}

/**
 * State of a guided session: the day's set queue, the draft kept on the device, the rest timer and
 * the writes to the server (one logged exercise per slot, retried until confirmed). ADR-0002.
 */
export function useGuidedSession(sessionId: string) {
	const sessionQuery = useSession(sessionId);
	const programQuery = useActiveProgram();
	const saveExercise = useSaveExercise();
	const updateSession = useUpdateSession();

	const day =
		programQuery.data?.program_days.find(
			(d) => d.id === sessionQuery.data?.program_day_id,
		) ?? null;
	const slots = day?.slots ?? [];
	const queue = buildSetQueue(queueSlots(slots));
	const lastPerformances = useLastPerformances(
		slots.map((slot) => slot.movement_id),
	);

	const [draft, setDraft] = useState<SessionDraft | null>(null);
	const [now, setNow] = useState(() => Date.now());
	const [sendError, setSendError] = useState<string | null>(null);
	const [isSending, setIsSending] = useState(false);
	const [newTrophies, setNewTrophies] = useState<Trophy[]>([]);
	const draftRef = useRef<SessionDraft | null>(null);
	const sendingRef = useRef(false);

	// Every change goes through here: state, then device storage
	const apply = (change: (current: SessionDraft) => SessionDraft) => {
		if (!draftRef.current) return;
		const next = change(draftRef.current);
		draftRef.current = next;
		setDraft(next);
		// A rest may have just started: render it from the current clock, not the last tick
		setNow(() => Date.now());
		saveDraft(next).catch((error) =>
			console.warn("Guided session draft:", error),
		);
	};

	const slotOf = (step: QueueStep) =>
		slots.find((slot) => slot.id === step.slotId) ?? null;
	const movementOf = (step: QueueStep): Movement | null =>
		slotOf(step)?.movement ?? null;

	const targetOf = (step: QueueStep): SetTarget | null => {
		const slot = slotOf(step);
		if (!slot) return null;
		const last = lastPerformances.byMovement.get(slot.movement_id);
		const { reps, weights } = setsToArrays(last?.logged_sets ?? []);
		const lastSets = reps.map((r, i) => ({ reps: r, weight: weights[i] }));
		return targetsFor(slot, slot.movement, lastSets)[step.setIndex] ?? null;
	};

	const send = async (options: { includeIncomplete?: boolean } = {}) => {
		if (sendingRef.current || !draftRef.current) return;
		const payloads = exercisesToSend(draftRef.current, queue, options);
		if (payloads.length === 0) return;
		sendingRef.current = true;
		setIsSending(true);
		try {
			for (const payload of payloads) {
				const result = await withTimeout(
					saveExercise.mutateAsync({
						id: payload.id,
						movementId: payload.movementId,
						slotId: payload.slotId,
						sessionId,
						comment: "",
						sets: payload.sets,
					}),
				);
				if (result.new_trophies.length > 0) {
					setNewTrophies((prev) => [...prev, ...result.new_trophies]);
				}
				apply((current) => markSent(current, payload.slotId, payload.revision));
			}
			setSendError(null);
		} catch (error) {
			setSendError(error instanceof Error ? error.message : "Envoi impossible");
		} finally {
			sendingRef.current = false;
			setIsSending(false);
		}
	};

	const nextLabel = (index: number) => {
		const step = queue[index];
		const movement = step ? movementOf(step) : null;
		return movement ? `${movement.name}, série ${step.setIndex + 1}` : null;
	};

	const complete = (index: number, values: { weight: number; reps: number }) =>
		apply((current) =>
			completeStep(current, queue, index, values, new Date(), randomUUID),
		);
	const skip = (index: number) =>
		apply((current) => skipStep(current, queue, index, new Date()));
	const goTo = (index: number) =>
		apply((current) => goToStep(current, queue, index, new Date()));
	const changeRest = (deltaSeconds: number) =>
		apply((current) =>
			current.rest
				? setRest(
						current,
						adjustRest(current.rest, deltaSeconds, Date.now()),
						new Date(),
					)
				: current,
		);
	const stopRest = () => apply((current) => setRest(current, null, new Date()));

	// Sends what is left, then closes the session. False when something could not be sent.
	const finish = async (): Promise<boolean> => {
		await send({ includeIncomplete: true });
		if (!draftRef.current || hasUnsent(draftRef.current)) return false;
		await updateSession.mutateAsync({
			id: sessionId,
			changes: { ended_at: new Date().toISOString(), is_done: true },
		});
		scheduleRestNotification(null, null);
		await clearDraft(sessionId);
		return true;
	};

	const discard = async () => {
		scheduleRestNotification(null, null);
		await clearDraft(sessionId);
	};

	// Load the draft of this session, or start one
	useEffect(() => {
		let cancelled = false;
		loadDraft(sessionId).then((stored) => {
			if (cancelled) return;
			const initial = stored ?? createDraft(sessionId, new Date());
			draftRef.current = initial;
			setDraft(initial);
			if (!stored) saveDraft(initial).catch(() => {});
		});
		return () => {
			cancelled = true;
		};
	}, [sessionId]);

	// Record when the guided session started
	const startedAt = sessionQuery.data?.started_at;
	const draftStartedAt = draft?.startedAt;
	useEffect(() => {
		if (!sessionQuery.data || startedAt || !draftStartedAt) return;
		updateSession.mutate({
			id: sessionId,
			changes: { started_at: draftStartedAt },
		});
	}, [sessionQuery.data, startedAt, draftStartedAt]);

	// Write each exercise as soon as its slot is done
	useEffect(() => {
		if (draft && day) send();
	}, [draft, day]);

	// One notification for the end of the rest, replaced whenever the timer changes
	const rest: RestTimer | null = draft?.rest ?? null;
	const restKey = rest ? `${rest.startedAt}:${rest.durationSeconds}` : null;
	// The label is part of the key: after a relaunch the program loads after the draft
	const restLabel = draft ? nextLabel(draft.stepIndex) : null;
	useEffect(() => {
		scheduleRestNotification(rest, restLabel);
	}, [restKey, restLabel]);

	// Tick only while resting; coming back to the foreground re-reads the clock and retries sends
	useEffect(() => {
		if (!restKey) return;
		const interval = setInterval(() => setNow(Date.now()), 250);
		return () => clearInterval(interval);
	}, [restKey]);
	useEffect(() => {
		const subscription = AppState.addEventListener("change", (state) => {
			if (state !== "active") return;
			setNow(Date.now());
			send();
		});
		return () => subscription.remove();
	}, [day]);

	return {
		isLoading:
			sessionQuery.isLoading ||
			programQuery.isLoading ||
			lastPerformances.isLoading ||
			!draft,
		session: sessionQuery.data ?? null,
		day,
		queue,
		draft,
		now,
		isFinished: draft ? isFinished(draft, queue) : false,
		unsentCount: draft ? exercisesToSend(draft, queue).length : 0,
		hasUnsent: draft ? hasUnsent(draft) : false,
		isSending,
		sendError,
		newTrophies,
		slotOf,
		movementOf,
		targetOf,
		complete,
		skip,
		goTo,
		changeRest,
		stopRest,
		retry: () => send(),
		finish,
		discard,
	};
}
