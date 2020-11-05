import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [name, setName] = useState('Damian');
  const [age, setAge] = useState(30);

  const value = {
    name: {
      value: name,
      changeName: (newName) => setName(newName),
    },
    age: {
      value: age,
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a AuthProvider');
  }
  return context;
}

export { UserProvider, useUser };
