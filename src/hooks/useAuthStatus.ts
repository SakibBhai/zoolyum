
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuthStatus = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        // First check localStorage for stored authentication state
        const storedUser = localStorage.getItem('zoolyum_user');
        const storedAuthState = localStorage.getItem('zoolyum_authenticated');
        
        if (storedUser && storedAuthState === 'true') {
          const parsedUser = JSON.parse(storedUser) as User;
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log("Restored authentication from localStorage:", parsedUser.email);
        }
        
        // Set up auth state listener
        const { data: authListener } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            setSession(session);
            setUser(session?.user || null);
            setIsAuthenticated(!!session);
          }
        );

        // Check for existing Supabase session
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

  return { user, session, isAuthenticated, loading };
};
