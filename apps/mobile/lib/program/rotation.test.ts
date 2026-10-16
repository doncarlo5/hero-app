import assert from "node:assert/strict";
import { test } from "node:test";

import { lastSessionByDay, nextProgramDay } from "./rotation.ts";

const days = [
	{ id: "b", position: 2 },
	{ id: "a", position: 1 },
	{ id: "c", position: 3 },
];

test("no session yet: the first day", () => {
	assert.equal(nextProgramDay(days, []), "a");
});

test("the day after the last one done", () => {
	const sessions = [
		{ program_day_id: "a", date_session: "2026-10-12T10:00:00Z" },
		{ program_day_id: "b", date_session: "2026-10-14T10:00:00Z" },
	];
	assert.equal(nextProgramDay(days, sessions), "c");
});

test("wraps around after the last day", () => {
	const sessions = [
		{ program_day_id: "c", date_session: "2026-10-16T10:00:00Z" },
		{ program_day_id: "a", date_session: "2026-10-12T10:00:00Z" },
	];
	assert.equal(nextProgramDay(days, sessions), "a");
});

test("a day redone out of order sets the rotation", () => {
	// a, b, then a again: b comes next
	const sessions = [
		{ program_day_id: "a", date_session: "2026-10-12T10:00:00Z" },
		{ program_day_id: "b", date_session: "2026-10-14T10:00:00Z" },
		{ program_day_id: "a", date_session: "2026-10-16T10:00:00Z" },
	];
	assert.equal(nextProgramDay(days, sessions), "b");
});

test("free sessions and other programs' days are ignored", () => {
	const sessions = [
		{ program_day_id: "a", date_session: "2026-10-12T10:00:00Z" },
		{ program_day_id: null, date_session: "2026-10-15T10:00:00Z" },
		{ program_day_id: "other", date_session: "2026-10-16T10:00:00Z" },
	];
	assert.equal(nextProgramDay(days, sessions), "b");
});

test("no day: no suggestion", () => {
	assert.equal(nextProgramDay([], []), null);
});

test("last date per day compares dates, not strings", () => {
	const latest = lastSessionByDay(days, [
		{ program_day_id: "a", date_session: "2026-10-12T23:30:00+02:00" },
		{ program_day_id: "a", date_session: "2026-10-12T22:00:00Z" },
	]);
	assert.equal(latest.get("a"), "2026-10-12T22:00:00Z");
});

test("the next day compares dates across time zones", () => {
	// 23:30+02:00 is 21:30Z, before 22:00Z
	const sessions = [
		{ program_day_id: "b", date_session: "2026-10-12T23:30:00+02:00" },
		{ program_day_id: "a", date_session: "2026-10-12T22:00:00Z" },
	];
	assert.equal(nextProgramDay(days, sessions), "b");
});
