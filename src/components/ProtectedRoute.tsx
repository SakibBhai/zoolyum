
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Shield, Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, checkAdminStatus } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [showTimeout, setShowTimeout] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  
  // Session timeout after 30 minutes of inactivity
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  const WARNING_BEFORE_TIMEOUT = 5 * 60 * 1000; // Show warning 5 minutes before timeout

  // Reset activity timer on user interaction
  useEffect(() => {
    const resetActivityTimer = () => {
      setLastActivityTime(Date.now());
      setShowTimeout(false);
    };
    
    // Add event listeners for user activity
    window.addEventListener('mousemove', resetActivityTimer);
    window.addEventListener('mousedown', resetActivityTimer);
    window.addEventListener('keypress', resetActivityTimer);
    window.addEventListener('scroll', resetActivityTimer);
    window.addEventListener('touchstart', resetActivityTimer);
    
    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', resetActivityTimer);
      window.removeEventListener('mousedown', resetActivityTimer);
      window.removeEventListener('keypress', resetActivityTimer);
      window.removeEventListener('scroll', resetActivityTimer);
      window.removeEventListener('touchstart', resetActivityTimer);
    };
  }, []);
  
  // Check for session timeout
  useEffect(() => {
    const checkTimeout = setInterval(() => {
      const currentTime = Date.now();
      const inactiveTime = currentTime - lastActivityTime;
      
      // Show warning before timeout
      if (inactiveTime > SESSION_TIMEOUT - WARNING_BEFORE_TIMEOUT && !showTimeout) {
        setShowTimeout(true);
        toast({
          title: "Session Expiring Soon",
          description: "Your session will expire due to inactivity. Please take action to stay logged in.",
          variant: "warning",
        });
      }
      
      // Log out after timeout
      if (inactiveTime > SESSION_TIMEOUT) {
        // Clear the interval before navigating
        clearInterval(checkTimeout);
        
        // Log the user out
        toast({
          title: "Session Expired",
          description: "You've been logged out due to inactivity.",
          variant: "destructive",
        });
        
        // Redirect to login
        window.location.href = '/login';
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(checkTimeout);
  }, [lastActivityTime, showTimeout, toast]);

  useEffect(() => {
    const verifyAdmin = async () => {
      if (isAuthenticated) {
        try {
          const adminStatus = await checkAdminStatus();
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          toast({
            title: "Access Denied",
            description: "You don't have permission to access this area.",
            variant: "destructive",
          });
        } finally {
          setCheckingAdmin(false);
        }
      } else {
        setIsAdmin(false);
        setCheckingAdmin(false);
      }
    };

    if (!loading) {
      verifyAdmin();
    }
  }, [isAuthenticated, loading, checkAdminStatus, toast]);

  if (loading || checkingAdmin) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <Loader2 className="animate-spin h-12 w-12 text-primary mb-4" />
        <p className="text-gray-600">Verifying credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-authenticated">
      {/* Admin Security Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-primary">
          <Shield className="h-4 w-4 mr-2" />
          <span>Secured Admin Area</span>
        </div>
        <div className="text-xs text-muted-foreground">
          {showTimeout ? (
            <span className="text-destructive font-medium">Session expiring soon</span>
          ) : (
            <span>Activity monitored for security</span>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
