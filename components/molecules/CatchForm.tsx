import { useState } from 'react';
import { useRouter } from 'next/router';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
// import { storage } from '../../services/firebase';
import firebase from 'firebase/app';
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

const storage = firebase.storage();

const CatchForm = (): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const uploadBtn = useColorModeValue('#2d3748', 'lightgreen');
  const uploadBtnText = useColorModeValue('white', '#2d3748');

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };
  const handleProgress = (progress) => setUploadProgress(progress);
  const handleUploadError = (error) => {
    setIsUploading(false);
    setUploadErrorMessage(error);
  };
  const handleUploadSuccess = async (filename) => {
    const name = await filename;
    setImage(name);
    setUploadProgress(100);
    setIsUploading(false);
    storage
      .ref('images/catches')
      .child(name)
      .getDownloadURL()
      .then((url) => setImageURL(url));
  };

  const CatchFormSchema = Yup.object().shape({
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
      <Box overflow="hidden" width="full" p="8" pt="2">
        <Formik
          initialValues={{
            species: '',
            weight: undefined,
            length: undefined,
          }}
          validationSchema={CatchFormSchema}
          onSubmit={(values, actions) => {
            console.log({ ...values, imageURL });
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <Field name="species">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isRequired
                      isInvalid={form.errors.species && form.touched.species}
                    >
                      <FormLabel htmlFor="species">Species</FormLabel>
                      <Select {...field}>
                        <option value="perch">Perch</option>
                        <option value="carp">Carp</option>
                      </Select>
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
              <div className="flex flex-row items-end justify-end">
                {isUploading && (
                  <div className="relative left-20 -top-8">
                    <p className="text-xs">Uploading: {uploadProgress}</p>
                  </div>
                )}
                <CustomUploadButton
                  accept="image/*"
                  storageRef={storage.ref('images/catches')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                  style={{
                    backgroundColor: uploadBtn,
                    fontSize: '0.8rem',
                    color: uploadBtnText,
                    padding: 6,
                    marginRight: '20px',
                    borderRadius: 7,
                    lineHeight: '1.2',
                    cursor: 'pointer',
                  }}
                >
                  Add Picture
                </CustomUploadButton>
                {imageURL ? (
                  <div className="w-16 h-16 rounded">
                    <img src={imageURL} />
                  </div>
                ) : (
                  <div className="w-16 h-16 border border-gray200 rounded"></div>
                )}
              </div>
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
        {uploadErrorMessage ? (
          <Box mt="5" color="red.500">
            {uploadErrorMessage}
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default CatchForm;
