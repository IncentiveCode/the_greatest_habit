export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          description: string
          id: number
          orderNo: number
          state: boolean
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: never
          orderNo?: number
          state?: boolean
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: never
          orderNo?: number
          state?: boolean
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      action_plans: {
        Row: {
          completed_at: string | null
          created_at: string
          description: string
          end_date: string
          goal_id: number
          owner_id: string
          period: Database["public"]["Enums"]["period"]
          plan_id: number
          start_date: string
          title: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          description: string
          end_date?: string
          goal_id: number
          owner_id: string
          period: Database["public"]["Enums"]["period"]
          plan_id?: never
          start_date?: string
          title: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          description?: string
          end_date?: string
          goal_id?: number
          owner_id?: string
          period?: Database["public"]["Enums"]["period"]
          plan_id?: never
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "action_plans_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "challenge_list_view"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "action_plans_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "action_plans_owner_id_profiles_profile_id_fk"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      challenge_members: {
        Row: {
          goal_id: number
          joined_at: string
          profile_id: string
        }
        Insert: {
          goal_id: number
          joined_at?: string
          profile_id: string
        }
        Update: {
          goal_id?: number
          joined_at?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "challenge_members_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "challenge_list_view"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "challenge_members_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "challenge_members_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      goals: {
        Row: {
          created_at: string
          description: string
          end_date: string
          goal_id: number
          goal_status: Database["public"]["Enums"]["goal_status"]
          goal_type: Database["public"]["Enums"]["goal_type"]
          message_frequency: Database["public"]["Enums"]["message_frequency"]
          owner_id: string
          reward_id: number
          start_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date?: string
          goal_id?: never
          goal_status?: Database["public"]["Enums"]["goal_status"]
          goal_type?: Database["public"]["Enums"]["goal_type"]
          message_frequency: Database["public"]["Enums"]["message_frequency"]
          owner_id: string
          reward_id: number
          start_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          goal_id?: never
          goal_status?: Database["public"]["Enums"]["goal_status"]
          goal_type?: Database["public"]["Enums"]["goal_type"]
          message_frequency?: Database["public"]["Enums"]["message_frequency"]
          owner_id?: string
          reward_id?: number
          start_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "goals_owner_id_profiles_profile_id_fk"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "goals_reward_id_rewards_reward_id_fk"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["reward_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          goal_id: number | null
          notification_id: number
          source_id: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Insert: {
          created_at?: string
          goal_id?: number | null
          notification_id?: never
          source_id?: string | null
          target_id: string
          type: Database["public"]["Enums"]["notification_type"]
        }
        Update: {
          created_at?: string
          goal_id?: number | null
          notification_id?: never
          source_id?: string | null
          target_id?: string
          type?: Database["public"]["Enums"]["notification_type"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "challenge_list_view"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "notifications_goal_id_goals_goal_id_fk"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["goal_id"]
          },
          {
            foreignKeyName: "notifications_source_id_profiles_profile_id_fk"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "notifications_target_id_profiles_profile_id_fk"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          headline: string | null
          phone: string | null
          profile_id: string
          status: Database["public"]["Enums"]["status"]
          updated_at: string
          username: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          headline?: string | null
          phone?: string | null
          profile_id: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
          username: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          headline?: string | null
          phone?: string | null
          profile_id?: string
          status?: Database["public"]["Enums"]["status"]
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      reward_history: {
        Row: {
          profile_id: string
          remains: number
          reward_id: number
        }
        Insert: {
          profile_id: string
          remains?: number
          reward_id: number
        }
        Update: {
          profile_id?: string
          remains?: number
          reward_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reward_history_profile_id_profiles_profile_id_fk"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["profile_id"]
          },
          {
            foreignKeyName: "reward_history_reward_id_rewards_reward_id_fk"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["reward_id"]
          },
        ]
      }
      rewards: {
        Row: {
          created_at: string
          point: number
          reward_id: number
          title: string
        }
        Insert: {
          created_at?: string
          point: number
          reward_id?: never
          title: string
        }
        Update: {
          created_at?: string
          point?: number
          reward_id?: never
          title?: string
        }
        Relationships: []
      }
      tutorial_content: {
        Row: {
          created_at: string
          descriptions: string[] | null
          id: number
          images: string[] | null
          tutorial_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          descriptions?: string[] | null
          id?: never
          images?: string[] | null
          tutorial_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          descriptions?: string[] | null
          id?: never
          images?: string[] | null
          tutorial_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tutorial_content_item_id_tutorials_id_fk"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "tutorials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutorial_content_tutorial_id_tutorials_id_fk"
            columns: ["tutorial_id"]
            isOneToOne: false
            referencedRelation: "tutorials"
            referencedColumns: ["id"]
          },
        ]
      }
      tutorials: {
        Row: {
          created_at: string
          description: string | null
          id: number
          order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: never
          order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: never
          order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      challenge_list_view: {
        Row: {
          count: number | null
          description: string | null
          end_date: string | null
          goal_id: number | null
          goal_status: Database["public"]["Enums"]["goal_status"] | null
          message_frequency:
            | Database["public"]["Enums"]["message_frequency"]
            | null
          point: number | null
          reward: string | null
          start_date: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      goal_status: "Not started" | "Started" | "Failed" | "Finished"
      goal_type: "habit" | "challenge"
      message_frequency: "None" | "once a day" | "once a week" | "once a month"
      notification_type: "message" | "review" | "reply" | "mention"
      period: "day" | "week" | "month"
      status: "active" | "inactive"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      goal_status: ["Not started", "Started", "Failed", "Finished"],
      goal_type: ["habit", "challenge"],
      message_frequency: ["None", "once a day", "once a week", "once a month"],
      notification_type: ["message", "review", "reply", "mention"],
      period: ["day", "week", "month"],
      status: ["active", "inactive"],
    },
  },
} as const
