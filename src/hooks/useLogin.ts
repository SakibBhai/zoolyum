
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
      console.log("Login attempt for:", email);
      
      // Special case for predefined admin credentials
      if (email === 'sakib@zoolyum.com' && password === '1225@Sakib') {
        console.log("Using predefined admin credentials");
        
        // Create custom user object with admin role
        const customUser = {
          id: 'predefined-admin-id',
          email: 'sakib@zoolyum.com',
          role: 'admin',
          app_metadata: { role: 'admin' },
          user_metadata: { role: 'admin' },
          aud: 'authenticated',
          created_at: new Date().toISOString()
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
      }
      
      // Regular database authentication flow
      // Fetch user data and verify credentials
      const { data: userData, error: userError } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .maybeSingle();

      console.log("User data retrieved:", userData, "Error:", userError);
      
      if (userError) {
        console.error("Database error:", userError);
        throw new Error('Login failed. Please try again.');
      }
      
      if (!userData) {
        console.log("No user found with email:", email);
        throw new Error('Invalid email or password');
      }

      // Verify password - direct comparison for simplicity
      if (userData.password_hash !== password) {
        console.log("Password mismatch for user:", email);
        throw new Error('Invalid email or password');
      }

      // Check if user is an admin
      if (userData.role !== 'admin') {
        console.log("User is not an admin:", email, "Role:", userData.role);
        throw new Error('Access denied. Admin privileges required.');
      }

      console.log("Login successful for admin:", email);
      
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
