import { UserType } from "@/types/user.type";
import { useEffect, useState } from "react";
import fetchApi from "../api-handler";

export const useProfile = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState<UserType | null>(null);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userResponse = await fetchApi("/api/auth/get-user", {
					noStore: true,
				});
				setUser(userResponse?.user ?? null);
			} catch (error) {
				console.error("Error fetching user:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchUser();
	}, []);

	return { user, isLoading };
};
