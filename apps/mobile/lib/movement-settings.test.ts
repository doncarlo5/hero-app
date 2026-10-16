import assert from "node:assert/strict";
import { test } from "node:test";

import {
	slotWithMovementSettings,
	withMovementSettings,
	type MovementSetting,
} from "./movement-settings.ts";

const library = { id: "lunge", owner_id: null, unilateral: false, increment_kg: null };
const own = { id: "mine", owner_id: "u1", unilateral: false, increment_kg: 5 };
const settings = new Map<string, MovementSetting>([
	["lunge", { movement_id: "lunge", unilateral: true, increment_kg: 2 }],
	["mine", { movement_id: "mine", unilateral: true, increment_kg: 1 }],
]);

test("a library movement takes the user's settings", () => {
	const result = withMovementSettings(library, settings);
	assert.equal(result.unilateral, true);
	assert.equal(result.increment_kg, 2);
});

test("a null setting keeps the library value", () => {
	const partial = new Map<string, MovementSetting>([
		["lunge", { movement_id: "lunge", unilateral: null, increment_kg: 2 }],
	]);
	const result = withMovementSettings(library, partial);
	assert.equal(result.unilateral, false);
	assert.equal(result.increment_kg, 2);
});

test("the user's own movement keeps its row", () => {
	assert.equal(withMovementSettings(own, settings), own);
});

test("a slot's movement, alternatives and switch movement are all set", () => {
	const slot = {
		movement: library,
		alternatives: [{ position: 1, movement: library }],
		finisher_movement: library,
	};
	const result = slotWithMovementSettings(slot, settings);
	assert.equal(result.movement.unilateral, true);
	assert.equal(result.alternatives[0].movement.increment_kg, 2);
	assert.equal(result.alternatives[0].position, 1);
	assert.equal(result.finisher_movement?.unilateral, true);
});

test("no settings: the slot is returned as is", () => {
	const slot = { movement: library, alternatives: [], finisher_movement: null };
	assert.equal(slotWithMovementSettings(slot, new Map()), slot);
});
