import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { useAuth } from '../../contexts/authContext';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import { storage } from '../../services/firebase';
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

type FormProps = {
  passCoords: Array<Number>;
  closeFormCallback: () => void;
};

const CatchForm = ({
  passCoords,
  closeFormCallback,
}: FormProps): JSX.Element => {
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendBtnText, setSendBtnText] = useState('Add Catch');

  const coords = passCoords;

  const {
    data: { uid },
  } = useAuth();

  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

  const uploadBtn = useColorModeValue('#2d3748', 'lightgreen');
  const uploadBtnText = useColorModeValue('white', '#2d3748');

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };
  const handleProgress = (progress: number) => setUploadProgress(progress);
  const handleUploadError = (error) => {
    setIsUploading(false);
    setUploadErrorMessage(error);
  };
  const handleUploadSuccess = (filename: string) => {
    setImage(filename);
    setUploadProgress(100);
    setIsUploading(false);
    storage
      .ref('images/catches')
      .child(filename)
      .getDownloadURL()
      .then((url) => setImageURL(url));
  };

  const submitForm = async (values, actions) => {
    setSending(true);
    try {
      actions.setSubmitting(false);
      console.log(coords);
      await db.collection('catches').add({
        author_uid: uid,
        date: date,
        coords: coords,
        species: values.species,
        weight: values.weight,
        length: values.length,
        method: values.method,
        image: imageURL,
      });
      setSendBtnText('Success');
      window.setTimeout(() => {
        setSendBtnText('Add Catch');
        closeFormCallback();
      }, 1000);
    } catch (err) {
      console.log(err);
      setSendBtnText('Error');
      window.setTimeout(() => {
        setSendBtnText('Add Catch');
        closeFormCallback();
      }, 1000);
    }
    setSending(false);
    actions.resetForm({});
  };

  const CatchFormSchema = Yup.object().shape({
    weight: Yup.number()
      .max(2, 'max 2')
      .positive('Weight should be positive number!')
      .required('Weight is required!'),
    length: Yup.number()
      .positive('Length should be positive number!')
      .required('Length is required!'),
    bait: Yup.string()
      .min(2, 'Bait should have min 2 characters')
      .required('Bait is required'),
  });

  return (
    <div className="flex justify-center items-center w-full h-full">
      <Box overflow="hidden" width="full" p="8" pt="2">
        <Formik
          initialValues={{
            species: '',
            weight: undefined,
            length: undefined,
            method: '',
            bait: '',
          }}
          validationSchema={CatchFormSchema}
          onSubmit={submitForm}
        >
          {(props) => (
            <Form>
              <Field name="species">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl isRequired>
                      <FormLabel mb="1" htmlFor="species">
                        Species
                      </FormLabel>
                      <Select size="sm" placeholder="Select option" {...field}>
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
                      <FormLabel mb="1" htmlFor="weight">
                        Weight (kg)
                      </FormLabel>
                      <NumberInput
                        size="sm"
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
                      <FormLabel mb="1" htmlFor="length">
                        Length (cm)
                      </FormLabel>
                      <NumberInput
                        size="sm"
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
                      <FormLabel mb="1" htmlFor="method">
                        Method
                      </FormLabel>
                      <Select size="sm" placeholder="Select option" {...field}>
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
              <Field name="bait">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl
                      isRequired
                      isInvalid={form.errors.bait && form.touched.bait}
                    >
                      <FormLabel mb="1" htmlFor="bait">
                        Bait
                      </FormLabel>
                      <Input
                        size="sm"
                        {...field}
                        id="bait"
                        placeholder="Bait"
                      />
                      <FormErrorMessage mb="5">
                        {props.errors.bait}
                      </FormErrorMessage>
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
                isLoading={sending}
                mt={4}
                colorScheme="teal"
                type="submit"
                isDisabled={!props.isValid || sending}
              >
                {sendBtnText}
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
