import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';

export interface ContextTypes {
  isAuthenticated: boolean;
  data: firebase.User | null;
  loading: boolean;
}
interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<ContextTypes>({
  isAuthenticated: false,
  data: null,
  loading: false,
});

export default function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth().onIdTokenChanged(async (fbUser) => {
      try {
        if (!fbUser) {
          setLoading(false);
          setUser(null);
          nookies.set(undefined, 'token', '', '');
          return;
        }

        const token = await fbUser.getIdToken();
        setLoading(true);
        setUser(fbUser);
        nookies.set(undefined, 'token', token, '');
        setLoading(false);
      } catch (err) {
        (err) => console.log('Auth error:', err);
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, data: user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): ContextTypes {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}
