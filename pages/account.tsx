import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import { fbSignOut } from '../services/firebase';
import Menu from '../components/molecules/Menu';

type AccountProps = {
  children: React.ReactNode;
};

const Account: React.FC<AccountProps> = () => {
  const user = useAuth();

  useEffect(() => {
    console.log(user.data);
  }, []);

  return (
    <>
      <Menu />
      {user ? (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">{`Welcome ${user.data.email}`}</p>
          <Button
            className="p-2"
            colorScheme="blue"
            size="sm"
            onClick={fbSignOut}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Account;
