
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
        clearLoginSecurityData();
      }

      // Fetch user data and verify credentials
      const { data: userData, error: userError } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (userError || !userData) {
        throw new Error('Invalid email or password');
      }

      // Verify password (in a real app, you'd use proper password hashing)
      if (userData.password_hash !== password) {
        throw new Error('Invalid email or password');
      }

      // Check if user is an admin
      if (userData.role !== 'admin') {
        throw new Error('Access denied. Admin privileges required.');
      }

      // Update last login timestamp
      await supabase
        .from('app_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userData.id);

      // Create custom user object with admin role
      const customUser = {
        id: userData.id,
        email: userData.email,
        role: userData.role,
        app_metadata: { role: userData.role },
        user_metadata: { role: userData.role },
        aud: 'authenticated',
        created_at: userData.created_at
      } as User;

      // Set authenticated user state
      setUser(customUser);
      setIsAuthenticated(true);

      // Reset failed login attempts
      clearLoginSecurityData();

      // Show success message
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel!',
      });

      return { success: true };

    } catch (error: any) {
      console.error('Login error:', error);

      // Increment failed login attempts
      const attempts = incrementFailedLoginAttempts();

      // Lock account after max attempts
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        setAccountLockout(LOCKOUT_DURATION);
        return {
          success: false,
          error: `Too many failed login attempts. Your account has been locked for ${LOCKOUT_DURATION/60000} minutes.`
        };
      }

      // Show error message
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
