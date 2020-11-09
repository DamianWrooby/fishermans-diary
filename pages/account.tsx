import { useEffect } from 'react';
import { Button } from '@chakra-ui/core';
import { useUser } from '../contexts/userContext';
import { fbSignOut } from '../services/firebase';
import Menu from '../components/Menu';

type AccountProps = {
  children: React.ReactNode;
};

const Account: React.FC<AccountProps> = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <>
      <Menu />
      {user ? (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">{`Welcome ${user.email}`}</p>
          <Button
            className="p-2"
            variantColor="blue"
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
