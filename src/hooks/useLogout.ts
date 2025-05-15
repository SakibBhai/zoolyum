
import { useToast } from '@/hooks/use-toast';

export const useLogout = (
  setUser: (user: null) => void,
  setSession: (session: null) => void,
  setIsAuthenticated: (value: boolean) => void
) => {
  const { toast } = useToast();

  const logout = async (): Promise<void> => {
    try {
      // Reset authentication state
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      // Clear session data from storage
      localStorage.removeItem('zoolyum_user');
      localStorage.removeItem('zoolyum_authenticated');
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

  return { logout };
};
