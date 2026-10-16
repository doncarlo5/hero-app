// Draft of a guided session: everything the server does not have yet, saved on the device after each
// change so the session survives the app being killed (ADR-0002). Each slot becomes one logged
// exercise, written once its sets are done; its id is chosen here so a retry never logs it twice.
// Pure functions, unit-tested with `npm test`; storage lives in draft-storage.ts.

import type { RestTimer } from "./rest.ts";
import type { QueueStep, StepKind } from "./set-queue.ts";

export const DRAFT_VERSION = 1;
/** A draft untouched for this long is offered to be finished or discarded rather than resumed */
export const STALE_AFTER_MS = 4 * 60 * 60 * 1000;

/** What the app proposed for a set when it was done (progression engine), kept with the set */
export type DraftTarget = {
	weight: number | null;
	repMin: number | null;
	repMax: number | null;
	reason: "increase" | "repeat" | "derived" | "calibration";
};

export type DraftSet = {
	weight: number;
	reps: number;
	completedAt: string;
	target?: DraftTarget | null;
};

export type DraftExercise = {
	/** Logged exercise id, chosen by the app */
	id: string;
	/** Bumped on every change to the slot's sets */
	revision: number;
	/** Revision the server confirmed, null before the first write */
	sentRevision: number | null;
};

export type SessionDraft = {
	version: typeof DRAFT_VERSION;
	sessionId: string;
	startedAt: string;
	updatedAt: string;
	/** Current step in the queue; equals the queue length once every step is done or skipped */
	stepIndex: number;
	/** Done sets, by step key */
	sets: Record<string, DraftSet>;
	/** Skipped step keys */
	skipped: string[];
	/** One logged exercise per slot that has a done set, by slot id */
	exercises: Record<string, DraftExercise>;
	rest: RestTimer | null;
	/** Alternative done instead of a slot's movement this session, by slot id (absent in older drafts) */
	swaps?: Record<string, string>;
};

export type ExercisePayload = {
	slotId: string;
	movementId: string;
	id: string;
	revision: number;
	sets: {
		weight: number;
		reps: number;
		kind: StepKind;
		side: "left" | "right" | null;
		completed_at: string;
		target_weight: number | null;
		target_rep_min: number | null;
		target_rep_max: number | null;
		target_reason: DraftTarget["reason"] | null;
	}[];
};

export function createDraft(sessionId: string, now: Date): SessionDraft {
	const at = now.toISOString();
	return {
		version: DRAFT_VERSION,
		sessionId,
		startedAt: at,
		updatedAt: at,
		stepIndex: 0,
		sets: {},
		skipped: [],
		exercises: {},
		rest: null,
	};
}

function isHandled(draft: SessionDraft, step: QueueStep): boolean {
	return Boolean(draft.sets[step.key]) || draft.skipped.includes(step.key);
}

/** First step after `from` that is neither done nor skipped; the queue length when none is left */
export function nextOpenStep(
	draft: SessionDraft,
	queue: QueueStep[],
	from: number,
): number {
	for (let i = from + 1; i < queue.length; i++) {
		if (!isHandled(draft, queue[i])) return i;
	}
	for (let i = 0; i <= Math.min(from, queue.length - 1); i++) {
		if (!isHandled(draft, queue[i])) return i;
	}
	return queue.length;
}

/** Logs a set: the slot's exercise must be (re)written and the rest after the step starts */
export function completeStep(
	draft: SessionDraft,
	queue: QueueStep[],
	index: number,
	values: { weight: number; reps: number; target?: DraftTarget | null },
	now: Date,
	newId: () => string,
): SessionDraft {
	const step = queue[index];
	if (!step) return draft;
	const exercise = draft.exercises[step.slotId];
	const updated: SessionDraft = {
		...draft,
		updatedAt: now.toISOString(),
		sets: {
			...draft.sets,
			[step.key]: { ...values, completedAt: now.toISOString() },
		},
		skipped: draft.skipped.filter((key) => key !== step.key),
		exercises: {
			...draft.exercises,
			[step.slotId]: exercise
				? { ...exercise, revision: exercise.revision + 1 }
				: { id: newId(), revision: 1, sentRevision: null },
		},
	};
	const next = nextOpenStep(updated, queue, index);
	return {
		...updated,
		stepIndex: next,
		rest:
			next < queue.length && step.restAfterSeconds > 0
				? { startedAt: now.getTime(), durationSeconds: step.restAfterSeconds }
				: null,
	};
}

