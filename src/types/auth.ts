
import { Session, User } from '@supabase/supabase-js';

// Define a type for the app_users table since it's not in the generated types
export interface AppUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
}

export interface LoginResult {
  success: boolean;
  error?: string;
}
