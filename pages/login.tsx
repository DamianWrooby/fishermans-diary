import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
// import { Formik, Form, Field } from 'formik';
import { fbAuth, fbSignOut } from '../services/firebase';

type LoginProps = {
  children: React.ReactNode;
};

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="container h-screen flex justify-center items-center">
      <Button variantColor="blue" size="sm" onClick={fbAuth}>
        Login with Facebook
      </Button>
      <Button variantColor="blue" size="sm" onClick={fbSignOut}>
        Logout
      </Button>
    </div>
  );
};

export default Login;
