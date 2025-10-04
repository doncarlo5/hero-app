// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
	expoConfig,
	{
		ignores: ["dist/*"],
		rules: {
			// Disable React hooks exhaustive deps warning
			"react-hooks/exhaustive-deps": "off",
			// Disable unused variables warning
			"@typescript-eslint/no-unused-vars": "off",
		},
	},
]);
