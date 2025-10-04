module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[
				"babel-preset-expo",
				{
					jsxImportSource: "nativewind",
					// Disable worklets plugin to avoid conflicts
					unstable_disableES6Transforms: false,
				},
			],
			"nativewind/babel",
		],
		plugins: [
			"react-native-reanimated/plugin", // Must be last
		],
	};
};
