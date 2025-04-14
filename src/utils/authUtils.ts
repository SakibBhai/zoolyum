
// Helper functions for authentication security and validation

// Security configuration
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
export const MIN_LOGIN_INTERVAL = 1000; // 1 second between login attempts

// Get login attempts from local storage with proper validation
export const getSanitizedLoginAttempts = (): number => {
  try {
    const attempts = localStorage.getItem('loginAttempts');
    if (!attempts) return 0;
    const parsedAttempts = parseInt(attempts, 10);
    return isNaN(parsedAttempts) ? 0 : parsedAttempts;
  } catch (e) {
    console.error('Error reading login attempts:', e);
    return 0;
  }
};

// Get account lockout time from localStorage with validation
export const getAccountLockoutTime = (): Date | null => {
  try {
    const lockoutTime = localStorage.getItem('loginLockoutUntil');
    if (!lockoutTime) return null;
    
    const lockTime = new Date(lockoutTime);
    return isNaN(lockTime.getTime()) ? null : lockTime;
  } catch (e) {
    console.error('Error reading lockout time:', e);
    return null;
  }
};

// Clear login security data
export const clearLoginSecurityData = () => {
  localStorage.removeItem('loginAttempts');
  localStorage.removeItem('loginLockoutUntil');
};

// Set account lockout
export const setAccountLockout = (duration: number) => {
  const lockUntil = new Date(Date.now() + duration);
  localStorage.setItem('loginLockoutUntil', lockUntil.toString());
};

// Increment failed login attempts
export const incrementFailedLoginAttempts = (): number => {
  const attempts = getSanitizedLoginAttempts() + 1;
  localStorage.setItem('loginAttempts', attempts.toString());
  return attempts;
};
