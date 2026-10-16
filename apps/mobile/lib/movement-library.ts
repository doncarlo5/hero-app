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

const normalize = (value: string) =>
	value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

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
		].join(" "),
	);
	return words.every((word) => haystack.includes(word));
}
