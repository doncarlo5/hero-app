// Device storage of the guided session draft (ADR-0002). One draft per session, plus a pointer to the
// session in progress so the app can offer to resume it after being killed.
import AsyncStorage from "@react-native-async-storage/async-storage";

import { hasUnsent, parseDraft, type SessionDraft } from "./draft";

const ACTIVE_KEY = "guided-session:active";
const draftKey = (sessionId: string) => `guided-session:${sessionId}`;

export async function loadDraft(
	sessionId: string,
): Promise<SessionDraft | null> {
	try {
		const raw = await AsyncStorage.getItem(draftKey(sessionId));
		return raw ? parseDraft(JSON.parse(raw)) : null;
	} catch (error) {
		console.warn("Guided session draft:", error);
		return null;
	}
}

export async function saveDraft(draft: SessionDraft) {
	await AsyncStorage.multiSet([
		[draftKey(draft.sessionId), JSON.stringify(draft)],
		[ACTIVE_KEY, draft.sessionId],
	]);
}

export async function clearDraft(sessionId: string) {
	await AsyncStorage.removeItem(draftKey(sessionId));
	if ((await AsyncStorage.getItem(ACTIVE_KEY)) === sessionId) {
		await AsyncStorage.removeItem(ACTIVE_KEY);
	}
}

/** The draft of the session in progress, if any */
export async function loadActiveDraft(): Promise<SessionDraft | null> {
	const sessionId = await AsyncStorage.getItem(ACTIVE_KEY);
	return sessionId ? loadDraft(sessionId) : null;
}

/** Drops every draft and the pointer: they are the signed-out user's data */
export async function clearAllDrafts() {
	const keys = await AsyncStorage.getAllKeys();
	await AsyncStorage.multiRemove(
		keys.filter((key) => key.startsWith("guided-session:")),
	);
}

/**
 * Drops the drafts of other sessions that have nothing left to send (finished or abandoned guided
 * sessions). A draft with unsent exercises is kept: it may still reach the server.
 */
export async function pruneDrafts(keepSessionId: string | null) {
	const keys = (await AsyncStorage.getAllKeys()).filter(
		(key) =>
			key.startsWith("guided-session:") &&
			key !== ACTIVE_KEY &&
			key !== (keepSessionId ? draftKey(keepSessionId) : null),
	);
	const stale: string[] = [];
	for (const [key, raw] of await AsyncStorage.multiGet(keys)) {
		const draft = raw ? parseDraft(JSON.parse(raw)) : null;
		if (!draft || !hasUnsent(draft)) stale.push(key);
	}
	if (stale.length > 0) await AsyncStorage.multiRemove(stale);
}

/** Sessions that still have a draft on the device */
export async function draftSessionIds(): Promise<string[]> {
	return (await AsyncStorage.getAllKeys())
		.filter((key) => key.startsWith("guided-session:") && key !== ACTIVE_KEY)
		.map((key) => key.slice("guided-session:".length));
}
