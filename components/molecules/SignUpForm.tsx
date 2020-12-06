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
import * as Yup from 'yup';
// import { fbAuth, gAuth } from '../services/firebase';
// import Menu from '../components/molecules/Menu';
// import { useAuth } from '../contexts/authContext';

const SignUpForm: React.ReactNode = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const showHidden = (type: string): void => {
    switch (type) {
      case 'password':
        setShow(!show);
        break;
      case 'confirm':
        setShowConfirm(!showConfirm);
        break;
      default:
        console.log('default switch case');
        break;
    }
  };
  // function validateEmail(value) {
  //   let error;
  //   if (!value) {
  //     error = 'Name is required';
  //   }
  //   return error;
  // }

  const SignUpSchema = Yup.object().shape({
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
    confirmPassword: Yup.string()
      .required('Must confirm password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

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
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
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
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => showHidden('password')}
                          >
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
              <Field name="confirmPassword">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={
                        form.errors.confirmPassword &&
                        form.touched.confirmPassword
                      }
                      isRequired
                    >
                      <FormLabel htmlFor="confirmPassword">
                        Confirm password
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          pr="4.5rem"
                          type={showConfirm ? 'text' : 'password'}
                          placeholder="Confirm password"
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => showHidden('confirm')}
                          >
                            {showConfirm ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage mb="5">
                        {props.errors.confirmPassword}
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
