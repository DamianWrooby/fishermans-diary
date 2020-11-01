import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
import { Formik, Form, Field } from 'formik';
import { fbAuth } from '../services/firebase';

type LoginProps = {
  children: React.ReactNode;
};

const Login: React.FC<LoginProps> = () => {
  return (
    <div className="container h-screen flex justify-center items-center">
      <Button variantColor="green" size="sm" onClick={fbAuth}>
        Button
      </Button>
    </div>
  );
};

export default Login;
