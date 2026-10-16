import type { Movement } from "@/lib/queries/types";

// French labels of the library's muscle groups (free-exercise-db values)
const MUSCLE_LABELS: Record<string, string> = {
	abdominals: "Abdominaux",
	abductors: "Abducteurs",
	adductors: "Adducteurs",
	biceps: "Biceps",
	calves: "Mollets",
	chest: "Pectoraux",
	forearms: "Avant-bras",
	glutes: "Fessiers",
	hamstrings: "Ischios",
	lats: "Grand dorsal",
	"lower back": "Lombaires",
	"middle back": "Milieu du dos",
	neck: "Cou",
	quadriceps: "Quadriceps",
	shoulders: "Épaules",
	traps: "Trapèzes",
	triceps: "Triceps",
};

export function muscleLabel(muscle: string) {
	return MUSCLE_LABELS[muscle] ?? muscle;
}

// Everyday words for a muscle, so a search for "pecs", "abdos" or "dos" finds it
const MUSCLE_SYNONYMS: Record<string, string[]> = {
	abdominals: ["abdos", "abs", "sangle"],
	biceps: ["bras"],
	triceps: ["bras"],
	forearms: ["bras", "grip"],
	chest: ["pecs", "poitrine"],
	lats: ["dos", "dorsaux"],
	"middle back": ["dos"],
	"lower back": ["dos", "lombaires"],
	traps: ["dos"],
	shoulders: ["delts", "deltoides"],
	quadriceps: ["quads", "cuisses", "jambes"],
	hamstrings: ["jambes", "cuisses"],
	glutes: ["fesses", "jambes"],
	calves: ["jambes"],
	adductors: ["jambes"],
	abductors: ["jambes"],
};

/** Muscle groups used to filter the library, from the source's muscles */
export const MUSCLE_GROUPS: {
	key: string;
	label: string;
	muscles: string[];
}[] = [
	{ key: "chest", label: "Pectoraux", muscles: ["chest"] },
	{
		key: "back",
		label: "Dos",
		muscles: ["lats", "middle back", "lower back", "traps"],
	},
	{ key: "shoulders", label: "Épaules", muscles: ["shoulders"] },
	{ key: "arms", label: "Bras", muscles: ["biceps", "triceps", "forearms"] },
	{
		key: "legs",
		label: "Jambes",
		muscles: [
			"quadriceps",
			"hamstrings",
			"glutes",
			"calves",
			"adductors",
			"abductors",
		],
	},
	{ key: "core", label: "Abdos", muscles: ["abdominals"] },
];

/** The movement works the group as a primary muscle */
export function inMuscleGroup(movement: Movement, groupKey: string) {
	const group = MUSCLE_GROUPS.find((g) => g.key === groupKey);
	return Boolean(
		group?.muscles.some((m) => movement.primary_muscles.includes(m)),
	);
}

// French labels of the library's equipment (free-exercise-db values)
const EQUIPMENT_LABELS: Record<string, string> = {
	barbell: "Barre",
	dumbbell: "Haltères",
	cable: "Poulie",
	machine: "Machine",
	kettlebells: "Kettlebell",
	bands: "Élastiques",
	"body only": "Poids du corps",
	"medicine ball": "Médecine-ball",
	"exercise ball": "Swiss ball",
	"e-z curl bar": "Barre EZ",
	"foam roll": "Rouleau",
	other: "Autre",
};

export function equipmentLabel(equipment: string) {
	return EQUIPMENT_LABELS[equipment] ?? equipment;
}

/** Path of the small list thumbnail of a library image (scripts/import-movement-library.js makes it) */
export function thumbnailPath(imagePath: string) {
	return `thumbs/${imagePath.replace(/\.[a-z]+$/i, "")}.webp`;
}

// Library movements are shared (no owner) and read-only
export function isLibraryMovement(movement: Movement) {
	return movement.owner_id === null;
}

// Lowercase, no accents (combining marks U+0300 to U+036F), no apostrophes ("farmer’s" = "farmers")
const normalize = (value: string) =>
	value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/['’]/g, "")
		.toLowerCase();

// Every word of the query must appear in the name, an alias, the equipment or a primary muscle
// (English or French)
export function matchesMovementSearch(movement: Movement, query: string) {
	const words = normalize(query).split(/\s+/).filter(Boolean);
	if (words.length === 0) return true;
	const haystack = normalize(
		[
			movement.name,
			...(movement.aliases ?? []),
			movement.equipment ?? "",
			movement.equipment ? equipmentLabel(movement.equipment) : "",
			...movement.primary_muscles,
			...movement.primary_muscles.map(muscleLabel),
			// Secondary muscles are left out on purpose: "biceps" should not list every row and pull-up
			...movement.primary_muscles.flatMap((m) => MUSCLE_SYNONYMS[m] ?? []),
		].join(" "),
	);
	return words.every((word) => haystack.includes(word));
}
