import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../contexts/authContext';
import { deleteUser } from '../services/firebase';
import Layout from '../layouts/layout';
import useLanguage from '../hooks/useLanguage';
import en from '../translations/en';
import pl from '../translations/pl';

const DeleteAccount = () => {
  const user = useAuth();
  const router = useRouter();
  const t = useLanguage() === 'en' ? en : pl;

  const redirect = () => {
    console.log('redirection');
    router.push('/login');
  };

  const handleUserDelete = () => {
    deleteUser();
    redirect();
  };

  useEffect(() => {
    user.data ? null : redirect();
  }, []);

  return (
    <Layout>
      {user.isAuthenticated ? (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">{t.areyousure}</p>
          <Button
            className="p-4 m-4"
            colorScheme="red"
            size="sm"
            onClick={handleUserDelete}
          >
            {t.deletemyaccount}
          </Button>
        </div>
      ) : null}
    </Layout>
  );
};

export default DeleteAccount;
