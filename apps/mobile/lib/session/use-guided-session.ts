import { useIsRestoring } from "@tanstack/react-query";
import { randomUUID } from "expo-crypto";
import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

import {
	DEFAULT_INCREMENT,
	roundToIncrement,
	warmupRamp,
	type SetTarget,
} from "@/lib/progression/engine";
import { DEFAULT_SET_COUNT, targetsFor } from "@/lib/progression/slot-targets";
import { queryClient } from "@/lib/queries/client";
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
	currentIndex,
	exercisesToSend,
	goToStep,
	hasUnsent,
	isFinished,
	markSent,
	setRest,
	skipLoggedElsewhere,
	skipStep,
	swapMovement,
	type SessionDraft,
} from "./draft";
import { clearDraft, loadDraft, saveDraft } from "./draft-storage";
import { adjustRest, type RestTimer } from "./rest";
import { scheduleRestNotification } from "./rest-notification";
import {
	buildSetQueue,
	partLabel,
	type QueueSlot,
	type QueueStep,
} from "./set-queue";

// A poor connection can leave a request hanging: give up so the next change or foreground retries.
// A late success is harmless, the write is idempotent on the logged exercise id.
const SEND_TIMEOUT_MS = 15_000;

// Offline, a request can hang instead of failing: past this delay, render from what the device has
const LOAD_TIMEOUT_MS = 10_000;

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

// Movement done for a slot this session: its own, or the alternative picked in the draft
function movementFor(slot: Slot, swaps: Record<string, string>): Movement {
	const swapped = swaps[slot.id];
	return (
		slot.alternatives.find((a) => a.movement.id === swapped)?.movement ??
		slot.movement
	);
}

