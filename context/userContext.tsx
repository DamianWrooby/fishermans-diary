import { createContext } from 'react';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export function useAuthState() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }

  return context;
}
