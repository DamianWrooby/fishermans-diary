import { Button } from '@chakra-ui/react';
import { FaFacebook } from 'react-icons/fa';
// import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { fbAuth } from '../services/firebase';
import NameLabel from '../components/atoms/NameLabel';
import Menu from '../components/molecules/Menu';
import { useAuth } from '../contexts/authContext';

type LoginProps = {
  children: React.ReactChildren;
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
          {user.data ? (
            <p>You're logged in.</p>
          ) : (
            <>
              <Button
                colorScheme="facebook"
                leftIcon={<FaFacebook />}
                size="sm"
                onClick={login}
              >
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
