import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';
import { signOut } from '../services/firebase';
import Layout from '../layouts/layout';
import useLanguage from '../hooks/useLanguage';
import en from '../translations/en';
import pl from '../translations/pl';

const Account: React.FC<React.ReactNode> = () => {
  const user = useAuth();
  const router = useRouter();
  const t = useLanguage() === 'en' ? en : pl;

  const redirect = (): void => {
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
  }, [user]);

  return (
    <Layout>
      {user.data ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="p-2">{`${t.welcome} ${
            user.data.displayName ? user.data.displayName : user.data.email
          }`}</p>
          <Button
            className="p-4 m-4"
            colorScheme="blue"
            size="sm"
            onClick={logout}
          >
            {t.logout}
          </Button>
          <Link href="/delete-account">
            <a href="/delete-account" className="text-red-300 m-8">
              {t.deletemyaccount}
            </a>
          </Link>
        </div>
      ) : null}
    </Layout>
  );
};

export default Account;
