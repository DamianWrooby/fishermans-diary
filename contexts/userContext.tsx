import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';

type UserProviderProps = { children: React.ReactNode };

const UserContext = createContext(null);

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const setNewUser = (newUser) => {
      if (newUser) {
        console.log(newUser);
        setUser(newUser);
      } else {
        setUser(null);
      }
    };
    const unsubscribe = auth().onAuthStateChanged(setNewUser);

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}

export { useUser, UserContext, UserProvider };
