import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import { deleteUser } from '../services/firebase';
import Menu from '../components/molecules/Menu';

const DeleteAccount = (): JSX.Element => {
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
      {user.isAuthenticated ? (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">Are you crazy?</p>
          <Button
            className="p-4 m-4"
            colorScheme="red"
            size="sm"
            onClick={deleteUser}
          >
            Delete my account
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default DeleteAccount;
