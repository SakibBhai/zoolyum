
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useAdminCheck = () => {
  const checkAdminStatus = async (user: User | null): Promise<boolean> => {
    try {
      if (!user) {
        console.log('Cannot check admin status: No user provided');
        return false;
      }
      
      console.log('Checking admin status for user ID:', user.id);
      
      // Special case for our predefined admin
      if (user.id === 'predefined-admin-id' && user.email === 'sakib@zoolyum.com') {
        console.log('Admin check result: Is predefined admin');
        return true;
      }
      
      // Query the database with a more robust approach
      const { data, error } = await supabase
        .from('app_users')
        .select('role')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Database error checking admin status:', error);
        return false;
      }
      
      if (!data) {
        console.log('No user found in app_users table with ID:', user.id);
        return false;
      }
      
      const isAdmin = data.role === 'admin';
      console.log('Admin check result:', isAdmin ? 'Is admin' : 'Not admin');
      return isAdmin;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  return { checkAdminStatus };
};
