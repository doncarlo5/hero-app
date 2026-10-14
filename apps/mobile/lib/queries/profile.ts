import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap } from "./client";
import type { Profile } from "./types";

// ensure_profile creates the profile and default data on first sign-in if the
// sign-up trigger did not, then returns the profile
export function useProfile() {
	return useQuery({
		queryKey: queryKeys.profile,
		queryFn: async (): Promise<Profile> =>
			unwrap(await supabase.rpc("ensure_profile")),
	});
}

export function useUpdateProfile() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: {
			id: string;
			firstName: string;
			lastName: string;
			email: string;
			currentEmail: string | null;
			password: string;
		}) => {
			unwrap(
				await supabase
					.from("profiles")
					.update({ first_name: input.firstName, last_name: input.lastName })
					.eq("id", input.id),
			);

			// Email and password belong to Supabase Auth; an email change is only
			// applied once the user confirms it from the email they receive
			const authUpdate: { email?: string; password?: string } = {};
			if (input.email && input.email !== input.currentEmail) {
				authUpdate.email = input.email;
			}
			if (input.password) {
				authUpdate.password = input.password;
			}
			if (Object.keys(authUpdate).length > 0) {
				const { error } = await supabase.auth.updateUser(authUpdate);
				if (error) {
					throw error;
				}
			}
			return { emailChangePending: Boolean(authUpdate.email) };
		},
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: queryKeys.profile }),
	});
}
