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
      organizations: {
        Row: {
          id: string;
          name: string;
          created_at: string;
          updated_at: string;
          settings: Json;
        };
        Insert: {
          id: string;
          name: string;
          created_at?: string;
          updated_at?: string;
          settings?: Json;
        };
        Update: {
          id?: string;
          name?: string;
          created_at?: string;
          updated_at?: string;
          settings?: Json;
        };
      };
      clients: {
        Row: {
          id: string;
          organization_id: string;
          first_name: string;
          last_name: string;
          email: string | null;
          phone: string | null;
          address: string;
          created_at: string;
          updated_at: string;
          preferences: Json;
        };
        Insert: {
          id?: string;
          organization_id: string;
          first_name: string;
          last_name: string;
          email?: string | null;
          phone?: string | null;
          address: string;
          created_at?: string;
          updated_at?: string;
          preferences?: Json;
        };
        Update: {
          id?: string;
          organization_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string | null;
          phone?: string | null;
          address?: string;
          created_at?: string;
          updated_at?: string;
          preferences?: Json;
        };
      };
      employees: {
        Row: {
          id: string;
          organization_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string | null;
          role: string;
          created_at: string;
          updated_at: string;
          skills: string[];
          schedule_preferences: Json;
        };
        Insert: {
          id?: string;
          organization_id: string;
          first_name: string;
          last_name: string;
          email: string;
          phone?: string | null;
          role: string;
          created_at?: string;
          updated_at?: string;
          skills?: string[];
          schedule_preferences?: Json;
        };
        Update: {
          id?: string;
          organization_id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
          skills?: string[];
          schedule_preferences?: Json;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
