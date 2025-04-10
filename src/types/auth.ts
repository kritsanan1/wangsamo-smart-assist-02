
import { User, Session } from '@supabase/supabase-js';

export interface AuthState {
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserData: () => Promise<any>;
}
