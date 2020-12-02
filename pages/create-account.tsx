import { Button } from '@chakra-ui/react';
import SignUpForm from '../components/molecules/SignUpForm';
// import { Formik, Form, Field } from 'formik';
import { fbAuth, gAuth } from '../services/firebase';
import Menu from '../components/molecules/Menu';
import { useAuth } from '../contexts/authContext';

const CreateAccount: React.ReactNode = () => {
  const user = useAuth();

  return (
    <>
      <Menu />
      <SignUpForm />
    </>
  );
};

export default CreateAccount;
