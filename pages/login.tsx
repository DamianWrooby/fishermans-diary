import { Button } from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import SignInForm from '../components/molecules/SignInForm';
import { fbAuth, gAuth } from '../services/firebase';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';

const Login = (): JSX.Element => {
  const user = useAuth();
  const router = useRouter();

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
      <div className="py-16 flex flex-col">
        <div className="w-full h-full flex flex-col justify-center items-center">
          {user.data ? (
            <p>You're logged in.</p>
          ) : (
            <>
              <SignInForm />
              <div className="p-4 flex flex-col">
                <p className="m-auto p-4">OR</p>
                <Button
                  className="min-w-full m-2"
                  colorScheme="facebook"
                  leftIcon={<FaFacebook />}
                  size="sm"
                  onClick={fbLogin}
                >
                  Login with Facebook
                </Button>
                <Button
                  className="min-w-full m-2"
                  colorScheme="orange"
                  leftIcon={<FaGoogle />}
                  size="sm"
                  onClick={gLogin}
                >
                  Login with Google
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
