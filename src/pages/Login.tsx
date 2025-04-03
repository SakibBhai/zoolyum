
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Check if there's a stored lockout time
  useEffect(() => {
    const storedLockTime = localStorage.getItem('loginLockoutUntil');
    if (storedLockTime) {
      const lockTime = new Date(storedLockTime);
      if (lockTime > new Date()) {
        setLockedUntil(lockTime);
      } else {
        localStorage.removeItem('loginLockoutUntil');
        localStorage.removeItem('loginAttempts');
      }
    }
    
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts, 10));
    }
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/admin');
    return null;
  }

  // Check if account is locked
  const isLocked = lockedUntil && lockedUntil > new Date();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Reset login attempts on success
        localStorage.removeItem('loginAttempts');
        navigate('/admin');
      } else {
        // Increase login attempts count
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        // Lock account after 5 failed attempts for 15 minutes
        if (newAttempts >= 5) {
          const lockUntil = new Date(new Date().getTime() + 15 * 60 * 1000); // 15 minutes
          setLockedUntil(lockUntil);
          localStorage.setItem('loginLockoutUntil', lockUntil.toString());
          setError('Too many failed login attempts. Your account has been locked for 15 minutes.');
        } else {
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate time remaining for lock
  const getTimeRemaining = () => {
    if (!lockedUntil) return '';
    
    const now = new Date();
    const diff = lockedUntil.getTime() - now.getTime();
    
    if (diff <= 0) {
      setLockedUntil(null);
      return '';
    }
    
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <Helmet>
        <title>Zoolyum CMS - Admin Login</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Zoolyum CMS - Admin Login</CardTitle>
            <CardDescription>
              Login to access the admin panel. Only authorized personnel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isLocked && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Account temporarily locked due to too many failed attempts. 
                    Try again in {getTimeRemaining()} minutes.
                  </AlertDescription>
                </Alert>
              )}
              
              {error && !isLocked && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading || isLocked}
                  placeholder="sakib@zoolyum.com or admin"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading || isLocked}
                  placeholder="********"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : 'Sign In'}
              </Button>
              <div className="text-center text-sm text-muted-foreground pt-2">
                <p>Demo credentials: sakib@zoolyum.com / 1225@Sakib or admin / admin123</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
