import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60,
			retry: 2,
		},
	},
});

// Cache keys, grouped by domain so a mutation can invalidate a whole family
export const queryKeys = {
	profile: ["profile"] as const,
	sessions: ["sessions"] as const,
	session: (id: string) => ["sessions", "detail", id] as const,
	exerciseTypes: ["exercise-types"] as const,
	exerciseType: (id: string) => ["exercise-types", "detail", id] as const,
	exercises: ["exercises"] as const,
	exercise: (id: string) => ["exercises", "detail", id] as const,
	trophies: ["trophies"] as const,
	programs: ["programs"] as const,
	program: (sessionType: string) => ["programs", sessionType] as const,
};

// Supabase returns { data, error }: throw so React Query sees the failure.
// Without error, data is set (single rows, lists, mutations without select return null).
export function unwrap<T>(result: { data: T | null; error: unknown }): T {
	if (result.error) {
		throw result.error;
	}
	return result.data as T;
}

// For maybeSingle(): no row is a valid result
export function unwrapMaybe<T>(result: {
	data: T | null;
	error: unknown;
}): T | null {
	if (result.error) {
		throw result.error;
	}
	return result.data;
}
