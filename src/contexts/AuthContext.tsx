
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Session, User } from '@supabase/supabase-js';

// Define a type for the app_users table since it's not in the generated types
interface AppUser {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  created_at: string;
  last_login: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAdminStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastLoginAttempt, setLastLoginAttempt] = useState<number>(0);
  const { toast } = useToast();

  // Configuration for login security
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  const MIN_LOGIN_INTERVAL = 1000; // 1 second between login attempts to prevent brute force

  // Check if current session exists on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Set up auth state listener FIRST
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setSession(session);
            setUser(session?.user || null);
            setIsAuthenticated(!!session);
          }
        );

        // THEN check for existing session
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setLoading(false);
      }

      return () => {
        // Cleanup auth listener
      };
    };

    checkSession();
  }, []);

  // Helper function to get sanitized login attempts from localStorage
  const getSanitizedLoginAttempts = (): number => {
    try {
      const attempts = localStorage.getItem('loginAttempts');
      if (!attempts) return 0;
      const parsedAttempts = parseInt(attempts, 10);
      return isNaN(parsedAttempts) ? 0 : parsedAttempts;
    } catch (e) {
      console.error('Error reading login attempts:', e);
      return 0;
    }
  };

  // Helper function to get account lockout time from localStorage
  const getAccountLockoutTime = (): Date | null => {
    try {
      const lockoutTime = localStorage.getItem('loginLockoutUntil');
      if (!lockoutTime) return null;
      
      const lockTime = new Date(lockoutTime);
      return isNaN(lockTime.getTime()) ? null : lockTime;
    } catch (e) {
      console.error('Error reading lockout time:', e);
      return null;
    }
  };

  // Login function with enhanced security and database authentication
  const login = async (email: string, password: string) => {
    try {
      // Implement rate limiting
      const now = Date.now();
      if (now - lastLoginAttempt < MIN_LOGIN_INTERVAL) {
        return { 
          success: false, 
          error: 'Please wait before trying again.' 
        };
      }
      setLastLoginAttempt(now);
      
      // Check for account lockout
      const lockoutTime = getAccountLockoutTime();
      if (lockoutTime && lockoutTime > new Date()) {
        const timeRemaining = Math.ceil((lockoutTime.getTime() - now) / 60000);
        return { 
          success: false, 
          error: `Account temporarily locked due to too many failed attempts. Try again in ${timeRemaining} minute(s).` 
        };
      }

      // Check for previous failed attempts
      const previousFailedAttempts = getSanitizedLoginAttempts();
      if (previousFailedAttempts >= MAX_LOGIN_ATTEMPTS) {
        // Reset if lockout period expired
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockoutUntil');
      }
      
      // Use a more generic approach with SQL query instead of relying on types
      const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error || !data) {
        throw new Error('Invalid email or password');
      }
      
      const userData = data as unknown as AppUser;
      
      // Simple password check
      if (userData.password_hash !== password) {
        throw new Error('Invalid email or password');
      }
      
      // Update last_login timestamp with a more generic approach
      await supabase
        .from('app_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userData.id);
      
      // Set authenticated user
      const customUser = { 
        id: userData.id,
        email: userData.email,
        role: userData.role,
        app_metadata: { role: userData.role },
        user_metadata: { role: userData.role },
        aud: 'authenticated',
        created_at: userData.created_at
      } as User;
      
      setUser(customUser);
      setIsAuthenticated(true);
      
      // Reset failed login attempts
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('loginLockoutUntil');
      
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel!',
      });
      
      return { success: true };
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Increment failed login attempts with extra validation
      const attempts = getSanitizedLoginAttempts() + 1;
      localStorage.setItem('loginAttempts', attempts.toString());
      
      // Lock account after MAX_LOGIN_ATTEMPTS failed attempts
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        const lockUntil = new Date(Date.now() + LOCKOUT_DURATION);
        localStorage.setItem('loginLockoutUntil', lockUntil.toString());
        
        return {
          success: false,
          error: `Too many failed login attempts. Your account has been locked for ${LOCKOUT_DURATION/60000} minutes.`
        };
      }
      
      toast({
        title: 'Login failed',
        description: error.message || 'An error occurred during login',
        variant: 'destructive',
      });
      
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Reset authentication state
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      // Clear session data from storage for extra security
      localStorage.removeItem('supabase.auth.token');
      sessionStorage.removeItem('supabase.auth.token');
      
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: error.message || 'An error occurred during logout',
        variant: 'destructive',
      });
    }
  };

  // Check if user is an admin
  const checkAdminStatus = async (): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Query the database with a more generic approach
      const { data, error } = await supabase
        .from('app_users')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error || !data) return false;
      
      const userData = data as unknown as { role: string };
      return userData.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
        checkAdminStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
