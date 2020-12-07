import { useState } from 'react';
import Link from 'next/link';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Box,
} from '@chakra-ui/react';
import { resetPassword } from '../services/firebase';

// DODAĆ SPINNER NA PRZYCISKU PODCZAS WYSYŁANIA

const PasswordReset = () => {
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const passwordResetSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email address is invalid!')
      .required('Email address is required!'),
  });

  const sendResetEmail = (email) => {
    resetPassword(email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {
          setEmailHasBeenSent(false);
        }, 3000);
      })
      .catch(() => {
        setError('Error resetting password');
      });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="8"
      >
        <h1 className="text-xl text-center font-bold mb-3">
          Reset your Password
        </h1>
        {emailHasBeenSent && (
          <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
            An email has been sent to you!
          </div>
        )}
        {error !== null && (
          <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}

        <Formik
          initialValues={{ email: '' }}
          validationSchema={passwordResetSchema}
          onSubmit={(values, actions) => {
            sendResetEmail(values.email);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                      isRequired
                    >
                      <FormLabel htmlFor="email">Your email</FormLabel>
                      <Input {...field} id="email" placeholder="email" />
                      <FormErrorMessage mb="5">
                        {props.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
                isDisabled={!props.isValid}
              >
                Send me a reset link
              </Button>
            </Form>
          )}
        </Formik>
        <Link href="/" passHref>
          <a className="my-2 hover:text-blue-800 text-center block">
            &larr; back to sign in page
          </a>
        </Link>
      </Box>
    </div>
  );
};
export default PasswordReset;
