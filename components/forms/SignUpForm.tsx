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

import { createUser } from '../../services/firebase';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

const SignUpForm = () => {
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const t = useLanguage() === 'en' ? en : pl;

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
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={SignUpSchema}
          onSubmit={(values, actions) => {
            createUser(values.email, values.password)
              .then((user) => {
                console.log(user);
                router.push('/account');
              })
              .catch((error) => {
                setErrorMessage(error.code + error.message);
                router.push('/create-account');
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
                      <FormLabel htmlFor="email">{t.email}</FormLabel>
                      <Input {...field} id="email" placeholder={t.enteremail} />
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
                      <FormLabel htmlFor="password">{t.password}</FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          pr="4.5rem"
                          type={show ? 'text' : 'password'}
                          placeholder={t.enterpassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => showHidden('password')}
                          >
                            {show ? t.hide : t.show}
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
                        {t.confirmpassword}
                      </FormLabel>
                      <InputGroup size="md">
                        <Input
                          {...field}
                          pr="4.5rem"
                          type={showConfirm ? 'text' : 'password'}
                          placeholder={t.confirmpassword}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={() => showHidden('confirm')}
                          >
                            {showConfirm ? t.hide : t.show}
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
                {t.createaccount}
              </Button>
            </Form>
          )}
        </Formik>
        {errorMessage ? (
          <Box mt="5" color="red.500">
            {errorMessage}
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default SignUpForm;
