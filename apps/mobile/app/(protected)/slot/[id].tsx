import { Host, Switch } from "@expo/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Input, TextArea } from "heroui-native";
import { Check, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	ScrollView,
	View,
} from "react-native";

import { MovementPicker } from "@/components/movement-picker";
import { Text } from "@/components/ui/text";
import { errorMessage } from "@/lib/errors";
import { slotWithMovementSettings } from "@/lib/movement-settings";
import { useMovementSettings, useMovements } from "@/lib/queries/movements";
import { useActiveProgram, useSaveSlot } from "@/lib/queries/programs";
import type {
	FinisherKind,
	LoadRule,
	ProgressionRule,
	Slot,
} from "@/lib/queries/types";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

const PROGRESSION_RULES: {
	value: ProgressionRule;
	label: string;
	help: string;
}[] = [
	{
		value: "all_sets",
		label: "Toutes les séries",
		help: "La charge monte quand toutes les séries sont dans le haut de la fourchette.",
	},
	{
		value: "per_set",
		label: "Série par série",
		help: "Chaque série monte dès qu’elle atteint le haut de sa fourchette.",
	},
	{
		value: "manual",
		label: "Manuelle",
		help: "L’app reprend les charges de la dernière fois.",
	},
];

const LOAD_RULES: { value: LoadRule; label: string; unit: string | null }[] = [
	{ value: "same", label: "Même charge", unit: null },
	{ value: "percent", label: "En %", unit: "%" },
	{ value: "step", label: "En kg", unit: "kg" },
];

type SetForm = {
	repMin: string;
	repMax: string;
	loadRule: LoadRule;
	loadValue: string;
	restSeconds: string;
	label: string | null;
};

type FormState = {
	progressionRule: ProgressionRule;
	restSeconds: string;
	restPerSide: boolean;
	tempo: string;
	note: string;
	supersetWith: string | null;
	isKeyLift: boolean;
	finisherKind: FinisherKind | null;
	finisherCount: string;
	finisherLoadStep: string;
	finisherRestSeconds: string;
	finisherMovementId: string | null;
	sets: SetForm[];
};

const FINISHERS: { value: FinisherKind | null; label: string; help: string }[] =
	[
		{ value: null, label: "Aucun", help: "" },
		{
			value: "drop_sets",
			label: "Drop sets",
			help: "Après la dernière série, la charge baisse et tu enchaînes sans repos.",
		},
		{
			value: "cheat_reps",
			label: "Reps trichées",
			help: "Quelques reps de plus après l’échec, avec un peu d’élan. Exercices d’isolation seulement.",
		},
		{
			value: "switch",
			label: "Switch",
			help: "Après l’échec, tu passes sans repos sur un exercice plus facile qui travaille le même muscle.",
		},
		{
			value: "mini_sets",
			label: "Mini-séries",
			help: "De courtes séries séparées d’une dizaine de secondes, comptées comme une seule.",
		},
	];

// "12,5" and "12.5" are both accepted; empty input is null, invalid input is NaN
function parseOptional(value: string): number | null {
	if (value.trim() === "") return null;
	return Number(value.replace(",", "."));
}

function formFromSlot(slot: Slot, daySlots: Slot[]): FormState {
	const partner = slot.superset_group
		? daySlots.find(
				(s) => s.id !== slot.id && s.superset_group === slot.superset_group,
			)
		: undefined;
	const sets = [...slot.set_prescriptions].sort(
		(a, b) => a.position - b.position,
	);
	return {
		progressionRule: slot.progression_rule,
		restSeconds: slot.rest_seconds?.toString() ?? "",
		restPerSide: slot.rest_per_side,
		tempo: slot.tempo ?? "",
		note: slot.note ?? "",
		supersetWith: partner?.id ?? null,
		isKeyLift: slot.is_key_lift,
		finisherKind: slot.finisher_kind,
		finisherCount: slot.finisher_count?.toString() ?? "",
		finisherLoadStep: slot.finisher_load_step?.toString() ?? "",
		finisherRestSeconds: slot.finisher_rest_seconds?.toString() ?? "",
		finisherMovementId: slot.finisher_movement_id,
		sets: (sets.length > 0
			? sets
			: [
					{
						rep_min: 8,
						rep_max: 12,
						load_rule: "none",
						load_value: null,
						rest_seconds: null,
						label: null,
					},
				]
		).map((p) => ({
			repMin: p.rep_min?.toString() ?? "",
			repMax: p.rep_max?.toString() ?? "",
			loadRule: (p.load_rule === "none" ? "same" : p.load_rule) as LoadRule,
			loadValue: p.load_value?.toString() ?? "",
			restSeconds: p.rest_seconds?.toString() ?? "",
			label: p.label,
		})),
	};
}

