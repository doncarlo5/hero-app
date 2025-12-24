import { supabase } from "@/config/supabase";

const baseURL = process.env.EXPO_PUBLIC_BASE_URL as string;

interface FetchApiOptions extends RequestInit {
	noStore?: boolean;
}

export const fetchApi = async (
	endpoint: string,
	options: FetchApiOptions = {},
) => {
	const headers = await getAuthHeaders();
	const { noStore, ...fetchOptions } = options;

	const response = await fetch(`${baseURL}${endpoint}`, {
		...fetchOptions,
		headers: {
			...headers,
			...fetchOptions.headers,
		},
	});

	if (!response.ok) {
		let errorMessage = "Something went wrong";
		try {
			const data = await response.json();
			errorMessage = data.message || errorMessage;
		} catch (e) {
			console.error("Error parsing error response", e);
		}
		throw new Error(errorMessage);
	}

	if (
		response.status === 204 ||
		response.headers.get("Content-Length") === "0"
	) {
		return;
	}

	return response.json();
};

const getAuthHeaders = async () => {
	let token: { access_token: string } | null = null;

	try {
		const {
			data: { session },
			error,
		} = await supabase.auth.getSession();
		if (error) {
			console.error("Error reading claims", error);
		}
		if (session) {
			token = {
				access_token: session.access_token,
			};
		}
	} catch (error) {
		console.error("Error reading session", error);
	}

	return {
		Authorization: token ? `Bearer ${token.access_token}` : "",
		"Content-Type": "application/json",
	};
};

export default fetchApi;
