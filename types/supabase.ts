export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      kb_documents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: string
          author: string | null
          published: boolean
          view_count: number
          meta_title: string | null
          meta_description: string | null
          tags: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          slug: string
          content: string
          excerpt: string
          category: string
          author?: string | null
          published?: boolean
          view_count?: number
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          category?: string
          author?: string | null
          published?: boolean
          view_count?: number
          meta_title?: string | null
          meta_description?: string | null
          tags?: string[] | null
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
  }
}
