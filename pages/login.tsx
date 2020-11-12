import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
// import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { fbAuth } from '../services/firebase';
import NameLabel from '../components/NameLabel';
import Menu from '../components/Menu';
import { useAuth } from '../contexts/authContext';

type LoginProps = {
  children: React.ReactNode;
};

const Login: React.FC<LoginProps> = () => {
  const user = useAuth();
  const router = useRouter();

  const login = () => {
    fbAuth();
    router.push('/account');
  };

  return (
    <>
      <div className="container h-screen flex flex-col">
        <Menu />
        <div className="w-full h-full flex flex-col justify-center items-center">
          {user.user ? (
            <p>You're logged in.</p>
          ) : (
            <>
              <Button variantColor="blue" size="sm" onClick={login}>
                Login with Facebook
              </Button>
              <NameLabel />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
