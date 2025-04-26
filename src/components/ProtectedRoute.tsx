
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
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    const verifyAdmin = async () => {
      if (isAuthenticated) {
        try {
          console.log("Verifying admin status...");
          const adminStatus = await checkAdminStatus();
          console.log("Admin status result:", adminStatus);
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
        console.log("User is not authenticated");
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
    console.log("Redirecting to login - not authenticated");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isAdmin) {
    console.log("Redirecting to home - not admin");
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this area.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  console.log("Access granted to admin area");
  return (
    <div className="admin-authenticated">
      {children}
    </div>
  );
};

export default ProtectedRoute;
