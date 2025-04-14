
import React, { createContext, useState, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType } from '@/types/auth';
import { useAuthStatus } from '@/hooks/useAuthStatus';
import { useLogin } from '@/hooks/useLogin';
import { useLogout } from '@/hooks/useLogout';
import { useAdminCheck } from '@/hooks/useAdminCheck';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, isAuthenticated, loading } = useAuthStatus();
  const [sessionState, setSessionState] = useState<Session | null>(session);
  const [userState, setUserState] = useState<User | null>(user);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState<boolean>(isAuthenticated);
  
  const { login } = useLogin(setUserState, setIsAuthenticatedState);
  const { logout } = useLogout(setUserState, setSessionState, setIsAuthenticatedState);
  const { checkAdminStatus } = useAdminCheck();

  // Wrapper for admin check to use current user
  const checkAdminStatusWrapper = async (): Promise<boolean> => {
    return await checkAdminStatus(userState);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticatedState,
        user: userState,
        loading,
        login,
        logout,
        checkAdminStatus: checkAdminStatusWrapper,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
