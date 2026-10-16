import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

import { hasUnsent, isStale } from "@/lib/session/draft";
import { clearDraft, loadActiveDraft } from "@/lib/session/draft-storage";
import { scheduleRestNotification } from "@/lib/session/rest-notification";

// Once per launch
let checked = false;

// After the app was killed mid-session: offer to resume the guided session. A draft untouched for
// hours is offered to be finished or discarded instead (ADR-0002).
export function ResumeGuidedSession() {
	const router = useRouter();

	useEffect(() => {
		if (checked) return;
		checked = true;
		loadActiveDraft().then((draft) => {
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
