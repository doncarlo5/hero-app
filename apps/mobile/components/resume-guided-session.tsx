import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

import { supabase } from "@/config/supabase";
import { hasUnsent, isStale } from "@/lib/session/draft";
import {
	clearDraft,
	draftSessionIds,
	loadActiveDraft,
	pruneDrafts,
} from "@/lib/session/draft-storage";
import { scheduleRestNotification } from "@/lib/session/rest-notification";

// Once per launch. Kept on globalThis so a dev reload (Fast Refresh) does not ask again.
const launch = globalThis as { heroResumeChecked?: boolean };

// After the app was killed mid-session: offer to resume the guided session. A draft untouched for
// hours is offered to be finished or discarded instead (ADR-0002).
export function ResumeGuidedSession() {
	const router = useRouter();
	const segments = useSegments();
	// Already on the guided session screen (deep link, or the app reopened there): nothing to offer
	const onGuidedScreen = segments.some((s) => s === "guided-session");

	useEffect(() => {
		if (launch.heroResumeChecked || onGuidedScreen) return;
		launch.heroResumeChecked = true;
		loadActiveDraft().then(async (draft) => {
			await pruneDrafts(draft?.sessionId ?? null).catch(() => {});
			// Drafts of sessions deleted meanwhile can never be sent: drop them (online only)
			const ids = await draftSessionIds();
			if (ids.length > 0) {
				const { data: existing, error } = await supabase
					.from("sessions")
					.select("id")
					.in("id", ids);
				if (!error) {
					const kept = new Set((existing ?? []).map((row) => row.id));
					await Promise.all(
						ids.filter((id) => !kept.has(id)).map((id) => clearDraft(id)),
					);
					if (draft && !kept.has(draft.sessionId)) {
						scheduleRestNotification(null, null);
						return;
					}
				}
			}
			if (!draft) return;
			const resume = () =>
				router.push(`/(protected)/guided-session?sessionId=${draft.sessionId}`);
			const discard = () => {
				scheduleRestNotification(null, null);
				clearDraft(draft.sessionId);
			};
			const stale = isStale(draft, new Date());
			Alert.alert(
				stale ? "Séance non terminée" : "Séance en cours",
				stale
					? "Une séance guidée est restée ouverte. Reprends-la pour la terminer, ou abandonne-la."
					: "Reprendre la séance guidée là où tu l'as laissée ?",
				[
					{
						text: "Abandonner",
						style: "destructive",
						onPress: () =>
							hasUnsent(draft)
								? Alert.alert(
										"Abandonner la séance ?",
										"Des séries n'ont pas encore été envoyées : elles seront perdues.",
										[
											{ text: "Annuler", style: "cancel" },
											{
												text: "Abandonner",
												style: "destructive",
												onPress: discard,
											},
										],
									)
								: discard(),
					},
					{ text: "Reprendre", style: "default", onPress: resume },
				],
			);
		});
	}, []);

	return null;
}
