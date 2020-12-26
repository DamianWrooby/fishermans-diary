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
  Select,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';

const CatchForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');

  const CatchFormSchema = Yup.object().shape({
    species: Yup.string()
      .min(2, 'Species is too short!')
      .required('Species is required!'),
    weight: Yup.number()
      .max(2, 'max 2')
      .positive('Weight should be positive number!')
      .required('Weight is required!'),
    length: Yup.number()
      .positive('Length should be positive number!')
      .required('Length is required!'),
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Box overflow="hidden" width="full" p="8">
        <Formik
          initialValues={{
            species: '',
            weight: undefined,
            length: undefined,
          }}
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
                      <Input {...field} id="species" placeholder="Species" />
                      <FormErrorMessage mb="5">
                        {props.errors.species}
                      </FormErrorMessage>
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
                      <NumberInput
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        id="weight"
                        defaultValue={0}
                        precision={3}
                        step={0.1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage mb="5">
                        {props.errors.weight}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="length">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isInvalid={form.errors.length && form.touched.length}
                      isRequired
                    >
                      <FormLabel htmlFor="length">Length (cm)</FormLabel>
                      <NumberInput
                        {...field}
                        onChange={(val) => form.setFieldValue(field.name, val)}
                        id="length"
                        defaultValue={0}
                        precision={0}
                        step={1}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                      <FormErrorMessage mb="5">
                        {props.errors.length}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="method">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl isRequired>
                      <FormLabel htmlFor="method">Method</FormLabel>
                      <Select {...field}>
                        <option value="spinning">Spinning</option>
                        <option value="bottom">Bottom</option>
                        <option value="trolling">Trolling</option>
                        <option value="float">Float</option>
                        <option value="fly">Fly</option>
                      </Select>
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
