import { Button } from '@chakra-ui/react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import SignInForm from '../components/molecules/SignInForm';
import { fbAuth, gAuth } from '../services/firebase';
import Menu from '../components/molecules/Menu';
import { useAuth } from '../contexts/authContext';

type LoginProps = {
  children: React.ReactChildren;
};

const Login: React.FC<LoginProps> = () => {
  const user = useAuth();
  const router = useRouter();

  const fbLogin = () => {
    fbAuth().then(() => {
      router.push('/');
    });
  };
  const gLogin = () => {
    gAuth()
      .then(() => {
        router.push('/');
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <>
      <div className="container h-screen flex flex-col">
        <Menu />
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
    </>
  );
};

export default Login;
