import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';
import LoadingScreen from '../components/molecules/LoadingScreen';

interface Context {
  isAuthenticated: boolean;
  data: firebase.User | null;
}

const AuthContext = createContext<Context>({
  isAuthenticated: false,
  data: null,
});

export default function AuthProvider({
  children,
}: React.ReactNode): React.ReactNode {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return auth().onIdTokenChanged(async (fbUser) => {
      if (!fbUser) {
        setLoading(true);
        console.log('no user');
        setUser(null);
        nookies.set(undefined, 'token', '', '');
        return;
      }

      const token = await user.getIdToken();
      console.log(fbUser);
      setUser(fbUser);
      nookies.set(undefined, 'token', token, '');
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, data: user }}>
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