function Chip(props: {
	label: string;
	isSelected: boolean;
	onPress: () => void;
}) {
	return (
		<Pressable
			onPress={props.onPress}
			accessibilityRole="button"
			accessibilityState={{ selected: props.isSelected }}
			className={cn(
				"px-3 py-2 rounded-lg border",
				props.isSelected
					? "bg-foreground border-foreground"
					: "border-border bg-default/30",
			)}
		>
			<Text
				className={
					props.isSelected ? "text-background font-medium" : "text-foreground"
				}
			>
				{props.label}
			</Text>
		</Pressable>
	);
}

// Settings of a slot: its sets (rep range, load relative to the previous set, rest), the progression
// rule, the rest, a superset partner, tempo and note. Terms follow GLOSSARY.md.
export default function SlotSettings() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const themeColors = useThemeColors();
	const programQuery = useActiveProgram();
	const saveSlot = useSaveSlot();
	const movementsQuery = useMovements();

	const day =
		programQuery.data?.program_days.find((d) =>
			d.slots.some((s) => s.id === id),
		) ?? null;
	const settingsQuery = useMovementSettings();
	const daySlot = day?.slots.find((s) => s.id === id) ?? null;
	// "Repos après chaque côté" follows the user's setting for a library movement
	const slot = daySlot
		? slotWithMovementSettings(daySlot, settingsQuery.data ?? new Map())
		: null;
	const otherSlots = day?.slots.filter((s) => s.id !== id) ?? [];

	const [form, setForm] = useState<FormState | null>(null);
	const [filledFrom, setFilledFrom] = useState<Slot | null>(null);
	// Compared on the loaded row: the slot with settings is a new object each render
	if (slot && daySlot && day && daySlot !== filledFrom) {
		setFilledFrom(daySlot);
		setForm(formFromSlot(slot, day.slots));
	}

	const updateSet = (index: number, changes: Partial<SetForm>) =>
		setForm((prev) =>
			prev
				? {
						...prev,
						sets: prev.sets.map((s, i) =>
							i === index ? { ...s, ...changes } : s,
						),
					}
				: prev,
		);

	const addSet = () =>
		setForm((prev) =>
			prev
				? {
						...prev,
						sets: [
							...prev.sets,
							{
								...(prev.sets[prev.sets.length - 1] ?? {
									repMin: "8",
									repMax: "12",
									loadValue: "",
									restSeconds: "",
								}),
								loadRule: "same",
								label: null,
							},
						],
					}
				: prev,
		);

	const removeSet = (index: number) =>
		setForm((prev) =>
			prev && prev.sets.length > 1
				? { ...prev, sets: prev.sets.filter((_, i) => i !== index) }
				: prev,
		);

	const handleSave = () => {
		if (!form || !slot || saveSlot.isPending) return;
		const restSeconds = parseOptional(form.restSeconds);
		if (
			restSeconds !== null &&
			(!Number.isInteger(restSeconds) || restSeconds < 0)
		) {
			Alert.alert("Repos", "Le repos est un nombre entier de secondes.");
			return;
		}
		const sets = form.sets.map((s, i) => ({
			repMin: parseOptional(s.repMin),
			repMax: parseOptional(s.repMax),
			loadRule: i === 0 ? ("none" as const) : s.loadRule,
			loadValue:
				i === 0 || s.loadRule === "same" ? null : parseOptional(s.loadValue),
			restSeconds: parseOptional(s.restSeconds),
			label: s.label,
		}));
		const invalid = sets.findIndex(
			(s) =>
				[s.repMin, s.repMax, s.restSeconds].some(
					(n) => n !== null && (!Number.isInteger(n) || n < 0),
				) ||
				(s.loadValue !== null && Number.isNaN(s.loadValue)) ||
				(s.repMin !== null && s.repMax !== null && s.repMax < s.repMin),
		);
		if (invalid !== -1) {
			Alert.alert(
				`Série ${invalid + 1}`,
				"Les reps et le repos sont des entiers, et le maximum ne peut pas être sous le minimum.",
			);
			return;
		}
		const finisherNumbers = [
			form.finisherCount,
			form.finisherLoadStep,
			form.finisherRestSeconds,
		].map(parseOptional);
		if (
			form.finisherKind &&
			finisherNumbers.some((n) => n !== null && (Number.isNaN(n) || n < 0))
		) {
			Alert.alert("Finisher", "Les nombres du finisher doivent être positifs.");
			return;
		}
		if (form.finisherKind === "switch" && !form.finisherMovementId) {
			Alert.alert("Switch", "Choisis l’exercice sur lequel enchaîner.");
			return;
		}
		saveSlot.mutate(
			{
				slotId: slot.id,
				settings: {
					progressionRule: form.progressionRule,
					restSeconds,
					// Unknown settings (offline, nothing cached): keep the choice rather than reset it
					restPerSide: settingsQuery.isSuccess
						? slot.movement.unilateral && form.restPerSide
						: form.restPerSide,
					tempo: form.tempo,
					note: form.note,
					supersetWith: form.supersetWith,
					isKeyLift: form.isKeyLift,
					finisher: form.finisherKind
						? {
								kind: form.finisherKind,
								count: parseOptional(form.finisherCount),
								loadStep: parseOptional(form.finisherLoadStep),
								restSeconds: parseOptional(form.finisherRestSeconds),
								movementId: form.finisherMovementId,
							}
						: null,
				},
				sets,
			},
			{
				onSuccess: () => router.back(),
				onError: (error) =>
					Alert.alert(
						"Erreur",
						errorMessage(error, "Impossible d’enregistrer l’exercice."),
					),
			},
		);
	};

	if (programQuery.isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!slot || !form) {
		return (
			<View className="flex-1 items-center justify-center bg-background p-6">
				<Text className="text-center text-muted">
					Exercice introuvable dans ton programme.
				</Text>
			</View>
		);
	}

	const rule = PROGRESSION_RULES.find((r) => r.value === form.progressionRule);
	// A timed movement's range is in seconds
	const isTimed = slot.movement.measure === "duration";
	const finisher = FINISHERS.find((f) => f.value === form.finisherKind);
	const switchMovement =
		(movementsQuery.data ?? []).find((m) => m.id === form.finisherMovementId) ??
		null;

	return (
		<KeyboardAvoidingView
			className="flex-1 bg-background"
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={100}
		>
			<ScrollView
				className="flex-1"
				contentContainerClassName="p-4 gap-6 pb-32"
				keyboardShouldPersistTaps="handled"
			>
				<View>
					<Text className="text-2xl font-bold">{slot.movement.name}</Text>
					<Text className="text-sm text-muted">{day?.name}</Text>
				</View>

				<View className="gap-3">
					<Text className="text-lg font-semibold">Séries</Text>
					{form.sets.map((set, index) => {
						const loadRule = LOAD_RULES.find((r) => r.value === set.loadRule);
						return (
							<View
								key={index}
								className="rounded-xl border border-border bg-surface p-3 gap-3"
							>
								<View className="flex-row items-center justify-between">
									<Text className="font-medium">Série {index + 1}</Text>
									{form.sets.length > 1 && (
										<Pressable
											onPress={() => removeSet(index)}
											accessibilityRole="button"
											accessibilityLabel={`Supprimer la série ${index + 1}`}
											className="p-2 rounded-lg bg-default"
										>
											<Minus size={16} color={themeColors.destructive} />
										</Pressable>
									)}
								</View>
								<View className="flex-row items-center gap-2">
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">
											{isTimed ? "Sec min" : "Reps min"}
										</Text>
										<Input
											variant="secondary"
											value={set.repMin}
											onChangeText={(repMin) => updateSet(index, { repMin })}
											keyboardType="number-pad"
											placeholder="8"
										/>
									</View>
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">
											{isTimed ? "Sec max" : "Reps max"}
										</Text>
										<Input
											variant="secondary"
											value={set.repMax}
											onChangeText={(repMax) => updateSet(index, { repMax })}
											keyboardType="number-pad"
											placeholder="12"
										/>
									</View>
									<View className="flex-1">
										<Text className="text-xs text-muted mb-1">Repos (s)</Text>
										<Input
											variant="secondary"
											value={set.restSeconds}
											onChangeText={(restSeconds) =>
												updateSet(index, { restSeconds })
											}
											keyboardType="number-pad"
											placeholder={form.restSeconds || "90"}
										/>
									</View>
								</View>
								{index === 0 ? (
									<Text className="text-xs text-muted">
										Première série : la charge vient de ta dernière performance.
									</Text>
								) : (
									<View className="gap-2">
										<Text className="text-xs text-muted">
											Charge par rapport à la série précédente
										</Text>
										<View className="flex-row flex-wrap gap-2">
											{LOAD_RULES.map((option) => (
												<Chip
													key={option.value}
													label={option.label}
													isSelected={set.loadRule === option.value}
													onPress={() =>
														updateSet(index, { loadRule: option.value })
													}
												/>
											))}
										</View>
										{loadRule?.unit && (
											<View className="flex-row items-center gap-2">
												<View className="w-28">
													<Input
														variant="secondary"
														value={set.loadValue}
														onChangeText={(loadValue) =>
															updateSet(index, { loadValue })
														}
														keyboardType="numbers-and-punctuation"
														placeholder={
															set.loadRule === "percent" ? "-10" : "2.5"
														}
													/>
												</View>
												<Text className="text-muted">
													{loadRule.unit} (négatif = plus léger)
												</Text>
											</View>
										)}
									</View>
								)}
							</View>
						);
					})}
					<Button variant="secondary" onPress={addSet}>
						<Plus size={16} color={themeColors.foreground} />
						<Button.Label>Ajouter une série</Button.Label>
					</Button>
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Progression</Text>
					<View className="flex-row flex-wrap gap-2">
						{PROGRESSION_RULES.map((option) => (
							<Chip
								key={option.value}
								label={option.label}
								isSelected={form.progressionRule === option.value}
								onPress={() =>
									setForm({ ...form, progressionRule: option.value })
								}
							/>
						))}
					</View>
					{rule && <Text className="text-sm text-muted">{rule.help}</Text>}
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Repos</Text>
					<View className="flex-row items-center gap-2">
						<View className="w-28">
							<Input
								value={form.restSeconds}
								onChangeText={(restSeconds) =>
									setForm({ ...form, restSeconds })
								}
								keyboardType="number-pad"
								placeholder="90"
							/>
						</View>
						<Text className="text-muted">secondes après chaque série</Text>
					</View>
					{slot.movement.unilateral && (
						<View className="flex-row items-center justify-between">
							<Text className="text-sm">Repos après chaque côté</Text>
							<Host matchContents>
								<Switch
									value={form.restPerSide}
									onValueChange={(restPerSide: boolean) =>
										setForm({ ...form, restPerSide })
									}
								/>
							</Host>
						</View>
					)}
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Superset</Text>
					<Text className="text-sm text-muted">
						Enchaîne cet exercice en alternance avec un autre du jour.
					</Text>
					<View className="flex-row flex-wrap gap-2">
						<Chip
							label="Aucun"
							isSelected={form.supersetWith === null}
							onPress={() => setForm({ ...form, supersetWith: null })}
						/>
						{otherSlots.map((other) => (
							<Chip
								key={other.id}
								label={other.movement.name}
								isSelected={form.supersetWith === other.id}
								onPress={() => setForm({ ...form, supersetWith: other.id })}
							/>
						))}
					</View>
				</View>

				<View className="flex-row items-center justify-between gap-4">
					<View className="flex-1">
						<Text className="text-lg font-semibold">Exercice clé</Text>
						<Text className="text-sm text-muted">
							La priorité du jour : la séance guidée propose un échauffement
							jusqu’à la première charge.
						</Text>
					</View>
					<Host matchContents>
						<Switch
							value={form.isKeyLift}
							onValueChange={(isKeyLift: boolean) =>
								setForm({ ...form, isKeyLift })
							}
						/>
					</Host>
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Finisher</Text>
					<View className="flex-row flex-wrap gap-2">
						{FINISHERS.map((option) => (
							<Chip
								key={option.value ?? "none"}
								label={option.label}
								isSelected={form.finisherKind === option.value}
								onPress={() => setForm({ ...form, finisherKind: option.value })}
							/>
						))}
					</View>
					{finisher?.help ? (
						<Text className="text-sm text-muted">{finisher.help}</Text>
					) : null}
					{(form.finisherKind === "drop_sets" ||
						form.finisherKind === "mini_sets") && (
						<View className="flex-row gap-2">
							<View className="flex-1">
								<Text className="text-xs text-muted mb-1">
									{form.finisherKind === "drop_sets" ? "Drops" : "Mini-séries"}
								</Text>
								<Input
									variant="secondary"
									value={form.finisherCount}
									onChangeText={(finisherCount) =>
										setForm({ ...form, finisherCount })
									}
									keyboardType="number-pad"
									placeholder={form.finisherKind === "drop_sets" ? "2" : "3"}
								/>
							</View>
							{form.finisherKind === "drop_sets" ? (
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">
										kg en moins (vide : −20 %)
									</Text>
									<Input
										variant="secondary"
										value={form.finisherLoadStep}
										onChangeText={(finisherLoadStep) =>
											setForm({ ...form, finisherLoadStep })
										}
										keyboardType="decimal-pad"
										placeholder="4"
									/>
								</View>
							) : (
								<View className="flex-1">
									<Text className="text-xs text-muted mb-1">Pause (s)</Text>
									<Input
										variant="secondary"
										value={form.finisherRestSeconds}
										onChangeText={(finisherRestSeconds) =>
											setForm({ ...form, finisherRestSeconds })
										}
										keyboardType="number-pad"
										placeholder="10"
									/>
								</View>
							)}
						</View>
					)}
					{form.finisherKind === "switch" && (
						<View className="gap-2">
							<Text className="text-sm">
								Enchaîner sur :{" "}
								<Text className="font-medium">
									{switchMovement?.name ?? "à choisir"}
								</Text>
							</Text>
							<View>
								<MovementPicker
									movements={movementsQuery.data ?? []}
									selectedId={form.finisherMovementId}
									onPick={(m) => setForm({ ...form, finisherMovementId: m.id })}
								/>
							</View>
						</View>
					)}
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Tempo</Text>
					<Input
						value={form.tempo}
						onChangeText={(tempo) => setForm({ ...form, tempo })}
						placeholder="3010"
					/>
				</View>

				<View className="gap-2">
					<Text className="text-lg font-semibold">Note</Text>
					<TextArea
						value={form.note}
						onChangeText={(note) => setForm({ ...form, note })}
						placeholder="Réglages, consignes d’exécution…"
					/>
				</View>
			</ScrollView>

			<View className="absolute bottom-8 left-4 right-4">
				<Button onPress={handleSave} isDisabled={saveSlot.isPending}>
					{saveSlot.isPending ? (
						<ActivityIndicator
							size="small"
							color={themeColors.accentForeground}
						/>
					) : (
						<>
							<Check
								size={18}
								color={themeColors.accentForeground}
								strokeWidth={2}
							/>
							<Button.Label>Enregistrer</Button.Label>
						</>
					)}
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}
