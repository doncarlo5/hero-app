// Generated from Supabase (Hero-App project). Do not edit by hand.
// Regenerate after every migration in supabase/migrations.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3"
  }
  public: {
    Tables: {
      default_exercise_types: {
        Row: {
          advice: string | null
          key: string
          name: string
          rep_range_1: string
          rep_range_2: string
          rep_range_3: string
          rep_range_4: string | null
          session_types: Database["public"]["Enums"]["session_type"][]
          sort_order: number
          timer_seconds: number
          trophy_locked: boolean
        }
        Insert: {
          advice?: string | null
          key: string
          name: string
          rep_range_1: string
          rep_range_2: string
          rep_range_3: string
          rep_range_4?: string | null
          session_types?: Database["public"]["Enums"]["session_type"][]
          sort_order: number
          timer_seconds: number
          trophy_locked?: boolean
        }
        Update: {
          advice?: string | null
          key?: string
          name?: string
          rep_range_1?: string
          rep_range_2?: string
          rep_range_3?: string
          rep_range_4?: string | null
          session_types?: Database["public"]["Enums"]["session_type"][]
          sort_order?: number
          timer_seconds?: number
          trophy_locked?: boolean
        }
        Relationships: []
      }
      default_program_exercises: {
        Row: {
          alternative_keys: string[]
          exercise_key: string
          position: number
          session_type: Database["public"]["Enums"]["session_type"]
        }
        Insert: {
          alternative_keys?: string[]
          exercise_key: string
          position: number
          session_type: Database["public"]["Enums"]["session_type"]
        }
        Update: {
          alternative_keys?: string[]
          exercise_key?: string
          position?: number
          session_type?: Database["public"]["Enums"]["session_type"]
        }
        Relationships: [
          {
            foreignKeyName: "default_program_exercises_exercise_key_fkey"
            columns: ["exercise_key"]
            isOneToOne: false
            referencedRelation: "default_exercise_types"
            referencedColumns: ["key"]
          },
        ]
      }
      exercise_sets: {
        Row: {
          created_at: string
          exercise_user_id: string
          id: string
          reps: number
          set_order: number
          updated_at: string
          weight: number
        }
        Insert: {
          created_at?: string
          exercise_user_id: string
          id?: string
          reps: number
          set_order: number
          updated_at?: string
          weight: number
        }
        Update: {
          created_at?: string
          exercise_user_id?: string
          id?: string
          reps?: number
          set_order?: number
          updated_at?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercise_sets_exercise_user_id_fkey"
            columns: ["exercise_user_id"]
            isOneToOne: false
            referencedRelation: "exercise_users"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_types: {
        Row: {
          advice: string | null
          created_at: string
          definition_key: string | null
          id: string
          name: string
          owner_id: string
          rep_range_1: string
          rep_range_2: string
          rep_range_3: string
          rep_range_4: string | null
          session_types: Database["public"]["Enums"]["session_type"][]
          timer_seconds: number
          trophy_locked: boolean
          updated_at: string
        }
        Insert: {
          advice?: string | null
          created_at?: string
          definition_key?: string | null
          id?: string
          name: string
          owner_id: string
          rep_range_1: string
          rep_range_2: string
          rep_range_3: string
          rep_range_4?: string | null
          session_types?: Database["public"]["Enums"]["session_type"][]
          timer_seconds: number
          trophy_locked?: boolean
          updated_at?: string
        }
        Update: {
          advice?: string | null
          created_at?: string
          definition_key?: string | null
          id?: string
          name?: string
          owner_id?: string
          rep_range_1?: string
          rep_range_2?: string
          rep_range_3?: string
          rep_range_4?: string | null
          session_types?: Database["public"]["Enums"]["session_type"][]
          timer_seconds?: number
          trophy_locked?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_types_definition_key_fkey"
            columns: ["definition_key"]
            isOneToOne: false
            referencedRelation: "default_exercise_types"
            referencedColumns: ["key"]
          },
          {
            foreignKeyName: "exercise_types_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercise_users: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          owner_id: string
          session_id: string | null
          type_id: string
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          owner_id: string
          session_id?: string | null
          type_id: string
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          owner_id?: string
          session_id?: string | null
          type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_users_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_users_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercise_users_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "exercise_types"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          created_at: string
          id: string
          message: string | null
          owner_id: string
          subject: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          owner_id: string
          subject: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          owner_id?: string
          subject?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          has_seen_onboarding: boolean
          id: string
          last_name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          has_seen_onboarding?: boolean
          id: string
          last_name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          has_seen_onboarding?: boolean
          id?: string
          last_name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      program_exercise_alternatives: {
        Row: {
          exercise_type_id: string
          program_exercise_id: string
        }
        Insert: {
          exercise_type_id: string
          program_exercise_id: string
        }
        Update: {
          exercise_type_id?: string
          program_exercise_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_exercise_alternatives_exercise_type_id_fkey"
            columns: ["exercise_type_id"]
            isOneToOne: false
            referencedRelation: "exercise_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_exercise_alternatives_program_exercise_id_fkey"
            columns: ["program_exercise_id"]
            isOneToOne: false
            referencedRelation: "program_exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      program_exercises: {
        Row: {
          created_at: string
          exercise_type_id: string
          id: string
          order: number
          program_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          exercise_type_id: string
          id?: string
          order: number
          program_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          exercise_type_id?: string
          id?: string
          order?: number
          program_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "program_exercises_exercise_type_id_fkey"
            columns: ["exercise_type_id"]
            isOneToOne: false
            referencedRelation: "exercise_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "program_exercises_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string
          id: string
          owner_id: string
          session_type: Database["public"]["Enums"]["session_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          owner_id: string
          session_type: Database["public"]["Enums"]["session_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          owner_id?: string
          session_type?: Database["public"]["Enums"]["session_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "programs_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          body_weight: number
          comment: string | null
          created_at: string
          date_session: string
          id: string
          is_done: boolean
          owner_id: string
          type_session: Database["public"]["Enums"]["session_type"]
          updated_at: string
        }
        Insert: {
          body_weight: number
          comment?: string | null
          created_at?: string
          date_session: string
          id?: string
          is_done?: boolean
          owner_id: string
          type_session: Database["public"]["Enums"]["session_type"]
          updated_at?: string
        }
        Update: {
          body_weight?: number
          comment?: string | null
          created_at?: string
          date_session?: string
          id?: string
          is_done?: boolean
          owner_id?: string
          type_session?: Database["public"]["Enums"]["session_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trophies: {
        Row: {
          achieved: boolean
          awarded_at: string | null
          body_weight: number | null
          created_at: string
          description: string
          exercise_type_id: string
          exercise_user_id: string | null
          id: string
          level: number
          name: string
          owner_id: string
          reps_goal: number | null
          reps_user: number
          reward_text: string | null
          trophy_type: Database["public"]["Enums"]["trophy_type"]
          updated_at: string
          weight_multiplier: number | null
          weight_user: number
        }
        Insert: {
          achieved?: boolean
          awarded_at?: string | null
          body_weight?: number | null
          created_at?: string
          description: string
          exercise_type_id: string
          exercise_user_id?: string | null
          id?: string
          level: number
          name: string
          owner_id: string
          reps_goal?: number | null
          reps_user?: number
          reward_text?: string | null
          trophy_type: Database["public"]["Enums"]["trophy_type"]
          updated_at?: string
          weight_multiplier?: number | null
          weight_user?: number
        }
        Update: {
          achieved?: boolean
          awarded_at?: string | null
          body_weight?: number | null
          created_at?: string
          description?: string
          exercise_type_id?: string
          exercise_user_id?: string | null
          id?: string
          level?: number
          name?: string
          owner_id?: string
          reps_goal?: number | null
          reps_user?: number
          reward_text?: string | null
          trophy_type?: Database["public"]["Enums"]["trophy_type"]
          updated_at?: string
          weight_multiplier?: number | null
          weight_user?: number
        }
        Relationships: [
          {
            foreignKeyName: "trophies_exercise_type_id_fkey"
            columns: ["exercise_type_id"]
            isOneToOne: false
            referencedRelation: "exercise_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trophies_exercise_user_id_fkey"
            columns: ["exercise_user_id"]
            isOneToOne: false
            referencedRelation: "exercise_users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trophies_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      trophy_definitions: {
        Row: {
          description: string
          exercise_key: string
          level: number
          reps_goal: number
          reward_text: string | null
          trophy_type: Database["public"]["Enums"]["trophy_type"]
          weight_multiplier: number
        }
        Insert: {
          description: string
          exercise_key: string
          level: number
          reps_goal: number
          reward_text?: string | null
          trophy_type: Database["public"]["Enums"]["trophy_type"]
          weight_multiplier: number
        }
        Update: {
          description?: string
          exercise_key?: string
          level?: number
          reps_goal?: number
          reward_text?: string | null
          trophy_type?: Database["public"]["Enums"]["trophy_type"]
          weight_multiplier?: number
        }
        Relationships: [
          {
            foreignKeyName: "trophy_definitions_exercise_key_fkey"
            columns: ["exercise_key"]
            isOneToOne: false
            referencedRelation: "default_exercise_types"
            referencedColumns: ["key"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ensure_profile: {
        Args: never
        Returns: {
          created_at: string
          email: string | null
          first_name: string | null
          has_seen_onboarding: boolean
          id: string
          last_name: string | null
          updated_at: string
        }
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      save_exercise: {
        Args: {
          p_comment?: string
          p_id?: string
          p_session_id?: string
          p_sets: Json
          p_type_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      session_type:
        | "Upper A"
        | "Lower"
        | "Upper B"
        | "Other"
        | "Séance A"
        | "Séance B"
      trophy_type:
        | "silver"
        | "gold"
        | "platinum"
        | "diamond"
        | "master"
        | "grand master"
        | "challenger"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      session_type: [
        "Upper A",
        "Lower",
        "Upper B",
        "Other",
        "Séance A",
        "Séance B",
      ],
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
} as const
