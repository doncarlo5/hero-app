import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { subDays } from "date-fns";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap, unwrapMaybe } from "./client";
import type {
	Session,
	SessionListItem,
	SessionType,
	SessionWithExercises,
} from "./types";

const SESSIONS_PAGE_SIZE = 30;

const SESSION_DETAIL_SELECT =
	"*, exercise_users(*, exercise_sets(set_order, weight, reps), exercise_types(*))";

export function useSessionsPages() {
	return useInfiniteQuery({
		queryKey: [...queryKeys.sessions, "pages"],
		initialPageParam: 0,
		queryFn: async ({ pageParam }): Promise<SessionListItem[]> => {
			const from = pageParam * SESSIONS_PAGE_SIZE;
			return unwrap(
				await supabase
					.from("sessions")
					.select(
						"id, date_session, type_session, is_done, comment, exercise_users(count)",
					)
					.order("date_session", { ascending: false })
					.range(from, from + SESSIONS_PAGE_SIZE - 1),
			);
		},
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length === SESSIONS_PAGE_SIZE ? allPages.length : undefined,
	});
}

export function useSessionsCount() {
	return useQuery({
		queryKey: [...queryKeys.sessions, "count"],
		queryFn: async () => {
			const { count, error } = await supabase
				.from("sessions")
				.select("id", { count: "exact", head: true });
			if (error) {
				throw error;
			}
			return count ?? 0;
		},
	});
}

export function useLastSession() {
	return useQuery({
		queryKey: [...queryKeys.sessions, "last"],
		queryFn: async (): Promise<Session | null> =>
			unwrapMaybe(
				await supabase
					.from("sessions")
					.select("*")
					.order("date_session", { ascending: false })
					.limit(1)
					.maybeSingle(),
			),
	});
}

// Most recent session other than the current one (for "your last notes")
export function usePreviousSession(currentId: string) {
	return useQuery({
		queryKey: [...queryKeys.sessions, "previous", currentId],
		queryFn: async (): Promise<Session | null> =>
			unwrapMaybe(
				await supabase
					.from("sessions")
					.select("*")
					.neq("id", currentId)
					.order("date_session", { ascending: false })
					.limit(1)
					.maybeSingle(),
			),
	});
}

export function useRecentSessions(days: number) {
	return useQuery({
		queryKey: [...queryKeys.sessions, "recent", days],
		queryFn: async (): Promise<Pick<Session, "id" | "date_session">[]> =>
			unwrap(
				await supabase
					.from("sessions")
					.select("id, date_session")
					.gte("date_session", subDays(new Date(), days).toISOString()),
			),
	});
}

export function useSession(id: string) {
	return useQuery({
		queryKey: queryKeys.session(id),
		queryFn: async (): Promise<SessionWithExercises> =>
			unwrap(
				await supabase
					.from("sessions")
					.select(SESSION_DETAIL_SELECT)
					.eq("id", id)
					.order("created_at", { referencedTable: "exercise_users" })
					.single(),
			),
	});
}

export function useCreateSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			ownerId: string;
			typeSession: SessionType;
			bodyWeight: number;
		}): Promise<Session> =>
			unwrap(
				await supabase
					.from("sessions")
					.insert({
						owner_id: input.ownerId,
						date_session: new Date().toISOString(),
						type_session: input.typeSession,
						body_weight: input.bodyWeight,
					})
					.select()
					.single(),
			),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions }),
	});
}

export function useUpdateSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			id: string;
			changes: Partial<
				Pick<Session, "body_weight" | "comment" | "date_session" | "is_done">
			>;
		}) =>
			unwrap(
				await supabase
					.from("sessions")
					.update(input.changes)
					.eq("id", input.id),
			),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			// Body weight changes re-evaluate trophies in the database
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}

export function useDeleteSession() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) =>
			unwrap(await supabase.from("sessions").delete().eq("id", id)),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: queryKeys.sessions });
			queryClient.invalidateQueries({ queryKey: queryKeys.exercises });
			queryClient.invalidateQueries({ queryKey: queryKeys.trophies });
		},
	});
}
