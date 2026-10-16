// One way to turn a failure into a sentence for the lifter: network, Supabase (PostgREST and RPC
// errors raised by the database) or anything else. Pure, unit-tested with `npm test`.

type SupabaseLikeError = { code?: string; message?: string; status?: number };

/** French message for an error, with a fallback naming what failed ("Impossible d’enregistrer…") */
export function errorMessage(error: unknown, fallback: string): string {
	if (!error) return fallback;
	const e = error as SupabaseLikeError;
	const message = typeof e.message === "string" ? e.message : "";

	// No answer from the server: offline, or a timeout
	if (
		/network request failed|failed to fetch|load failed|pas de réponse du serveur|timed? ?out/i.test(
			message,
		)
	) {
		return "Pas de connexion. Réessaie quand tu as du réseau.";
	}
	// Session expired or signed out meanwhile
	if (
		e.code === "PGRST301" ||
		e.status === 401 ||
		/jwt expired/i.test(message)
	) {
		return "Ta session a expiré. Reconnecte-toi.";
	}
	// Row not found (deleted elsewhere, or not yours)
	if (e.code === "PGRST116" || e.code === "P0002") {
		return "Introuvable : cet élément a peut-être été supprimé.";
	}
	// Validation raised by our RPCs (errcode 22023 / 22001) or a check constraint: their messages are
	// written for people, in English; keep the fallback, which says what the user was doing
	if (e.code === "22023" || e.code === "22001" || e.code === "23514") {
		return `${fallback} Vérifie les valeurs saisies.`;
	}
	return fallback;
}
