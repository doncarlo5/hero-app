// Run with `npm test` in apps/mobile (Node's test runner, TypeScript stripped natively).
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
	completeStep,
	createDraft,
	exercisesToSend,
	hasUnsent,
	isFinished,
	isStale,
	markSent,
	parseDraft,
	skipStep,
} from "./draft.ts";
import {
	adjustRest,
	remainingSeconds,
	restPhase,
	secondsUntilEnd,
	startRest,
} from "./rest.ts";
import { buildSetQueue, type QueueSlot } from "./set-queue.ts";

const slot = (
	id: string,
	position: number,
	sets: number,
	extra: Partial<QueueSlot> = {},
): QueueSlot => ({
	id,
	movementId: `m-${id}`,
	position,
	supersetGroup: null,
	restSeconds: 120,
	unilateral: false,
	restPerSide: false,
	sets: Array.from({ length: sets }, (_, i) => ({
		position: i + 1,
		restSeconds: null,
	})),
	...extra,
});

const order = (steps: ReturnType<typeof buildSetQueue>) =>
	steps.map(
		(s) =>
			`${s.slotId}${s.setIndex + 1}${s.side ? s.side[0] : ""}:${s.restAfterSeconds}`,
	);

describe("set queue", () => {
	test("lone slots: sets in order, the slot's rest after each, none after the last", () => {
		const queue = buildSetQueue([slot("B", 2, 2), slot("A", 1, 2)]);
		assert.deepEqual(order(queue), ["A1:120", "A2:120", "B1:120", "B2:0"]);
		assert.deepEqual(
			queue.map((s) => s.isLastOfSlot),
			[false, true, false, true],
		);
	});

	test("a set's own rest wins over the slot's", () => {
		const queue = buildSetQueue([
			slot("A", 1, 2, {
				sets: [
					{ position: 1, restSeconds: 180 },
					{ position: 2, restSeconds: null },
				],
			}),
			slot("B", 2, 1),
		]);
		assert.deepEqual(order(queue), ["A1:180", "A2:120", "B1:0"]);
	});

	test("superset: round by round, short transition, full rest after the round", () => {
		const queue = buildSetQueue([
			slot("A", 1, 3, { supersetGroup: 1, restSeconds: 90 }),
			slot("B", 2, 2, { supersetGroup: 1, restSeconds: 60 }),
			slot("C", 3, 1),
		]);
		// B has one set less: it drops out of the last round
		assert.deepEqual(order(queue), [
			"A1:15",
			"B1:60",
			"A2:15",
			"B2:60",
			"A3:90",
			"C1:0",
		]);
		assert.deepEqual(
			queue.filter((s) => s.isLastOfSlot).map((s) => s.key),
			["B:1:-", "A:2:-", "C:0:-"],
		);
	});

	test("superset members need not be adjacent in the day", () => {
		const queue = buildSetQueue([
			slot("A", 1, 1, { supersetGroup: 7 }),
			slot("X", 2, 1),
			slot("B", 3, 1, { supersetGroup: 7 }),
		]);
		assert.deepEqual(
			queue.map((s) => s.slotId),
			["A", "B", "X"],
		);
	});

	test("unilateral: left then right; rest after each side only with rest per side", () => {
		const straight = buildSetQueue([slot("A", 1, 2, { unilateral: true })]);
		assert.deepEqual(order(straight), ["A1l:0", "A1r:120", "A2l:0", "A2r:0"]);
		const perSide = buildSetQueue([
			slot("A", 1, 1, { unilateral: true, restPerSide: true }),
		]);
		assert.deepEqual(order(perSide), ["A1l:120", "A1r:0"]);
	});

	test("a slot without rest uses the default", () => {
		const queue = buildSetQueue([slot("A", 1, 2, { restSeconds: null })], {
			defaultRestSeconds: 75,
		});
		assert.equal(queue[0].restAfterSeconds, 75);
	});
});

describe("rest timer", () => {
	const t0 = Date.UTC(2026, 9, 16, 9, 0, 0);

	test("remaining time comes from the clock, not from ticks", () => {
		const timer = startRest(90, t0);
		assert.equal(remainingSeconds(timer, t0), 90);
		assert.equal(remainingSeconds(timer, t0 + 500), 90, "rounded up");
		// The app was in the background for a minute: nothing to replay
		assert.equal(remainingSeconds(timer, t0 + 60_000), 30);
		assert.equal(restPhase(timer, t0 + 60_000), "resting");
		assert.equal(restPhase(timer, t0 + 81_000), "ready");
		assert.equal(restPhase(timer, t0 + 90_000), "done");
		assert.equal(remainingSeconds(timer, t0 + 600_000), 0);
	});

	test("adding or removing time never ends the rest in the past", () => {
		const timer = startRest(90, t0);
		assert.equal(adjustRest(timer, 15, t0).durationSeconds, 105);
		assert.equal(adjustRest(timer, -15, t0).durationSeconds, 75);
		const shortened = adjustRest(timer, -120, t0 + 40_000);
		assert.equal(shortened.durationSeconds, 40);
		assert.equal(remainingSeconds(shortened, t0 + 40_000), 0);
	});

	test("the notification is scheduled for the end, and not once it is over", () => {
		const timer = startRest(90, t0);
		assert.equal(secondsUntilEnd(timer, t0 + 30_000), 60);
		assert.equal(secondsUntilEnd(timer, t0 + 90_000), null);
	});
});

