// Which program day comes next: the one after the day of the most recent session of the program, in the
// program's order, wrapping around. Free sessions and sessions of other programs do not count. Pure,
// unit-tested with `npm test`.

export type RotationDay = { id: string; position: number };
export type RotationSession = { program_day_id: string | null; date_session: string };

/** Id of the day to suggest, or null when the program has no day */
export function nextProgramDay(
	days: RotationDay[],
	sessions: RotationSession[],
): string | null {
	const ordered = [...days].sort((a, b) => a.position - b.position);
	if (ordered.length === 0) return null;
	const latest = lastSessionByDay(ordered, sessions);
	let lastDayIndex = -1;
	let lastTime = -Infinity;
	ordered.forEach((day, index) => {
		const date = latest.get(day.id);
		const time = date ? new Date(date).getTime() : -Infinity;
		if (time > lastTime) {
			lastTime = time;
			lastDayIndex = index;
		}
	});
	return ordered[(lastDayIndex + 1) % ordered.length].id;
}

/** Date of the most recent session of each day of the program (days never done are absent) */
export function lastSessionByDay(
	days: RotationDay[],
	sessions: RotationSession[],
): Map<string, string> {
	const ids = new Set(days.map((d) => d.id));
	const latest = new Map<string, string>();
	for (const session of sessions) {
		const dayId = session.program_day_id;
		if (!dayId || !ids.has(dayId)) continue;
		const known = latest.get(dayId);
		if (!known || new Date(session.date_session) > new Date(known)) {
			latest.set(dayId, session.date_session);
		}
	}
	return latest;
}
