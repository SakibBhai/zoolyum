
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
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
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check if current session exists on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (data.session) {
          setUser(data.session.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(!!session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Login function with rate limiting and additional security
  const login = async (email: string, password: string) => {
    try {
      // For demo login, allow specific credentials with improved security checks
      const allowedLogins = [
        { email: 'admin@example.com', password: 'admin123' },
        { email: 'admin', password: 'admin123' },
        { email: 'sakib@zoolyum.com', password: '1225@Sakib' }
      ];
      
      // Check for previous failed attempts and potential brute force attacks
      const previousFailedAttempts = parseInt(localStorage.getItem('loginAttempts') || '0', 10);
      if (previousFailedAttempts >= 5) {
        const lockoutTime = localStorage.getItem('loginLockoutUntil');
        if (lockoutTime && new Date(lockoutTime) > new Date()) {
          return { 
            success: false, 
            error: 'Account temporarily locked due to too many failed attempts. Please try again later.' 
          };
        } else {
          // Reset if lockout period expired
          localStorage.removeItem('loginAttempts');
          localStorage.removeItem('loginLockoutUntil');
        }
      }
      
      const matchedLogin = allowedLogins.find(
        login => (login.email === email && login.password === password)
      );
      
      if (matchedLogin) {
        // Demo login with hardcoded credentials - manually set auth state
        setUser({ 
          id: 'demo-user-id',
          email: matchedLogin.email === 'admin' ? 'admin@example.com' : matchedLogin.email,
          role: 'admin' // Set admin role for demo users
        });
        setIsAuthenticated(true);
        
        // Reset failed login attempts
        localStorage.removeItem('loginAttempts');
        localStorage.removeItem('loginLockoutUntil');
        
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin panel!',
        });
        
        return { success: true };
      }

      // Regular login flow for non-demo users (only execute this if not using demo credentials)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const isAdmin = await checkAdminStatus();
      if (!isAdmin) {
        await logout();
        return { 
          success: false, 
          error: 'Not authorized as admin' 
        };
      }

      // Reset failed login attempts on successful login
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('loginLockoutUntil');
      
      toast({
        title: 'Login successful',
        description: 'Welcome back!',
      });
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Increment failed login attempts
      const attempts = parseInt(localStorage.getItem('loginAttempts') || '0', 10) + 1;
      localStorage.setItem('loginAttempts', attempts.toString());
      
      // Lock account after 5 failed attempts
      if (attempts >= 5) {
        const lockUntil = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes
        localStorage.setItem('loginLockoutUntil', lockUntil.toString());
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
      // For demo login, just reset state
      if (user && (user.email === 'admin@example.com' || user.email === 'sakib@zoolyum.com')) {
        setUser(null);
        setIsAuthenticated(false);
        toast({
          title: 'Logged out',
          description: 'You have been successfully logged out',
        });
        return;
      }
      
      // Regular logout for non-demo users
      await supabase.auth.signOut();
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
      
      // For the demo, we'll consider these emails as admin
      if (user.email === 'admin@example.com' || user.email === 'sakib@zoolyum.com' || user.role === 'admin') {
        return true;
      }
      
      // In a real app, you might check a roles table in your database
      // const { data, error } = await supabase
      //   .from('user_roles')
      //   .select('role')
      //   .eq('user_id', user.id)
      //   .eq('role', 'admin')
      //   .single();
      
      // return !error && data;
      
      return false;
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
