
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Eye, EyeOff, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false); // For demo purposes
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
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

  // Set up timer to update lockout countdown
  useEffect(() => {
    if (!lockedUntil) return;
    
    const timer = setInterval(() => {
      if (lockedUntil <= new Date()) {
        setLockedUntil(null);
        clearInterval(timer);
      } else {
        // Force re-render to update countdown
        setLockedUntil(new Date(lockedUntil.getTime()));
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [lockedUntil]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  // Check password strength when password changes
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }
    
    // Simple password strength calculator
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains number
    if (/\d/.test(password)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;
    
    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(strength);
  }, [password]);

  // Check if account is locked
  const isLocked = lockedUntil && lockedUntil > new Date();

  // Handle 2FA verification (simulated for demo)
  const handleTwoFactorVerify = () => {
    // This is a demo implementation - in a real app, this would verify with a backend
    if (twoFactorCode === '123456') {
      setShowTwoFactor(false);
      setSuccessMessage('Two-factor authentication successful!');
      
      // Redirect to admin after short delay
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLocked) {
      return;
    }
    
    // Clear any previous messages
    setError('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        // Reset login attempts on success
        localStorage.removeItem('loginAttempts');
        
        // For demo purposes, show 2FA screen for specific accounts
        if (email === 'admin@example.com' || email === 'sakib@zoolyum.com') {
          setShowTwoFactor(true);
        } else {
          navigate('/admin');
        }
      } else {
        // Increase login attempts count
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        localStorage.setItem('loginAttempts', newAttempts.toString());
        
        // Display the error from the login function
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate time remaining for lock with memo to prevent unnecessary re-renders
  const getTimeRemaining = useCallback(() => {
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
  }, [lockedUntil]);

  // Render the 2FA verification screen if needed
  if (showTwoFactor) {
    return (
      <>
        <Helmet>
          <title>Zoolyum CMS - Two-Factor Authentication</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Shield className="mr-2 text-primary h-6 w-6" />
                Two-Factor Authentication
              </CardTitle>
              <CardDescription>
                For enhanced security, please enter the verification code from your authenticator app.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleTwoFactorVerify(); }} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    type="text" 
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value)}
                    required
                    maxLength={6}
                    autoComplete="off"
                    className="text-center text-xl tracking-widest"
                    placeholder="123456"
                  />
                  <p className="text-xs text-muted-foreground">
                    For demo purposes, use code: 123456
                  </p>
                </div>
                
                <Button type="submit" className="w-full">
                  Verify
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Didn't receive a code? <a href="#" className="text-primary hover:underline">Resend code</a></p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

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
              {successMessage && (
                <Alert className="bg-green-50 border-green-200 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              
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
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
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
                  placeholder="admin@example.com or admin"
                  className="bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading || isLocked}
                    placeholder="********"
                    className="bg-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {/* Password strength indicator (only show when typing) */}
                {password && (
                  <div className="mt-1">
                    <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          passwordStrength <= 1 ? 'bg-red-500' : 
                          passwordStrength <= 3 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      {passwordStrength <= 1 ? 'Weak' : 
                       passwordStrength <= 3 ? 'Medium' : 
                       'Strong'} password
                    </p>
                  </div>
                )}
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
