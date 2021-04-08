import { useState } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SignInForm from '../components/forms/SignInForm';
import { fbAuth, gAuth } from '../services/firebase';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import en from '../translations/en';
import pl from '../translations/pl';
import ErrorDialog from '../components/partials/ErrorDialog';

const Login = () => {
  const user = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [lastLoginAttempt, setlastLoginAttempt] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  const fbLogin = (): void => {
    setlastLoginAttempt('facebook');
    fbAuth()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setError(error);
        onOpen();
      });
  };
  const gLogin = (): void => {
    setlastLoginAttempt('google');
    gAuth()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        setError(error);
        onOpen();
      });
  };
  const logAgain = (): void => {
    if (lastLoginAttempt === 'facebook') {
      fbLogin();
    } else if (lastLoginAttempt === 'google') {
      gLogin();
    }
  };

  return (
    <Layout>
      <Head>
        <title>{t.signinandcatchyourprfishfishbook}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={t.logindescription} />
      </Head>
      <div className="pt-24 sm:pt-16 -mb-20 flex flex-col">
        <div className="w-full h-full flex flex-col justify-center items-center">
          {user.isAuthenticated ? (
            <p>{t.youreloggedin}</p>
          ) : (
            <>
              <SignInForm />
              <div className="p-4 flex flex-col z-10">
                <p className="m-auto p-4">{t.or}</p>
                <Button
                  className="min-w-full m-2"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  size="sm"
                  onClick={fbLogin}
                >
                  {t.loginwithfacebook}
                </Button>
                <Button
                  className="min-w-full m-2 z-10"
                  colorScheme="orange"
                  leftIcon={<FaGoogle />}
                  size="sm"
                  onClick={gLogin}
                >
                  {t.loginwithgoogle}
                </Button>
                <ErrorDialog
                  handleIsOpen={isOpen}
                  handleOnClose={onClose}
                  handleAction={logAgain}
                  text={t.loginerror}
                  buttonText={t.tryagain}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
