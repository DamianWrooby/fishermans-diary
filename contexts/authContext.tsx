import { createContext, useContext, useEffect, useState } from 'react';
import nookies from 'nookies';
import firebase from 'firebase/app';
import { auth } from '../services/firebase';

interface Context {
  isAuthenticated: boolean;
  data: firebase.User | null;
  loading: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<Context>({
  isAuthenticated: false,
  data: null,
  loading: false,
});

export default function AuthProvider({ children }: Props): JSX.Element {
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

      const token = await fbUser.getIdToken();
      console.log(fbUser);
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

// export const ProtectRoute = ({ children }: Props): React.ReactNode => {
//   const { isAuthenticated, loading } = useAuth();
//   if (loading || (!isAuthenticated && window.location.pathname !== '/login')) {
//     return <LoadingScreen />;
//   }
//   return children;
// };
