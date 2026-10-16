// A user's settings for a library movement (one side at a time, load step) applied over the shared row,
// so the guided session, the targets and the screens read one movement. Pure, unit-tested with `npm test`.

export type MovementSetting = {
	movement_id: string;
	unilateral: boolean | null;
	increment_kg: number | null;
};

type SettableMovement = {
	id: string;
	owner_id: string | null;
	unilateral: boolean;
	increment_kg: number | null;
};

/** The movement with the user's settings applied; the user's own movements keep their row */
export function withMovementSettings<M extends SettableMovement>(
	movement: M,
	settings: Map<string, MovementSetting>,
): M {
	if (movement.owner_id !== null) return movement;
	const setting = settings.get(movement.id);
	if (!setting) return movement;
	return {
		...movement,
		unilateral: setting.unilateral ?? movement.unilateral,
		increment_kg: setting.increment_kg ?? movement.increment_kg,
	};
}

/** A slot whose movement, alternatives and switch movement carry the user's settings */
export function slotWithMovementSettings<
	M extends SettableMovement,
	S extends {
		movement: M;
		alternatives: { movement: M }[];
		finisher_movement: M | null;
	},
>(slot: S, settings: Map<string, MovementSetting>): S {
	if (settings.size === 0) return slot;
	return {
		...slot,
		movement: withMovementSettings(slot.movement, settings),
		alternatives: slot.alternatives.map((alternative) => ({
			...alternative,
			movement: withMovementSettings(alternative.movement, settings),
		})),
		finisher_movement: slot.finisher_movement
			? withMovementSettings(slot.finisher_movement, settings)
			: null,
	};
}
