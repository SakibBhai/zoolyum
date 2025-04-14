
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useAdminCheck = () => {
  const checkAdminStatus = async (user: User | null): Promise<boolean> => {
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

  return { checkAdminStatus };
};
