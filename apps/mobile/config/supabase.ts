import { AppState, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import * as aesjs from "aes-js";
import * as SecureStore from "expo-secure-store";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import type { Database } from "@/types/database";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

// The session is too large for SecureStore (2KB limit): it is AES-encrypted and kept in
// AsyncStorage, while the 256-bit key lives in SecureStore (Keychain / Keystore).
class LargeSecureStore {
	private async encrypt(key: string, value: string) {
		const encryptionKey = crypto.getRandomValues(new Uint8Array(256 / 8));
		const cipher = new aesjs.ModeOfOperation.ctr(
			encryptionKey,
			new aesjs.Counter(1),
		);
		const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));
		await SecureStore.setItemAsync(
			key,
			aesjs.utils.hex.fromBytes(encryptionKey),
		);
		return aesjs.utils.hex.fromBytes(encryptedBytes);
	}

	private async decrypt(key: string, value: string) {
		const encryptionKeyHex = await SecureStore.getItemAsync(key);
		if (!encryptionKeyHex) {
			return null;
		}
		const cipher = new aesjs.ModeOfOperation.ctr(
			aesjs.utils.hex.toBytes(encryptionKeyHex),
			new aesjs.Counter(1),
		);
		const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));
		return aesjs.utils.utf8.fromBytes(decryptedBytes);
	}

	async getItem(key: string) {
		const stored = await AsyncStorage.getItem(key);
		if (!stored) {
			return null;
		}
		// Sessions saved by previous versions are plain JSON: encrypt them in place
		// so existing users stay signed in after the update.
		if (stored.startsWith("{")) {
			await this.setItem(key, stored);
			return stored;
		}
		return this.decrypt(key, stored);
	}

	async setItem(key: string, value: string) {
		const encrypted = await this.encrypt(key, value);
		await AsyncStorage.setItem(key, encrypted);
	}

	async removeItem(key: string) {
		await AsyncStorage.removeItem(key);
		await SecureStore.deleteItemAsync(key);
	}
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
	auth: {
		// SecureStore is not available on web
		storage: Platform.OS === "web" ? AsyncStorage : new LargeSecureStore(),
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
		lock: processLock,
	},
});

AppState.addEventListener("change", (state) => {
	if (state === "active") {
		supabase.auth.startAutoRefresh();
	} else {
		supabase.auth.stopAutoRefresh();
	}
});
