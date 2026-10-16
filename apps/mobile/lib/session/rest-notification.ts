// End-of-rest local notification, for when the app is in the background or killed. One fixed id: every
// change to the timer replaces it, a skipped or finished rest cancels it. In the foreground the guided
// session screen plays its own sound and haptics, so the banner is not shown.
import * as Notifications from "expo-notifications";

import { restEndsAt, type RestTimer } from "./rest";

const REST_NOTIFICATION_ID = "rest-timer";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowBanner: false,
		shouldShowList: false,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

let permission: Promise<boolean> | null = null;

// Asked once, the first time a rest starts
function ensurePermission(): Promise<boolean> {
	permission ??= (async () => {
		const current = await Notifications.getPermissionsAsync();
		if (current.granted) return true;
		if (!current.canAskAgain) return false;
		const asked = await Notifications.requestPermissionsAsync();
		return asked.granted;
	})();
	return permission;
}

// Schedules run one after the other so only the latest timer survives
let queue: Promise<void> = Promise.resolve();

export function scheduleRestNotification(
	timer: RestTimer | null,
	nextLabel: string | null,
) {
	queue = queue
		.then(async () => {
			await Notifications.cancelScheduledNotificationAsync(
				REST_NOTIFICATION_ID,
			);
			if (!timer) return;
			const endsAt = restEndsAt(timer);
			// iOS rejects a date already in the past
			if (endsAt <= Date.now() + 1000) return;
			if (!(await ensurePermission())) return;
			await Notifications.scheduleNotificationAsync({
				identifier: REST_NOTIFICATION_ID,
				content: {
					title: "Repos terminé",
					body: nextLabel ? `À toi : ${nextLabel}` : "Série suivante",
					sound: true,
				},
				trigger: {
					type: Notifications.SchedulableTriggerInputTypes.DATE,
					date: new Date(endsAt),
				},
			});
		})
		.catch((error) => console.warn("Rest notification:", error));
}
