import { useMutation } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { unwrap } from "./client";

export function useSendFeedback() {
	return useMutation({
		mutationFn: async (input: {
			ownerId: string;
			subject: string;
			message: string;
		}) =>
			unwrap(
				await supabase.from("feedbacks").insert({
					owner_id: input.ownerId,
					subject: input.subject,
					message: input.message,
				}),
			),
	});
}
