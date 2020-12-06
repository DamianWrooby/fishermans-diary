import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import { signOut } from '../services/firebase';
import Menu from '../components/molecules/Menu';

type AccountProps = {
  children: React.ReactNode;
};

const Account: React.FC<AccountProps> = () => {
  const user = useAuth();
  const router = useRouter();

  const redirect = () => {
    console.log('redirection');
    router.push('/login');
  };
  useEffect(() => {
    user.data ? null : redirect();
    console.log(user);
  }, []);

  return (
    <>
      <Menu />
      {user.data ? (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">{`Welcome ${user.data.email}`}</p>
          <Button
            className="p-2"
            colorScheme="blue"
            size="sm"
            onClick={signOut}
          >
            Logout
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Account;
