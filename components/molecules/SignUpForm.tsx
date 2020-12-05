import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Box,
} from '@chakra-ui/react';
// import { fbAuth, gAuth } from '../services/firebase';
// import Menu from '../components/molecules/Menu';
// import { useAuth } from '../contexts/authContext';

const SignUpForm: React.ReactNode = () => {
  const [show, setShow] = useState(false);
  const showPassword = () => setShow(!show);

  function validateName(value) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Box
        maxW="md"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="8"
      >
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="email" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    isRequired
                  >
                    <Box mb="5">
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Input {...field} id="email" placeholder="email" />
                      <FormErrorMessage mb="5">
                        Email is required
                      </FormErrorMessage>
                    </Box>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, form }) => (
                  <FormControl isRequired>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        {...field}
                        pr="4.5rem"
                        type={show ? 'text' : 'password'}
                        placeholder="Enter password"
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={showPassword}>
                          {show ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Create account
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default SignUpForm;
