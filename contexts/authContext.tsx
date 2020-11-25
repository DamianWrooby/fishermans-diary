import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';
import LoadingScreen from '../components/molecules/LoadingScreen';

type AuthProviderProps = { children: React.ReactNode };

const AuthContext = createContext<{
  isAuthenticated: boolean;
  data: any | null;
}>({
  isAuthenticated: false,
  data: null,
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<fireabase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setLoading(true);
        console.log('no user');
        setUser(null);
        nookies.set(undefined, 'token', '');
        return;
      }

      const token = await user.getIdToken();
      console.log(user);
      setUser(user);
      nookies.set(undefined, 'token', token);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, data: user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}

export const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <LoadingScreen />;
  }
  return children;
};
