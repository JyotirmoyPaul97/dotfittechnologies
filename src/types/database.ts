export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number | null
          gender: string | null
          height_cm: number | null
          weight_kg: number | null
          goal: string | null
          experience: string | null
          days_per_week: number | null
          session_duration: string | null
          location: string | null
          equipment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age?: number | null
          gender?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          goal?: string | null
          experience?: string | null
          days_per_week?: number | null
          session_duration?: string | null
          location?: string | null
          equipment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number | null
          gender?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          goal?: string | null
          experience?: string | null
          days_per_week?: number | null
          session_duration?: string | null
          location?: string | null
          equipment?: string | null
          created_at?: string
          updated_at?: string
        }
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