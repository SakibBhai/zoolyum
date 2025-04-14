
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';
import { AppUser, LoginResult } from '@/types/auth';
import { 
  getSanitizedLoginAttempts,
  getAccountLockoutTime,
  clearLoginSecurityData,
  setAccountLockout,
  incrementFailedLoginAttempts,
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_DURATION,
  MIN_LOGIN_INTERVAL
} from '@/utils/authUtils';

export const useLogin = (
  setUser: (user: User | null) => void,
  setIsAuthenticated: (value: boolean) => void
) => {
  const [lastLoginAttempt, setLastLoginAttempt] = useState<number>(0);
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<LoginResult> => {
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
        clearLoginSecurityData();
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
      clearLoginSecurityData();
      
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel!',
      });
      
      return { success: true };
      
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Increment failed login attempts with extra validation
      const attempts = incrementFailedLoginAttempts();
      
      // Lock account after MAX_LOGIN_ATTEMPTS failed attempts
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        setAccountLockout(LOCKOUT_DURATION);
        
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

  return { login };
};