function queueSlots(
	slots: Slot[],
	swaps: Record<string, string>,
	firstTargets: Map<string, number | null>,
): QueueSlot[] {
	return slots.map((slot) => {
		const movement = movementFor(slot, swaps);
		const working = firstTargets.get(slot.id) ?? null;
		return {
			id: slot.id,
			movementId: movement.id,
			position: slot.position,
			supersetGroup: slot.superset_group,
			restSeconds: slot.rest_seconds,
			unilateral: movement.unilateral,
			measure: movement.measure,
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
			// Key lifts with an external load warm up from the empty bar to the first target
			warmup:
				slot.is_key_lift &&
				movement.load_type === "external" &&
				movement.measure !== "duration" &&
				working
					? warmupRamp({ workingWeight: working })
					: [],
			finisher: slot.finisher_kind
				? {
						kind: slot.finisher_kind,
						count: slot.finisher_count ?? 1,
						restSeconds: slot.finisher_rest_seconds,
						movementId: slot.finisher_movement_id,
					}
				: null,
		};
	});
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
	// The device copy of the queries is being read back (lib/queries/persist.ts)
	const isRestoring = useIsRestoring();

	const day =
		programQuery.data?.program_days.find(
			(d) => d.id === sessionQuery.data?.program_day_id,
		) ?? null;
	const slots = day?.slots ?? [];

	const [draft, setDraft] = useState<SessionDraft | null>(null);
	const [now, setNow] = useState(() => Date.now());
	const [sendError, setSendError] = useState<string | null>(null);
	const [isSending, setIsSending] = useState(false);
	const [newTrophies, setNewTrophies] = useState<Trophy[]>([]);
	const [waitedTooLong, setWaitedTooLong] = useState(false);
	const draftRef = useRef<SessionDraft | null>(null);
	const sendingRef = useRef(false);

	const swaps = draft?.swaps ?? {};
	// Every movement the session may do: the slots', their alternatives' (to swap) and switch finishers'
	const lastPerformances = useLastPerformances(
		[
			...new Set(
				slots.flatMap((slot) => [
					slot.movement_id,
					...slot.alternatives.map((a) => a.movement.id),
				]),
			),
		],
		sessionId,
	);

	// Targets of a slot's working sets, from the last performance of the movement done today
	const workingTargets = (slot: Slot): SetTarget[] | null => {
		const movement = movementFor(slot, swaps);
		const last = lastPerformances.byMovement.get(movement.id);
		// Unknown history (offline, not cached): no target rather than a wrong calibration
		if (last === undefined) return null;
		const { reps, weights } = setsToArrays(last?.logged_sets ?? []);
		const lastSets = reps.map((r, i) => ({ reps: r, weight: weights[i] }));
		return targetsFor(slot, movement, lastSets);
	};
	const slotQueue = queueSlots(
		slots,
		swaps,
		new Map(
			slots.map((slot) => [slot.id, workingTargets(slot)?.[0]?.weight ?? null]),
		),
	);
	const queue = buildSetQueue(slotQueue);

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
	const movementOf = (step: QueueStep): Movement | null => {
		const slot = slotOf(step);
		if (!slot) return null;
		if (step.kind === "switch") return slot.finisher_movement ?? slot.movement;
		return movementFor(slot, swaps);
	};

	const targetOf = (step: QueueStep): SetTarget | null => {
		const slot = slotOf(step);
		if (!slot) return null;
		if (step.kind === "warmup") {
			const set = slotQueue.find((s) => s.id === slot.id)?.warmup?.[
				step.setIndex
			];
			return set
				? {
						position: step.setIndex + 1,
						weight: set.weight,
						repMin: set.reps,
						repMax: set.reps,
						reason: "derived",
					}
				: null;
		}
		if (step.kind === "drop") {
			// Each drop removes the slot's step from the load just lifted (about 20 % without one)
			const previous = [...queue.slice(0, queue.indexOf(step))]
				.reverse()
				.find((s) => s.slotId === slot.id && draft?.sets[s.key]);
			const lifted = previous
				? (draft?.sets[previous.key].weight ?? null)
				: null;
			if (lifted === null) return null;
			const lighter =
				slot.finisher_load_step !== null
					? lifted - slot.finisher_load_step
					: lifted * 0.8;
			return {
				position: step.setIndex + 1,
				weight: roundToIncrement(
					lighter,
					movementFor(slot, swaps).increment_kg ?? DEFAULT_INCREMENT,
				),
				repMin: null,
				repMax: null,
				reason: "derived",
			};
		}
		if (step.kind !== "working") return null;
		return workingTargets(slot)?.[step.setIndex] ?? null;
	};

	const alternativesOf = (step: QueueStep) => {
		const slot = slotOf(step);
		return slot
			? [slot.movement, ...slot.alternatives.map((a) => a.movement)]
			: [];
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
		return movement ? `${movement.name}, ${partLabel(step)}` : null;
	};

	// The target shown is kept with the set: what the app proposed, beside what was lifted
	const complete = (
		index: number,
		values: { weight: number; reps: number },
	) => {
		const step = queue[index];
		const target = step ? targetOf(step) : null;
		apply((current) =>
			completeStep(
				current,
				queue,
				index,
				{
					...values,
					target: target
						? {
								weight: target.weight,
								repMin: target.repMin,
								repMax: target.repMax,
								reason: target.reason,
							}
						: null,
				},
				new Date(),
				randomUUID,
			),
		);
	};
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
	// Before the slot's first set only; the original movement passed back drops the swap
	const swap = (slotId: string, movementId: string) =>
		apply((current) => {
			const slot = slots.find((s) => s.id === slotId);
			return swapMovement(
				current,
				queue,
				slotId,
				slot && movementId !== slot.movement_id ? movementId : null,
				new Date(),
			);
		});

	// Sends what is left, then closes the session. False when something could not be sent.
	const finish = async (): Promise<boolean> => {
		await send({ includeIncomplete: true });
		if (!draftRef.current || hasUnsent(draftRef.current)) return false;
		await updateSession.mutateAsync({
			id: sessionId,
			changes: { ended_at: new Date().toISOString(), is_done: true },
		});
		// Closed: later changes (a late confirmation, an effect) must not write the draft back
		draftRef.current = null;
		scheduleRestNotification(null, null);
		await clearDraft(sessionId);
		return true;
	};

	const discard = async () => {
		draftRef.current = null;
		scheduleRestNotification(null, null);
		await clearDraft(sessionId);
	};

	useEffect(() => {
		const timer = setTimeout(() => setWaitedTooLong(true), LOAD_TIMEOUT_MS);
		return () => clearTimeout(timer);
	}, [sessionId]);

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

	// Exercises of this session logged outside the guided session (classic exercise screen): their
	// slots are skipped here so they are not logged twice
	const ownIds = new Set(
		Object.values(draft?.exercises ?? {}).map((e) => e.id),
	);
	const loggedElsewhere = (sessionQuery.data?.logged_exercises ?? [])
		.filter((e) => e.slot_id && !ownIds.has(e.id))
		.map((e) => e.slot_id as string);
	const loggedElsewhereKey = loggedElsewhere.join();
	useEffect(() => {
		if (!draftRef.current || loggedElsewhere.length === 0 || queue.length === 0)
			return;
		const next = skipLoggedElsewhere(
			draftRef.current,
			queue,
			loggedElsewhere,
			new Date(),
		);
		if (next !== draftRef.current) apply(() => next);
	}, [loggedElsewhereKey, queue.length, draft === null]);

	// Write each exercise as soon as its slot is done
	useEffect(() => {
		if (draft && day) send();
	}, [draft, day]);

	// One notification for the end of the rest, replaced whenever the timer changes
	const rest: RestTimer | null = draft?.rest ?? null;
	const restKey = rest ? `${rest.startedAt}:${rest.durationSeconds}` : null;
	// The label is part of the key: after a relaunch the program loads after the draft
	const restLabel = draft ? nextLabel(currentIndex(draft, queue)) : null;
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

	const sessionReady = Boolean(sessionQuery.data);
	const programReady =
		!programQuery.isLoading && !(programQuery.isError && !programQuery.data);
	// The server says the session no longer exists (deleted, or another account's): the device copy is stale
	const isGone =
		(sessionQuery.error as { code?: string } | null)?.code === "PGRST116";
	// Neither the server nor the device copy has the session or the program
	const isUnavailable =
		!isRestoring &&
		!(sessionReady && programReady) &&
		(sessionQuery.isError || programQuery.isError || waitedTooLong);

	return {
		isLoading:
			!isUnavailable &&
			(isRestoring ||
				!sessionReady ||
				!programReady ||
				(lastPerformances.isLoading && !waitedTooLong) ||
				!draft),
		isUnavailable,
		isGone,
		// Past the wait, the screen renders while the last performances may still arrive
		targetsPending: lastPerformances.isLoading,
		reload: () => queryClient.refetchQueries({ type: "active" }),
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
		swap,
		alternativesOf,
		retry: () => send(),
		finish,
		discard,
	};
}
