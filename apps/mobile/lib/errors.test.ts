// Run with `npm test` in apps/mobile (Node's test runner, TypeScript stripped natively).
import assert from "node:assert/strict";
import { test } from "node:test";

import { errorMessage } from "./errors.ts";

const fallback = "Impossible d’enregistrer l’exercice.";

test("network failures say there is no connection", () => {
	assert.match(
		errorMessage(new TypeError("Network request failed"), fallback),
		/Pas de connexion/,
	);
	assert.match(
		errorMessage(new Error("Pas de réponse du serveur"), fallback),
		/Pas de connexion/,
	);
});

test("Supabase codes become readable sentences", () => {
	assert.match(
		errorMessage({ code: "PGRST301" }, fallback),
		/session a expiré/,
	);
	assert.match(
		errorMessage({ code: "P0002", message: "Exercise not found" }, fallback),
		/Introuvable/,
	);
	assert.equal(
		errorMessage({ code: "22023", message: "Each set needs…" }, fallback),
		`${fallback} Vérifie les valeurs saisies.`,
	);
});

test("anything else keeps the fallback, never a raw English message", () => {
	assert.equal(
		errorMessage({ code: "XX000", message: "internal" }, fallback),
		fallback,
	);
	assert.equal(errorMessage(null, fallback), fallback);
});
