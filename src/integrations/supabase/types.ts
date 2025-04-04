export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      app_users: {
        Row: {
          created_at: string
          email: string
          id: string
          last_login: string | null
          password_hash: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          last_login?: string | null
          password_hash: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          last_login?: string | null
          password_hash?: string
          role?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string
          id: string
          image: string
          title: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          date: string
          excerpt: string
          id?: string
          image: string
          title: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          image?: string
          title?: string
        }
        Relationships: []
      }
      case_studies: {
        Row: {
          challenge: string
          created_at: string
          id: string
          image: string
          industry: string
          results: string
          solution: string
          summary: string
          title: string
        }
        Insert: {
          challenge: string
          created_at?: string
          id?: string
          image: string
          industry: string
          results: string
          solution: string
          summary: string
          title: string
        }
        Update: {
          challenge?: string
          created_at?: string
          id?: string
          image?: string
          industry?: string
          results?: string
          solution?: string
          summary?: string
          title?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          display_order: number | null
          id: string
          is_highlighted: boolean | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_highlighted?: boolean | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_highlighted?: boolean | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_links: {
        Row: {
          created_at: string
          display_order: number | null
          id: string
          section: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          display_order?: number | null
          id?: string
          section: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          display_order?: number | null
          id?: string
          section?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image?: string
          title?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content: string
          created_at: string
          id: string
          section: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          section: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          section?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
