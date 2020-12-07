import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { emailAuth } from '../../services/firebase';

const SignInForm: React.ReactNode = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const showHidden = (): void => {
    setShow(!show);
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email address is invalid!')
      .required('Email address is required!'),
    password: Yup.string()
      .min(8, 'Password is too short!')
      .required('Password is required!')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Min 8 characters, one uppercase, one lowercase, one number and one special case character'
      ),
  });

  return (
    <div className="flex justify-center items-center">
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="8"
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={SignInSchema}
          onSubmit={(values, actions) => {
            emailAuth(values.email, values.password)
              .then((user) => {
                console.log(user);
                router.push('/account');
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
                router.push('/login');
              });
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
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input {...field} id="email" placeholder="email" />
                      <FormErrorMessage mb="5">
                        {props.errors.email}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={form.errors.password && form.touched.password}
                      isRequired
                    >
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder="Enter password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={showHidden}>
                            {show ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage mb="5">
                        {props.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <div className="flex flex-row items-center">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  type="submit"
                  isDisabled={!props.isValid}
                >
                  Sign In
                </Button>
                <a
                  className="mt-4 ml-auto mr-auto text-xs hover:text-gray-400"
                  href="/password-reset"
                >
                  Forgot password?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default SignInForm;