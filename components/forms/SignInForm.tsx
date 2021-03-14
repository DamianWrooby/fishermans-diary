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
import en from '../../translations/en';
import pl from '../../translations/pl';

const SignInForm = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  const showHidden = (): void => {
    setShow(!show);
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email address is invalid!')
      .required('Email address is required!'),
    password: Yup.string().required('Password is required!'),
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
                router.push('/');
              })
              .catch((error) => {
                setErrorMessage(error.code + error.message);
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
                  {t.signin}
                </Button>
                <a
                  className="mt-4 ml-auto mr-auto text-xs hover:text-gray-400"
                  href="/password-reset"
                >
                  {t.forgotpassword}
                </a>
              </div>
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

export default SignInForm;
