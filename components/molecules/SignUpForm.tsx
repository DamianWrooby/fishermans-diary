import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  FormHelperText,
  Box,
} from '@chakra-ui/react';
import PasswordInput from '../atoms/PasswordInput';
// import { fbAuth, gAuth } from '../services/firebase';
// import Menu from '../components/molecules/Menu';
// import { useAuth } from '../contexts/authContext';

const SignUpForm: React.ReactNode = () => {
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
          initialValues={{ name: 'Sasuke' }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form>
              <Field name="name" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    isRequired
                  >
                    <FormLabel htmlFor="name">First name</FormLabel>
                    <Input mb="5" {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email" validate={validateName}>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    isRequired
                  >
                    <FormLabel htmlFor="email">Email address</FormLabel>
                    <Input mb="5" {...field} id="email" placeholder="email" />
                    <FormErrorMessage>Email is required</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <PasswordInput />
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
