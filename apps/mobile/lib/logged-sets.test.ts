// Run with `npm test` in apps/mobile (Node's test runner, TypeScript stripped natively).
import assert from "node:assert/strict";
import { test } from "node:test";

import { applyEditedSets, type StoredSet } from "./logged-sets.ts";

const set = (
	set_order: number,
	kind: string,
	weight: number,
	reps: number,
	extra: Partial<StoredSet> = {},
): StoredSet => ({
	set_order,
	kind,
	weight,
	reps,
	side: null,
	duration_seconds: null,
	...extra,
});

test("warm-ups, finishers and targets survive an edit of the working sets", () => {
	const stored = [
		set(1, "warmup", 20, 8),
		set(2, "working", 60, 8, { target_weight: 60, target_reason: "repeat" }),
		set(3, "working", 60, 7),
		set(4, "drop", 50, 6),
	];
	const result = applyEditedSets(
		stored,
		[
			{ weight: 62.5, count: 8 },
			{ weight: 60, count: 8 },
		],
		"reps",
	);
	assert.deepEqual(
		result.map((s) => [s.kind, s.weight, s.reps]),
		[
			["warmup", 20, 8],
			["working", 62.5, 8],
			["working", 60, 8],
			["drop", 50, 6],
		],
	);
	assert.equal(result[1].target_reason, "repeat");
});

test("a unilateral pair takes one edited value for both sides", () => {
	const stored = [
		set(1, "working", 16, 10, { side: "left" }),
		set(2, "working", 16, 10, { side: "right" }),
	];
	const result = applyEditedSets(stored, [{ weight: 18, count: 9 }], "reps");
	assert.deepEqual(
		result.map((s) => [s.side, s.weight, s.reps]),
		[
			["left", 18, 9],
			["right", 18, 9],
		],
	);
});

test("timed sets keep seconds; sets can be added or removed", () => {
	const stored = [
		set(1, "working", 0, 0, { duration_seconds: 45 }),
		set(2, "working", 0, 0, { duration_seconds: 40 }),
	];
	const fewer = applyEditedSets(stored, [{ weight: 0, count: 50 }], "duration");
	assert.deepEqual(
		fewer.map((s) => [s.reps, s.duration_seconds]),
		[[0, 50]],
	);
	const emptyRow = applyEditedSets(
		stored,
		[
			{ weight: 0, count: 45 },
			{ weight: 0, count: 40 },
			{ weight: 0, count: 0 },
		],
		"duration",
	);
	assert.equal(emptyRow.length, 2, "an empty form row is not a new set");
	const more = applyEditedSets(
		stored,
		[
			{ weight: 0, count: 50 },
			{ weight: 0, count: 45 },
			{ weight: 5, count: 30 },
		],
		"duration",
	);
	assert.deepEqual(
		more.map((s) => [s.kind, s.weight, s.duration_seconds]),
		[
			["working", 0, 50],
			["working", 0, 45],
			["working", 5, 30],
		],
	);
});
