// Run with `npm test` in apps/mobile (Node's test runner, TypeScript stripped natively).
import assert from "node:assert/strict";
import { test } from "node:test";

import type { Movement } from "@/lib/queries/types";

import { inMuscleGroup, matchesMovementSearch } from "./movement-library.ts";

const movement = (extra: Partial<Movement>): Movement =>
	({
		id: "m",
		owner_id: null,
		name: "Développé couché, barre",
		equipment: "barbell",
		primary_muscles: ["chest"],
		secondary_muscles: ["triceps", "shoulders"],
		aliases: ["Barbell Bench Press - Medium Grip", "bench"],
		...extra,
	}) as Movement;

test("search ignores case and accents, and every word must match", () => {
	const bench = movement({});
	assert.ok(matchesMovementSearch(bench, "DEVELOPPE couche"));
	assert.ok(matchesMovementSearch(bench, "développé barre"));
	assert.equal(matchesMovementSearch(bench, "développé haltères"), false);
});

test("aliases, French equipment and everyday muscle words are found", () => {
	const bench = movement({});
	assert.ok(matchesMovementSearch(bench, "bench press"), "English alias");
	assert.ok(matchesMovementSearch(bench, "pecs"), "muscle synonym");
	assert.ok(matchesMovementSearch(bench, "pectoraux barre"));
	const curl = movement({
		name: "Curl marteau",
		equipment: "dumbbell",
		primary_muscles: ["biceps"],
		aliases: [],
	});
	assert.ok(
		matchesMovementSearch(curl, "haltere"),
		"French equipment, singular",
	);
});

test("secondary muscles are not searched", () => {
	assert.equal(matchesMovementSearch(movement({}), "triceps"), false);
});

test("muscle groups come from primary muscles", () => {
	assert.ok(inMuscleGroup(movement({}), "chest"));
	assert.equal(inMuscleGroup(movement({}), "arms"), false);
	assert.ok(
		inMuscleGroup(movement({ primary_muscles: ["hamstrings"] }), "legs"),
	);
});

test("apostrophes are ignored, typed straight or curly", () => {
	const walk = movement({
		name: "Farmer's Walk",
		equipment: "other",
		primary_muscles: ["forearms"],
		aliases: [],
	});
	assert.ok(matchesMovementSearch(walk, "farmer’s"));
	assert.ok(matchesMovementSearch(walk, "farmers walk"));
});

test("an unknown muscle group matches nothing", () => {
	assert.equal(inMuscleGroup(movement({}), "neck"), false);
});
