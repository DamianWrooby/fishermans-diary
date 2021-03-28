import { Button } from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Head from 'next/head';
import SignInForm from '../components/forms/SignInForm';
import { fbAuth, gAuth } from '../services/firebase';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import en from '../translations/en';
import pl from '../translations/pl';

const Login = () => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  const fbLogin = () => {
    fbAuth()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        alert(error);
      });
  };
  const gLogin = () => {
    gAuth()
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        alert(error);
      });
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
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
