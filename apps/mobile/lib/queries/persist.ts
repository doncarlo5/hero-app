// Device copy of the queries the guided session reads, so it opens with no network (ADR-0002).
// Only these queries are written; mutations never are (the session draft carries unsent sets).
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { defaultShouldDehydrateQuery, type Query } from "@tanstack/react-query";
import type { PersistQueryClientOptions } from "@tanstack/react-query-persist-client";
import Constants from "expo-constants";

import { queryClient, queryKeys } from "./client";

const MAX_AGE_MS = 1000 * 60 * 60 * 24;

// Key prefixes: profile (active program id), session detail, programs, last performance per movement
const OFFLINE_QUERY_KEYS = [
	queryKeys.profile,
	[...queryKeys.sessions, "detail"],
	queryKeys.programs,
	[...queryKeys.exercises, "last"],
	queryKeys.movementSettings,
];

function isOfflineQuery(query: Query) {
	return OFFLINE_QUERY_KEYS.some((prefix) =>
		prefix.every((part, i) => query.queryKey[i] === part),
	);
}

// A restored query unused for gcTime would be dropped from the cache, then from the device copy
for (const prefix of OFFLINE_QUERY_KEYS) {
	queryClient.setQueryDefaults(prefix, { gcTime: MAX_AGE_MS });
}

const persister = createAsyncStoragePersister({
	storage: AsyncStorage,
	key: "query-cache",
});

export const persistOptions: Omit<PersistQueryClientOptions, "queryClient"> = {
	persister,
	maxAge: MAX_AGE_MS,
	// A new app version may change the shape of the cached data
	buster: Constants.expoConfig?.version ?? "",
	dehydrateOptions: {
		shouldDehydrateQuery: (query) =>
			defaultShouldDehydrateQuery(query) && isOfflineQuery(query),
		shouldDehydrateMutation: () => false,
	},
};

/** Drops the device copy: it is the user's data */
export async function clearPersistedQueries() {
	await persister.removeClient();
}
