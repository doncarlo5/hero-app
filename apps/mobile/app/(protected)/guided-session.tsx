import { useKeepAwake } from "expo-keep-awake";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Input } from "heroui-native";
import {
	ArrowUpIcon,
	CheckIcon,
	CloudOffIcon,
	SkipForwardIcon,
} from "lucide-react-native";
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

import { MovementThumbnail } from "@/components/movement-thumbnail";
import { RestPanel } from "@/components/rest-panel";
import { Text } from "@/components/ui/text";
import type { SetTarget } from "@/lib/progression/engine";
import { restPhase } from "@/lib/session/rest";
import type { QueueStep } from "@/lib/session/set-queue";
import { useGuidedSession } from "@/lib/session/use-guided-session";
import { useThemeColors } from "@/lib/theme";
import { cn } from "@/lib/utils";

// "12,5" and "12.5" are both accepted; empty or invalid input is null
function parseNumber(value: string): number | null {
	if (value.trim() === "") return null;
	const parsed = parseFloat(value.replace(",", "."));
	return Number.isNaN(parsed) ? null : parsed;
}

function targetLabel(target: SetTarget | null) {
	if (!target) return null;
	const reps =
		target.repMin === null || target.repMax === null
			? null
			: target.repMin === target.repMax
				? `${target.repMin}`
				: `${target.repMin}-${target.repMax}`;
	if (target.weight === null) return reps ? `${reps} reps` : null;
	return reps ? `${target.weight} kg × ${reps}` : `${target.weight} kg`;
}

function sideLabel(side: QueueStep["side"]) {
	if (side === "left") return "côté gauche";
	if (side === "right") return "côté droit";
	return null;
}

