// Generated from Supabase (Hero-App project). Do not edit by hand.
// Regenerate after every migration in supabase/migrations.

export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	public: {
		Tables: {
			default_exercise_types: {
				Row: {
					key: string;
					name: string;
					sort_order: number;
					trophy_locked: boolean;
				};
				ComputedFields: never;
				Insert: {
					key: string;
					name: string;
					sort_order: number;
					trophy_locked?: boolean;
				};
				Update: {
					key?: string;
					name?: string;
					sort_order?: number;
					trophy_locked?: boolean;
				};
				Relationships: [];
			};
			feedbacks: {
				Row: {
					created_at: string;
					id: string;
					message: string | null;
					owner_id: string;
					subject: string;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					id?: string;
					message?: string | null;
					owner_id: string;
					subject: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					message?: string | null;
					owner_id?: string;
					subject?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "feedbacks_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
				];
			};
			logged_exercises: {
				Row: {
					comment: string | null;
					created_at: string;
					id: string;
					movement_id: string;
					owner_id: string;
					session_id: string | null;
					slot_id: string | null;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					comment?: string | null;
					created_at?: string;
					id?: string;
					movement_id: string;
					owner_id: string;
					session_id?: string | null;
					slot_id?: string | null;
					updated_at?: string;
				};
				Update: {
					comment?: string | null;
					created_at?: string;
					id?: string;
					movement_id?: string;
					owner_id?: string;
					session_id?: string | null;
					slot_id?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "logged_exercises_movement_id_fkey";
						columns: ["movement_id"];
						isOneToOne: false;
						referencedRelation: "movements";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "logged_exercises_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "logged_exercises_session_id_fkey";
						columns: ["session_id"];
						isOneToOne: false;
						referencedRelation: "sessions";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "logged_exercises_slot_id_fkey";
						columns: ["slot_id"];
						isOneToOne: false;
						referencedRelation: "slots";
						referencedColumns: ["id"];
					},
				];
			};
			logged_sets: {
				Row: {
					completed_at: string | null;
					created_at: string;
					id: string;
					kind: Database["public"]["Enums"]["set_kind"];
					logged_exercise_id: string;
					reps: number;
					set_order: number;
					side: Database["public"]["Enums"]["body_side"] | null;
					target_reason: string | null;
					target_rep_max: number | null;
					target_rep_min: number | null;
					target_weight: number | null;
					updated_at: string;
					weight: number;
				};
				ComputedFields: never;
				Insert: {
					completed_at?: string | null;
					created_at?: string;
					id?: string;
					kind?: Database["public"]["Enums"]["set_kind"];
					logged_exercise_id: string;
					reps: number;
					set_order: number;
					side?: Database["public"]["Enums"]["body_side"] | null;
					target_reason?: string | null;
					target_rep_max?: number | null;
					target_rep_min?: number | null;
					target_weight?: number | null;
					updated_at?: string;
					weight: number;
				};
				Update: {
					completed_at?: string | null;
					created_at?: string;
					id?: string;
					kind?: Database["public"]["Enums"]["set_kind"];
					logged_exercise_id?: string;
					reps?: number;
					set_order?: number;
					side?: Database["public"]["Enums"]["body_side"] | null;
					target_reason?: string | null;
					target_rep_max?: number | null;
					target_rep_min?: number | null;
					target_weight?: number | null;
					updated_at?: string;
					weight?: number;
				};
				Relationships: [
					{
						foreignKeyName: "logged_sets_logged_exercise_id_fkey";
						columns: ["logged_exercise_id"];
						isOneToOne: false;
						referencedRelation: "logged_exercises";
						referencedColumns: ["id"];
					},
				];
			};
			movements: {
				Row: {
					created_at: string;
					definition_key: string | null;
					equipment: string | null;
					id: string;
					image_paths: string[];
					increment_kg: number | null;
					library_key: string | null;
					load_type: Database["public"]["Enums"]["load_type"];
					name: string;
					notes: string | null;
					owner_id: string | null;
					primary_muscles: string[];
					secondary_muscles: string[];
					unilateral: boolean;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					definition_key?: string | null;
					equipment?: string | null;
					id?: string;
					image_paths?: string[];
					increment_kg?: number | null;
					library_key?: string | null;
					load_type?: Database["public"]["Enums"]["load_type"];
					name: string;
					notes?: string | null;
					owner_id?: string | null;
					primary_muscles?: string[];
					secondary_muscles?: string[];
					unilateral?: boolean;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					definition_key?: string | null;
					equipment?: string | null;
					id?: string;
					image_paths?: string[];
					increment_kg?: number | null;
					library_key?: string | null;
					load_type?: Database["public"]["Enums"]["load_type"];
					name?: string;
					notes?: string | null;
					owner_id?: string | null;
					primary_muscles?: string[];
					secondary_muscles?: string[];
					unilateral?: boolean;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "movements_definition_key_fkey";
						columns: ["definition_key"];
						isOneToOne: false;
						referencedRelation: "default_exercise_types";
						referencedColumns: ["key"];
					},
					{
						foreignKeyName: "movements_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
				];
			};
			profiles: {
				Row: {
					active_program_id: string | null;
					created_at: string;
					email: string | null;
					first_name: string | null;
					has_seen_onboarding: boolean;
					id: string;
					last_name: string | null;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					active_program_id?: string | null;
					created_at?: string;
					email?: string | null;
					first_name?: string | null;
					has_seen_onboarding?: boolean;
					id: string;
					last_name?: string | null;
					updated_at?: string;
				};
				Update: {
					active_program_id?: string | null;
					created_at?: string;
					email?: string | null;
					first_name?: string | null;
					has_seen_onboarding?: boolean;
					id?: string;
					last_name?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "profiles_active_program_id_fkey";
						columns: ["active_program_id"];
						isOneToOne: false;
						referencedRelation: "programs";
						referencedColumns: ["id"];
					},
				];
			};
			program_days: {
				Row: {
					created_at: string;
					id: string;
					legacy_session_type:
						| Database["public"]["Enums"]["session_type"]
						| null;
					name: string;
					position: number;
					program_id: string;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					id?: string;
					legacy_session_type?:
						| Database["public"]["Enums"]["session_type"]
						| null;
					name: string;
					position: number;
					program_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					legacy_session_type?:
						| Database["public"]["Enums"]["session_type"]
						| null;
					name?: string;
					position?: number;
					program_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "program_days_program_id_fkey";
						columns: ["program_id"];
						isOneToOne: false;
						referencedRelation: "programs";
						referencedColumns: ["id"];
					},
				];
			};
			programs: {
				Row: {
					created_at: string;
					id: string;
					legacy_key: string | null;
					name: string;
					owner_id: string;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					id?: string;
					legacy_key?: string | null;
					name: string;
					owner_id: string;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					id?: string;
					legacy_key?: string | null;
					name?: string;
					owner_id?: string;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "programs_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
				];
			};
			sessions: {
				Row: {
					body_weight: number;
					comment: string | null;
					created_at: string;
					date_session: string;
					ended_at: string | null;
					id: string;
					is_done: boolean;
					label: string | null;
					owner_id: string;
					program_day_id: string | null;
					started_at: string | null;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					body_weight: number;
					comment?: string | null;
					created_at?: string;
					date_session: string;
					ended_at?: string | null;
					id?: string;
					is_done?: boolean;
					label?: string | null;
					owner_id: string;
					program_day_id?: string | null;
					started_at?: string | null;
					updated_at?: string;
				};
				Update: {
					body_weight?: number;
					comment?: string | null;
					created_at?: string;
					date_session?: string;
					ended_at?: string | null;
					id?: string;
					is_done?: boolean;
					label?: string | null;
					owner_id?: string;
					program_day_id?: string | null;
					started_at?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "sessions_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "sessions_program_day_id_fkey";
						columns: ["program_day_id"];
						isOneToOne: false;
						referencedRelation: "program_days";
						referencedColumns: ["id"];
					},
				];
			};
			set_prescriptions: {
				Row: {
					id: string;
					label: string | null;
					load_rule: Database["public"]["Enums"]["load_rule"];
					load_value: number | null;
					position: number;
					rep_max: number | null;
					rep_min: number | null;
					rest_seconds: number | null;
					slot_id: string;
				};
				ComputedFields: never;
				Insert: {
					id?: string;
					label?: string | null;
					load_rule?: Database["public"]["Enums"]["load_rule"];
					load_value?: number | null;
					position: number;
					rep_max?: number | null;
					rep_min?: number | null;
					rest_seconds?: number | null;
					slot_id: string;
				};
				Update: {
					id?: string;
					label?: string | null;
					load_rule?: Database["public"]["Enums"]["load_rule"];
					load_value?: number | null;
					position?: number;
					rep_max?: number | null;
					rep_min?: number | null;
					rest_seconds?: number | null;
					slot_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "set_prescriptions_slot_id_fkey";
						columns: ["slot_id"];
						isOneToOne: false;
						referencedRelation: "slots";
						referencedColumns: ["id"];
					},
				];
			};
			slot_alternatives: {
				Row: {
					movement_id: string;
					position: number;
					reason: Database["public"]["Enums"]["alternative_reason"] | null;
					slot_id: string;
				};
				ComputedFields: never;
				Insert: {
					movement_id: string;
					position: number;
					reason?: Database["public"]["Enums"]["alternative_reason"] | null;
					slot_id: string;
				};
				Update: {
					movement_id?: string;
					position?: number;
					reason?: Database["public"]["Enums"]["alternative_reason"] | null;
					slot_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "slot_alternatives_movement_id_fkey";
						columns: ["movement_id"];
						isOneToOne: false;
						referencedRelation: "movements";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "slot_alternatives_slot_id_fkey";
						columns: ["slot_id"];
						isOneToOne: false;
						referencedRelation: "slots";
						referencedColumns: ["id"];
					},
				];
			};
			slots: {
				Row: {
					created_at: string;
					finisher_count: number | null;
					finisher_kind: Database["public"]["Enums"]["finisher_kind"] | null;
					finisher_load_step: number | null;
					finisher_movement_id: string | null;
					finisher_rest_seconds: number | null;
					id: string;
					is_key_lift: boolean;
					movement_id: string;
					note: string | null;
					position: number;
					program_day_id: string;
					progression_rule: Database["public"]["Enums"]["progression_rule"];
					rest_per_side: boolean;
					rest_seconds: number | null;
					superset_group: number | null;
					tempo: string | null;
					updated_at: string;
				};
				ComputedFields: never;
				Insert: {
					created_at?: string;
					finisher_count?: number | null;
					finisher_kind?: Database["public"]["Enums"]["finisher_kind"] | null;
					finisher_load_step?: number | null;
					finisher_movement_id?: string | null;
					finisher_rest_seconds?: number | null;
					id?: string;
					is_key_lift?: boolean;
					movement_id: string;
					note?: string | null;
					position: number;
					program_day_id: string;
					progression_rule?: Database["public"]["Enums"]["progression_rule"];
					rest_per_side?: boolean;
					rest_seconds?: number | null;
					superset_group?: number | null;
					tempo?: string | null;
					updated_at?: string;
				};
				Update: {
					created_at?: string;
					finisher_count?: number | null;
					finisher_kind?: Database["public"]["Enums"]["finisher_kind"] | null;
					finisher_load_step?: number | null;
					finisher_movement_id?: string | null;
					finisher_rest_seconds?: number | null;
					id?: string;
					is_key_lift?: boolean;
					movement_id?: string;
					note?: string | null;
					position?: number;
					program_day_id?: string;
					progression_rule?: Database["public"]["Enums"]["progression_rule"];
					rest_per_side?: boolean;
					rest_seconds?: number | null;
					superset_group?: number | null;
					tempo?: string | null;
					updated_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: "slots_finisher_movement_id_fkey";
						columns: ["finisher_movement_id"];
						isOneToOne: false;
						referencedRelation: "movements";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "slots_movement_id_fkey";
						columns: ["movement_id"];
						isOneToOne: false;
						referencedRelation: "movements";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "slots_program_day_id_fkey";
						columns: ["program_day_id"];
						isOneToOne: false;
						referencedRelation: "program_days";
						referencedColumns: ["id"];
					},
				];
			};
			trophies: {
				Row: {
					achieved: boolean;
					awarded_at: string | null;
					body_weight: number | null;
					created_at: string;
					description: string;
					id: string;
					level: number;
					logged_exercise_id: string | null;
					movement_id: string;
					name: string;
					owner_id: string;
					reps_goal: number | null;
					reps_user: number;
					reward_text: string | null;
					trophy_type: Database["public"]["Enums"]["trophy_type"];
					updated_at: string;
					weight_multiplier: number | null;
					weight_user: number;
				};
				ComputedFields: never;
				Insert: {
					achieved?: boolean;
					awarded_at?: string | null;
					body_weight?: number | null;
					created_at?: string;
					description: string;
					id?: string;
					level: number;
					logged_exercise_id?: string | null;
					movement_id: string;
					name: string;
					owner_id: string;
					reps_goal?: number | null;
					reps_user?: number;
					reward_text?: string | null;
					trophy_type: Database["public"]["Enums"]["trophy_type"];
					updated_at?: string;
					weight_multiplier?: number | null;
					weight_user?: number;
				};
				Update: {
					achieved?: boolean;
					awarded_at?: string | null;
					body_weight?: number | null;
					created_at?: string;
					description?: string;
					id?: string;
					level?: number;
					logged_exercise_id?: string | null;
					movement_id?: string;
					name?: string;
					owner_id?: string;
					reps_goal?: number | null;
					reps_user?: number;
					reward_text?: string | null;
					trophy_type?: Database["public"]["Enums"]["trophy_type"];
					updated_at?: string;
					weight_multiplier?: number | null;
					weight_user?: number;
				};
				Relationships: [
					{
						foreignKeyName: "trophies_logged_exercise_id_fkey";
						columns: ["logged_exercise_id"];
						isOneToOne: false;
						referencedRelation: "logged_exercises";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "trophies_movement_id_fkey";
						columns: ["movement_id"];
						isOneToOne: false;
						referencedRelation: "movements";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "trophies_owner_id_fkey";
						columns: ["owner_id"];
						isOneToOne: false;
						referencedRelation: "profiles";
						referencedColumns: ["id"];
					},
				];
			};
			trophy_definitions: {
				Row: {
					description: string;
					exercise_key: string;
					level: number;
					reps_goal: number;
					reward_text: string | null;
					trophy_type: Database["public"]["Enums"]["trophy_type"];
					weight_multiplier: number;
				};
				ComputedFields: never;
				Insert: {
					description: string;
					exercise_key: string;
					level: number;
					reps_goal: number;
					reward_text?: string | null;
					trophy_type: Database["public"]["Enums"]["trophy_type"];
					weight_multiplier: number;
				};
				Update: {
					description?: string;
					exercise_key?: string;
					level?: number;
					reps_goal?: number;
					reward_text?: string | null;
					trophy_type?: Database["public"]["Enums"]["trophy_type"];
					weight_multiplier?: number;
				};
				Relationships: [
					{
						foreignKeyName: "trophy_definitions_exercise_key_fkey";
						columns: ["exercise_key"];
						isOneToOne: false;
						referencedRelation: "default_exercise_types";
						referencedColumns: ["key"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			ensure_profile: {
				Args: Record<PropertyKey, never>;
				Returns: {
					active_program_id: string | null;
					created_at: string;
					email: string | null;
					first_name: string | null;
					has_seen_onboarding: boolean;
					id: string;
					last_name: string | null;
					updated_at: string;
				};
				SetofOptions: {
					from: "*";
					to: "profiles";
					isOneToOne: true;
					isSetofReturn: false;
				};
			};
			save_exercise: {
				Args: {
					p_comment?: string;
					p_id?: string;
					p_movement_id: string;
					p_session_id?: string;
					p_sets: Json;
					p_slot_id?: string;
				};
				Returns: Json;
			};
			save_program_day: {
				Args: { p_day_id: string; p_slots: Json };
				Returns: string;
			};
			save_slot: {
				Args: { p_sets: Json; p_slot: Json; p_slot_id: string };
				Returns: string;
			};
		};
		Enums: {
			alternative_reason:
				| "preference"
				| "equipment"
				| "pain"
				| "stagnation"
				| "connection";
			body_side: "left" | "right";
			finisher_kind: "drop_sets" | "cheat_reps" | "switch" | "mini_sets";
			load_rule: "none" | "same" | "percent" | "step";
			load_type: "external" | "bodyweight_plus" | "assisted";
			progression_rule: "per_set" | "all_sets" | "manual";
			session_type:
				| "Upper A"
				| "Lower"
				| "Upper B"
				| "Other"
				| "Séance A"
				| "Séance B";
			set_kind: "warmup" | "working" | "drop" | "cheat" | "switch" | "mini";
			trophy_type:
				| "silver"
				| "gold"
				| "platinum"
				| "diamond"
				| "master"
				| "grand master"
				| "challenger";
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {
			alternative_reason: [
				"preference",
				"equipment",
				"pain",
				"stagnation",
				"connection",
			],
			body_side: ["left", "right"],
			finisher_kind: ["drop_sets", "cheat_reps", "switch", "mini_sets"],
			load_rule: ["none", "same", "percent", "step"],
			load_type: ["external", "bodyweight_plus", "assisted"],
			progression_rule: ["per_set", "all_sets", "manual"],
			session_type: [
				"Upper A",
				"Lower",
				"Upper B",
				"Other",
				"Séance A",
				"Séance B",
			],
			set_kind: ["warmup", "working", "drop", "cheat", "switch", "mini"],
			trophy_type: [
				"silver",
				"gold",
				"platinum",
				"diamond",
				"master",
				"grand master",
				"challenger",
			],
		},
	},
} as const;
