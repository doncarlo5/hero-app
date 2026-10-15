import { useQuery } from "@tanstack/react-query";

import { supabase } from "@/config/supabase";

import { queryKeys, unwrap } from "./client";
import type { Trophy } from "./types";

// Trophies are read-only for the client: the database awards them
export function useTrophies() {
	return useQuery({
		queryKey: queryKeys.trophies,
		queryFn: async (): Promise<Trophy[]> =>
			unwrap(
				await supabase
					.from("trophies")
					.select("*, movement:movements(name)")
					.order("level", { ascending: true }),
			),
	});
}
