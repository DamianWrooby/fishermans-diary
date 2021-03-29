import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';

interface Context {
  isAuthenticated: boolean;
  data: firebase.User | null;
  loading: boolean;
}
interface ProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<Context>({
  isAuthenticated: false,
  data: null,
  loading: false,
});

export default function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth().onIdTokenChanged(async (fbUser) => {
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

export function useAuth(): Context {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}
