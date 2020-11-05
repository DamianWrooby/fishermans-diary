import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
// import { Formik, Form, Field } from 'formik';
import { useContext, useState } from 'react';
import { fbAuth, fbSignOut } from '../services/firebase';
import { UserProvider, useUser } from '../context/userContext';
import NameLabel from '../components/NameLabel';

type LoginProps = {
  children: React.ReactNode;
};

const Login: React.FC<LoginProps> = () => {
  return (
    <UserProvider>
      <div className="container h-screen flex justify-center items-center">
        <Button variantColor="blue" size="sm" onClick={fbAuth}>
          Login with Facebook
        </Button>
        <Button variantColor="blue" size="sm" onClick={fbSignOut}>
          Logout
        </Button>
        <NameLabel />
      </div>
    </UserProvider>
  );
};

export default Login;