/** Skips a set without logging it; no rest starts */
export function skipStep(
	draft: SessionDraft,
	queue: QueueStep[],
	index: number,
	now: Date,
): SessionDraft {
	const step = queue[index];
	if (!step || isHandled(draft, step)) return draft;
	const updated = {
		...draft,
		updatedAt: now.toISOString(),
		skipped: [...draft.skipped, step.key],
	};
	return { ...updated, stepIndex: nextOpenStep(updated, queue, index) };
}

export function goToStep(
	draft: SessionDraft,
	queue: QueueStep[],
	index: number,
	now: Date,
): SessionDraft {
	if (index < 0 || index > queue.length) return draft;
	return { ...draft, stepIndex: index, updatedAt: now.toISOString() };
}

export function setRest(
	draft: SessionDraft,
	rest: RestTimer | null,
	now: Date,
): SessionDraft {
	return { ...draft, rest, updatedAt: now.toISOString() };
}

/**
 * Does an alternative instead of the slot's movement for this session (null goes back to it). Only
 * before the slot's first set: its logged exercise is about one movement.
 */
export function swapMovement(
	draft: SessionDraft,
	queue: QueueStep[],
	slotId: string,
	movementId: string | null,
	now: Date,
): SessionDraft {
	if (queue.some((step) => step.slotId === slotId && draft.sets[step.key]))
		return draft;
	const swaps = { ...(draft.swaps ?? {}) };
	if (movementId) swaps[slotId] = movementId;
	else delete swaps[slotId];
	return { ...draft, swaps, updatedAt: now.toISOString() };
}

export function isSlotComplete(
	draft: SessionDraft,
	queue: QueueStep[],
	slotId: string,
): boolean {
	return queue
		.filter((step) => step.slotId === slotId)
		.every((step) => isHandled(draft, step));
}

export function isFinished(draft: SessionDraft, queue: QueueStep[]): boolean {
	return queue.every((step) => isHandled(draft, step));
}

/**
 * Exercises the server does not have in their latest version. By default only slots whose every set
 * is done or skipped; `includeIncomplete` when the session is finished early.
 */
export function exercisesToSend(
	draft: SessionDraft,
	queue: QueueStep[],
	options: { includeIncomplete?: boolean } = {},
): ExercisePayload[] {
	const result: ExercisePayload[] = [];
	for (const [slotId, exercise] of Object.entries(draft.exercises)) {
		if (exercise.sentRevision === exercise.revision) continue;
		if (!options.includeIncomplete && !isSlotComplete(draft, queue, slotId))
			continue;
		const steps = queue.filter(
			(step) => step.slotId === slotId && draft.sets[step.key],
		);
		if (steps.length === 0) continue;
		result.push({
			slotId,
			movementId: steps[0].movementId,
			id: exercise.id,
			revision: exercise.revision,
			sets: steps.map((step) => {
				const set = draft.sets[step.key];
				return {
					weight: set.weight,
					reps: set.reps,
					kind: step.kind,
					side: step.side,
					completed_at: set.completedAt,
					target_weight: set.target?.weight ?? null,
					target_rep_min: set.target?.repMin ?? null,
					target_rep_max: set.target?.repMax ?? null,
					target_reason: set.target?.reason ?? null,
				};
			}),
		});
	}
	return result;
}

/** The server confirmed a revision; a later edit keeps the exercise to send */
export function markSent(
	draft: SessionDraft,
	slotId: string,
	revision: number,
): SessionDraft {
	const exercise = draft.exercises[slotId];
	if (!exercise) return draft;
	return {
		...draft,
		exercises: {
			...draft.exercises,
			[slotId]: {
				...exercise,
				sentRevision: Math.max(exercise.sentRevision ?? 0, revision),
			},
		},
	};
}

export function hasUnsent(draft: SessionDraft): boolean {
	return Object.values(draft.exercises).some(
		(exercise) => exercise.sentRevision !== exercise.revision,
	);
}

export function isStale(draft: SessionDraft, now: Date): boolean {
	return now.getTime() - new Date(draft.updatedAt).getTime() > STALE_AFTER_MS;
}

/** Reads a stored draft; anything unknown or from an unsupported version is dropped */
export function parseDraft(raw: unknown): SessionDraft | null {
	if (typeof raw !== "object" || raw === null) return null;
	const draft = raw as Partial<SessionDraft>;
	if (draft.version !== DRAFT_VERSION) return null;
	if (
		typeof draft.sessionId !== "string" ||
		typeof draft.stepIndex !== "number" ||
		typeof draft.sets !== "object" ||
		typeof draft.exercises !== "object" ||
		!Array.isArray(draft.skipped)
	)
		return null;
	return draft as SessionDraft;
}