describe("session draft", () => {
	const queue = buildSetQueue([
		slot("A", 1, 2, { supersetGroup: 1 }),
		slot("B", 2, 2, { supersetGroup: 1 }),
	]);
	const at = (minute: number) => new Date(Date.UTC(2026, 9, 16, 9, minute));
	let ids = 0;
	const newId = () => `ex-${++ids}`;

	test("an exercise is ready to send once its slot is done, with its sets in order", () => {
		let draft = createDraft("s1", at(0));
		draft = completeStep(
			draft,
			queue,
			0,
			{ weight: 50, reps: 10 },
			at(1),
			newId,
		);
		assert.equal(draft.stepIndex, 1);
		assert.deepEqual(draft.rest, {
			startedAt: at(1).getTime(),
			durationSeconds: 15,
		});
		draft = completeStep(
			draft,
			queue,
			1,
			{ weight: 20, reps: 12 },
			at(2),
			newId,
		);
		draft = completeStep(
			draft,
			queue,
			2,
			{ weight: 50, reps: 9 },
			at(5),
			newId,
		);
		assert.deepEqual(
			exercisesToSend(draft, queue).map((p) => p.slotId),
			["A"],
			"A is done, B is not",
		);
		draft = completeStep(
			draft,
			queue,
			3,
			{ weight: 20, reps: 11 },
			at(6),
			newId,
		);
		assert.equal(draft.rest, null, "no rest after the last set");
		assert.ok(isFinished(draft, queue));

		const payloads = exercisesToSend(draft, queue);
		assert.deepEqual(
			payloads.map((p) => [p.slotId, p.movementId, p.sets.map((s) => s.reps)]),
			[
				["A", "m-A", [10, 9]],
				["B", "m-B", [12, 11]],
			],
		);
		assert.equal(payloads[0].sets[1].completed_at, at(5).toISOString());
	});

	test("an exercise is sent once; an edit after the send makes it pending again", () => {
		let draft = createDraft("s1", at(0));
		for (let i = 0; i < queue.length; i++) {
			draft = completeStep(
				draft,
				queue,
				i,
				{ weight: 10, reps: 10 },
				at(i),
				newId,
			);
		}
		const [a] = exercisesToSend(draft, queue);
		// Response lost: the same id and revision are sent again, the server upserts on the id
		assert.equal(exercisesToSend(draft, queue)[0].id, a.id);
		draft = markSent(draft, a.slotId, a.revision);
		assert.deepEqual(
			exercisesToSend(draft, queue).map((p) => p.slotId),
			["B"],
		);
		draft = completeStep(
			draft,
			queue,
			0,
			{ weight: 12.5, reps: 10 },
			at(9),
			newId,
		);
		const resend = exercisesToSend(draft, queue).find((p) => p.slotId === "A");
		assert.equal(resend?.id, a.id, "same logged exercise, rewritten");
		// A confirmation of the older revision does not hide the edit
		draft = markSent(draft, "A", a.revision);
		assert.ok(hasUnsent(draft));
	});

	test("skipped sets complete the slot without being logged", () => {
		let draft = createDraft("s1", at(0));
		draft = completeStep(
			draft,
			queue,
			0,
			{ weight: 50, reps: 10 },
			at(1),
			newId,
		);
		draft = skipStep(draft, queue, 1, at(2));
		draft = skipStep(draft, queue, 2, at(2));
		draft = skipStep(draft, queue, 3, at(2));
		assert.ok(isFinished(draft, queue));
		assert.deepEqual(
			exercisesToSend(draft, queue).map((p) => [p.slotId, p.sets.length]),
			[["A", 1]],
			"B has no done set: nothing to log",
		);
	});

	test("finishing early sends unfinished slots too", () => {
		let draft = createDraft("s1", at(0));
		draft = completeStep(
			draft,
			queue,
			0,
			{ weight: 50, reps: 10 },
			at(1),
			newId,
		);
		assert.deepEqual(exercisesToSend(draft, queue), []);
		assert.equal(
			exercisesToSend(draft, queue, { includeIncomplete: true }).length,
			1,
		);
	});

	test("stored drafts are checked and a stale one is detected", () => {
		const draft = createDraft("s1", at(0));
		assert.deepEqual(parseDraft(JSON.parse(JSON.stringify(draft))), draft);
		assert.equal(parseDraft({ ...draft, version: 99 }), null);
		assert.equal(parseDraft("garbage"), null);
		assert.equal(isStale(draft, at(60)), false);
		assert.equal(
			isStale(draft, new Date(at(0).getTime() + 5 * 3600_000)),
			true,
		);
	});
});
