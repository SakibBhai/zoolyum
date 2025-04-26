
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { AppUser, LoginResult } from '@/types/auth';

export const useLogin = (
  setUser: (user: User | null) => void,
  setIsAuthenticated: (value: boolean) => void
) => {
  const { toast } = useToast();

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      // Fetch user data and verify credentials
      const { data: userData, error: userError } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      if (userError || !userData) {
        throw new Error('Invalid email or password');
      }

      // Verify password
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

      // Show success message
      toast({
        title: 'Login successful',
        description: 'Welcome to the admin panel!',
      });

      return { success: true };

    } catch (error: any) {
      console.error('Login error:', error);

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
