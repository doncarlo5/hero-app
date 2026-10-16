// Run with `npm test` in apps/mobile (Node's test runner, TypeScript stripped natively).
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
	computeTargets,
	isStagnating,
	reentryWeight,
	roundToIncrement,
	type SetPrescription,
	upperHalfThreshold,
	warmupRamp,
} from "./engine.ts";

const topSetAndBackOffs: SetPrescription[] = [
	{ position: 1, repMin: 4, repMax: 6, loadRule: "none", loadValue: null },
	{ position: 2, repMin: 6, repMax: 8, loadRule: "percent", loadValue: -10 },
	{ position: 3, repMin: 8, repMax: 10, loadRule: "percent", loadValue: -10 },
];

const straight = (
	repMin: number,
	repMax: number,
	sets = 3,
): SetPrescription[] =>
	Array.from({ length: sets }, (_, i) => ({
		position: i + 1,
		repMin,
		repMax,
		loadRule: i === 0 ? "none" : "same",
		loadValue: null,
	}));

describe("computeTargets, per set (top set and back-off sets)", () => {
	test("each set goes up on its own once it reaches the top of its range", () => {
		const targets = computeTargets({
			prescriptions: topSetAndBackOffs,
			progressionRule: "per_set",
			lastSets: [
				{ weight: 80, reps: 6 }, // top of 4-6: +2.5
				{ weight: 72.5, reps: 7 }, // 7 of 6-8: stays
				{ weight: 65, reps: 10 }, // top of 8-10: +2.5
			],
		});
		assert.deepEqual(
			targets.map((t) => [t.weight, t.reason]),
			[
				[82.5, "increase"],
				[72.5, "repeat"],
				[67.5, "increase"],
			],
		);
	});

	test("a set without history is derived from the previous target", () => {
		const targets = computeTargets({
			prescriptions: topSetAndBackOffs,
			progressionRule: "per_set",
			lastSets: [{ weight: 80, reps: 5 }],
		});
		// 80 × 0.9 = 72 → 72.5 on a 2.5 kg increment; 72.5 × 0.9 = 65.25 → 65
		assert.deepEqual(
			targets.map((t) => [t.weight, t.reason]),
			[
				[80, "repeat"],
				[72.5, "derived"],
				[65, "derived"],
			],
		);
	});

	test("dumbbells use their own increment", () => {
		const targets = computeTargets({
			prescriptions: topSetAndBackOffs.slice(0, 1),
			progressionRule: "per_set",
			lastSets: [{ weight: 30, reps: 6 }],
			increment: 2,
		});
		assert.equal(targets[0].weight, 32);
	});
});

describe("computeTargets, all sets (straight sets)", () => {
	test("load goes up only when every set is in the upper half of the range", () => {
		const up = computeTargets({
			prescriptions: straight(8, 12),
			progressionRule: "all_sets",
			lastSets: [
				{ weight: 14, reps: 12 },
				{ weight: 14, reps: 11 },
				{ weight: 14, reps: 10 },
			],
			increment: 2,
		});
		assert.deepEqual(
			up.map((t) => [t.weight, t.reason]),
			[
				[16, "increase"],
				[16, "increase"],
				[16, "increase"],
			],
		);

		const notYet = computeTargets({
			prescriptions: straight(8, 12),
			progressionRule: "all_sets",
			lastSets: [
				{ weight: 14, reps: 12 },
				{ weight: 14, reps: 10 },
				{ weight: 14, reps: 8 },
			],
			increment: 2,
		});
		assert.ok(notYet.every((t) => t.weight === 14 && t.reason === "repeat"));
	});

	test("a missing set blocks the increase", () => {
		const targets = computeTargets({
			prescriptions: straight(10, 15),
			progressionRule: "all_sets",
			lastSets: [
				{ weight: 20, reps: 15 },
				{ weight: 20, reps: 14 },
			],
		});
		assert.deepEqual(
			targets.map((t) => t.reason),
			["repeat", "repeat", "derived"],
		);
	});
});

describe("computeTargets, edge cases", () => {
	test("no history: calibration, no load proposed", () => {
		const targets = computeTargets({
			prescriptions: topSetAndBackOffs,
			progressionRule: "per_set",
			lastSets: [],
		});
		assert.ok(
			targets.every((t) => t.weight === null && t.reason === "calibration"),
		);
		assert.deepEqual(
			targets.map((t) => [t.repMin, t.repMax]),
			[
				[4, 6],
				[6, 8],
				[8, 10],
			],
		);
	});

	test("manual progression repeats the last loads", () => {
		const targets = computeTargets({
			prescriptions: straight(6, 10),
			progressionRule: "manual",
			lastSets: [
				{ weight: 100, reps: 10 },
				{ weight: 100, reps: 10 },
				{ weight: 100, reps: 10 },
			],
		});
		assert.ok(targets.every((t) => t.weight === 100));
	});

	test("ascending sets keep their own loads", () => {
		const ascending: SetPrescription[] = [
			{
				position: 1,
				repMin: 12,
				repMax: 15,
				loadRule: "none",
				loadValue: null,
			},
			{ position: 2, repMin: 8, repMax: 12, loadRule: "step", loadValue: 2 },
			{ position: 3, repMin: 6, repMax: 10, loadRule: "step", loadValue: 2 },
		];
		const targets = computeTargets({
			prescriptions: ascending,
			progressionRule: "all_sets",
			lastSets: [{ weight: 12, reps: 15 }],
			increment: 2,
		});
		assert.deepEqual(
			targets.map((t) => t.weight),
			[12, 14, 16],
		);
	});
});

describe("helpers", () => {
	test("upper half of a rep range", () => {
		assert.equal(upperHalfThreshold(8, 12), 10);
		assert.equal(upperHalfThreshold(10, 15), 13);
	});

	test("rounding to the increment", () => {
		assert.equal(roundToIncrement(72, 2.5), 72.5);
		assert.equal(roundToIncrement(65.25, 2.5), 65);
		assert.equal(roundToIncrement(-3, 2.5), 0);
	});

	test("stagnation needs the same performance on the last sessions", () => {
		const same = [{ weight: 90, reps: 5 }];
		assert.equal(isStagnating([same, same, same]), true);
		assert.equal(isStagnating([[{ weight: 90, reps: 6 }], same, same]), false);
		assert.equal(isStagnating([same, same]), false, "not enough history");
	});

	test("coming back after an alternative restarts about 5 % lighter", () => {
		assert.equal(reentryWeight(90), 85);
	});

	test("warm-up ramp from the empty bar, fewer reps near the working load", () => {
		const ramp = warmupRamp({ workingWeight: 65, stepPerSide: 5 });
		assert.deepEqual(
			ramp.map((s) => s.weight),
			[20, 30, 40, 50],
		);
		assert.equal(ramp[0].reps, 8);
		assert.ok(ramp[ramp.length - 1].reps <= 3);
		assert.deepEqual(warmupRamp({ workingWeight: 20 }), []);
	});
});
