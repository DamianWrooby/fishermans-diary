import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { OnViewportBoxUpdate } from 'framer-motion/types/motion/features/layout/types';
import { useAuth } from '../contexts/authContext';
import { signOut } from '../services/firebase';
import Menu from '../components/molecules/Menu';

const Account: React.FC<React.ReactNode> = () => {
  const user = useAuth();
  const router = useRouter();

  const redirect = (): void => {
    console.log('redirection');
    router.push('/login');
  };

  const logout = (): void => {
    signOut();
    router.push('/login');
  };
  useEffect(() => {
    if (!user.isAuthenticated) {
      redirect();
    }
    console.log(user);
  }, [user]);

  return (
    <>
      <Menu />
      {user.data ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="p-2">{`Welcome ${user.data.email}`}</p>
          <Button
            className="p-4 m-4"
            colorScheme="blue"
            size="sm"
            onClick={logout}
          >
            Logout
          </Button>
          <Link href="/delete-account">
            <a href="/delete-account" className="text-red-300 m-8">
              Delete my account
            </a>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Account;