// Guided session: the day's sets one after the other (supersets alternate), the rest after each set,
// and a draft on the device so a killed app picks up where it was (ADR-0002)
export default function GuidedSession() {
	useKeepAwake();
	const params = useLocalSearchParams<{ sessionId: string }>();
	const router = useRouter();
	const themeColors = useThemeColors();
	const guided = useGuidedSession(params.sessionId);

	const [weight, setWeight] = useState("");
	const [reps, setReps] = useState("");
	const [filledFor, setFilledFor] = useState<string | null>(null);
	const [isFinishing, setIsFinishing] = useState(false);

	const draft = guided.draft;
	const index = draft?.stepIndex ?? 0;
	const step = guided.queue[index] ?? null;
	const target = step ? guided.targetOf(step) : null;

	// Fill the inputs once per step: what was logged, else the target load, else (calibration) the
	// load of the slot's previous set in this session. Not before the target is known.
	if (
		!guided.isLoading &&
		step &&
		draft &&
		filledFor !== step.key &&
		(target || !guided.targetsPending || draft.sets[step.key])
	) {
		const logged = draft.sets[step.key];
		const previous = guided.queue
			.slice(0, index)
			.reverse()
			.find((s) => s.slotId === step.slotId && draft.sets[s.key]);
		const fallback = previous ? draft.sets[previous.key].weight : null;
		setFilledFor(step.key);
		setWeight(
			logged
				? String(logged.weight)
				: ((target?.weight ?? fallback)?.toString() ?? ""),
		);
		setReps(logged ? String(logged.reps) : "");
	}

	const stepLabel = (s: QueueStep) => {
		const movement = guided.movementOf(s);
		const side = sideLabel(s.side);
		return `${movement?.name ?? "?"}, série ${s.setIndex + 1}${side ? ` (${side})` : ""}`;
	};

	const handleDone = () => {
		if (!step) return;
		const w = parseNumber(weight);
		const r = parseNumber(reps);
		if (w === null || w < 0 || r === null || r < 0 || !Number.isInteger(r)) {
			Alert.alert("Série", "Indique la charge et un nombre entier de reps.");
			return;
		}
		guided.complete(index, { weight: w, reps: r });
	};

	const handleFinish = () => {
		const run = async () => {
			setIsFinishing(true);
			try {
				const closed = await guided.finish();
				if (!closed) {
					Alert.alert(
						"Pas encore envoyé",
						"Des séries n'ont pas pu être envoyées. Elles restent sur le téléphone : réessaie quand tu as du réseau.",
					);
					return;
				}
				const goToSession = () =>
					router.replace({
						pathname: "/(protected)/session/[id]",
						params: { id: params.sessionId, fromExercise: "true" },
					});
				if (guided.newTrophies.length > 0) {
					Alert.alert(
						"Nouveaux trophées 🏆",
						guided.newTrophies
							.map((t) => `${t.trophy_type} (${t.description})`)
							.join("\n"),
						[{ text: "OK", onPress: goToSession }],
					);
				} else {
					goToSession();
				}
			} catch (error) {
				Alert.alert(
					"Erreur",
					error instanceof Error ? error.message : "Impossible de terminer.",
				);
			} finally {
				setIsFinishing(false);
			}
		};
		if (guided.isFinished) {
			run();
			return;
		}
		Alert.alert(
			"Terminer la séance ?",
			"Les séries restantes ne seront pas enregistrées.",
			[
				{ text: "Continuer", style: "cancel" },
				{ text: "Terminer", style: "destructive", onPress: run },
			],
		);
	};

	if (guided.isUnavailable) {
		return (
			<View className="flex-1 items-center justify-center gap-4 bg-background p-6">
				<CloudOffIcon size={32} color={themeColors.mutedForeground} />
				<Text className="text-center text-lg font-semibold">
					Séance indisponible hors connexion
				</Text>
				<Text className="text-center text-muted">
					Cette séance n’a pas encore été chargée sur le téléphone. Retrouve du
					réseau pour l’ouvrir : les séries déjà faites restent enregistrées
					ici.
				</Text>
				<Button variant="secondary" onPress={guided.reload}>
					<Button.Label>Réessayer</Button.Label>
				</Button>
			</View>
		);
	}

	if (guided.isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-background">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!guided.day || guided.queue.length === 0) {
		return (
			<View className="flex-1 items-center justify-center bg-background p-6">
				<Text className="text-center text-muted">
					Cette séance n’est liée à aucun jour du programme, ou ce jour n’a pas
					d’exercice. La séance guidée suit les exercices d’un jour.
				</Text>
			</View>
		);
	}

	const movement = step ? guided.movementOf(step) : null;
	const slot = step ? guided.slotOf(step) : null;
	const setCount = step
		? guided.queue.filter((s) => s.slotId === step.slotId && s.side !== "right")
				.length
		: 0;
	const supersetMembers = slot?.superset_group
		? guided.day.slots.filter((s) => s.superset_group === slot.superset_group)
		: [];
	const rest = draft?.rest ?? null;
	const showRest = rest && restPhase(rest, guided.now) !== "done";
	const doneCount = guided.queue.filter(
		(s) => draft?.sets[s.key] || draft?.skipped.includes(s.key),
	).length;

	return (
		<KeyboardAvoidingView
			className="flex-1 bg-background"
			behavior={Platform.OS === "ios" ? "padding" : undefined}
			keyboardVerticalOffset={100}
		>
			<ScrollView
				className="flex-1"
				contentContainerClassName="p-4 gap-4 pb-32"
				keyboardShouldPersistTaps="handled"
			>
				<View className="flex-row items-center justify-between">
					<Text className="text-lg font-semibold">{guided.day.name}</Text>
					<Text className="text-sm text-muted">
						{doneCount}/{guided.queue.length} séries
					</Text>
				</View>

				{step && movement ? (
					<View className="rounded-2xl border border-border bg-surface p-4 gap-3">
						<View className="flex-row items-center gap-3">
							<MovementThumbnail movement={movement} />
							<View className="flex-1">
								<Text className="text-xl font-bold">{movement.name}</Text>
								<Text className="text-sm text-muted">
									Série {step.setIndex + 1}/{setCount}
									{sideLabel(step.side) ? ` · ${sideLabel(step.side)}` : ""}
									{supersetMembers.length > 1
										? ` · superset avec ${supersetMembers
												.filter((s) => s.id !== step.slotId)
												.map((s) => s.movement.name)
												.join(", ")}`
										: ""}
								</Text>
							</View>
						</View>

						{target?.reason === "calibration" ? (
							<Text className="text-sm text-muted">
								Pas d’historique : commence léger et trouve ta charge.
							</Text>
						) : (
							targetLabel(target) && (
								<View className="flex-row items-center gap-1">
									<Text className="text-base">
										Objectif : {targetLabel(target)}
									</Text>
									{target?.reason === "increase" && (
										<ArrowUpIcon size={16} color={themeColors.brand} />
									)}
								</View>
							)
						)}
						{slot?.tempo && (
							<Text className="text-sm text-muted">Tempo : {slot.tempo}</Text>
						)}
						{slot?.note && (
							<Text className="text-sm text-muted">{slot.note}</Text>
						)}

						<View className="flex-row gap-3">
							<View className="flex-1">
								<Text className="text-sm text-muted mb-1">Charge (kg)</Text>
								<Input
									variant="secondary"
									value={weight}
									onChangeText={setWeight}
									keyboardType="decimal-pad"
									placeholder="0"
									accessibilityLabel="Charge en kilos"
								/>
							</View>
							<View className="flex-1">
								<Text className="text-sm text-muted mb-1">Reps</Text>
								<Input
									variant="secondary"
									value={reps}
									onChangeText={setReps}
									keyboardType="number-pad"
									placeholder={target?.repMax?.toString() ?? "0"}
									accessibilityLabel="Répétitions"
								/>
							</View>
						</View>

						<Button onPress={handleDone}>
							<CheckIcon
								size={18}
								color={themeColors.accentForeground}
								strokeWidth={2}
							/>
							<Button.Label>Série faite</Button.Label>
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onPress={() => guided.skip(index)}
						>
							<SkipForwardIcon size={16} color={themeColors.foreground} />
							<Button.Label>Passer cette série</Button.Label>
						</Button>
					</View>
				) : (
					<View className="rounded-2xl bg-default p-4">
						<Text className="text-lg font-semibold">
							Toutes les séries sont faites
						</Text>
						<Text className="text-sm text-muted">
							Termine la séance pour l’enregistrer.
						</Text>
					</View>
				)}

				{(guided.sendError || guided.isSending) && (
					<Pressable
						onPress={guided.retry}
						disabled={guided.isSending}
						className="flex-row items-center gap-2 rounded-xl bg-default px-3 py-2"
					>
						{guided.isSending ? (
							<ActivityIndicator size="small" />
						) : (
							<CloudOffIcon size={16} color={themeColors.mutedForeground} />
						)}
						<Text className="flex-1 text-sm text-muted">
							{guided.isSending
								? "Envoi…"
								: "Pas envoyé : les séries sont gardées sur le téléphone. Toucher pour réessayer."}
						</Text>
					</Pressable>
				)}

				{showRest && rest && (
					<RestPanel
						timer={rest}
						now={guided.now}
						nextLabel={step ? stepLabel(step) : null}
						onAdjust={guided.changeRest}
						onSkip={guided.stopRest}
					/>
				)}

				<View className="gap-1">
					<Text className="text-sm font-medium text-muted mb-1">
						Programme du jour
					</Text>
					{guided.queue.map((s, i) => {
						const logged = draft?.sets[s.key];
						const skipped = draft?.skipped.includes(s.key);
						return (
							<Pressable
								key={s.key}
								onPress={() => guided.goTo(i)}
								accessibilityRole="button"
								className={cn(
									"flex-row items-center justify-between rounded-lg px-3 py-2",
									i === index ? "bg-default" : "",
								)}
							>
								<Text
									className={cn(
										"text-sm flex-1",
										(logged || skipped) && "text-muted",
										i === index && "font-semibold",
									)}
								>
									{stepLabel(s)}
								</Text>
								<Text className="text-sm text-muted">
									{logged
										? `${logged.weight} × ${logged.reps}`
										: skipped
											? "passée"
											: ""}
								</Text>
							</Pressable>
						);
					})}
				</View>
			</ScrollView>

			<View className="absolute bottom-8 left-4 right-4">
				<Button
					variant={guided.isFinished ? "primary" : "secondary"}
					onPress={handleFinish}
					isDisabled={isFinishing}
				>
					{isFinishing ? (
						<ActivityIndicator size="small" />
					) : (
						<Button.Label>Terminer la séance</Button.Label>
					)}
				</Button>
			</View>
		</KeyboardAvoidingView>
	);
}
