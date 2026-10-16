// Rest timer built on stored times: the state is when the rest started and how long it lasts, so the
// remaining time is recomputed from the clock and survives backgrounding or the app being killed.
// Pure functions, unit-tested with `npm test`.

export type RestTimer = {
	/** Epoch milliseconds */
	startedAt: number;
	durationSeconds: number;
};

export type RestPhase = "resting" | "ready" | "done";

/** Last seconds of a rest: the lifter gets ready for the next set */
export const READY_SECONDS = 10;

export function startRest(durationSeconds: number, now: number): RestTimer {
	return { startedAt: now, durationSeconds: Math.max(0, durationSeconds) };
}

export function restEndsAt(timer: RestTimer): number {
	return timer.startedAt + timer.durationSeconds * 1000;
}

/** Whole seconds left, rounded up so 0 only shows once the rest is over */
export function remainingSeconds(timer: RestTimer, now: number): number {
	return Math.max(0, Math.ceil((restEndsAt(timer) - now) / 1000));
}

export function restPhase(timer: RestTimer, now: number): RestPhase {
	const left = remainingSeconds(timer, now);
	if (left === 0) return "done";
	return left <= READY_SECONDS ? "ready" : "resting";
}

/** Adds or removes time; never ends before now */
export function adjustRest(
	timer: RestTimer,
	deltaSeconds: number,
	now: number,
): RestTimer {
	const elapsedSeconds = Math.max(0, (now - timer.startedAt) / 1000);
	const durationSeconds = Math.max(
		Math.ceil(elapsedSeconds),
		timer.durationSeconds + deltaSeconds,
	);
	return { ...timer, durationSeconds };
}

/** Seconds from now until the end, for scheduling the notification; null once it is over */
export function secondsUntilEnd(timer: RestTimer, now: number): number | null {
	const left = (restEndsAt(timer) - now) / 1000;
	return left > 0 ? left : null;
}

export function formatRest(seconds: number): string {
	const minutes = Math.floor(seconds / 60);
	const rest = seconds % 60;
	return `${minutes}:${rest.toString().padStart(2, "0")}`;
}
