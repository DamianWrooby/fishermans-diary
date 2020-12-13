import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  Button,
  InputGroup,
  InputRightElement,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';

const CatchForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const CatchFormSchema = Yup.object().shape({
    species: Yup.string()
      .min(2, 'Species is too short!')
      .required('Species is required!'),
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
          initialValues={{}}
          validationSchema={CatchFormSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="species">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={form.errors.species && form.touched.species}
                      isRequired
                    >
                      <FormLabel htmlFor="species">Species</FormLabel>
                      <Input {...field} id="species" placeholder="species" />
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="weight">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={form.errors.weight && form.touched.weight}
                      isRequired
                    >
                      <FormLabel htmlFor="weight">Weight (kg)</FormLabel>
                      <NumberInput defaultValue={0} precision={3} step={0.1}>
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
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
                Add Catch
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

export default CatchForm;
