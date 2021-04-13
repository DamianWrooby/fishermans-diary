import { useState } from 'react';
import firebase from 'firebase/app';
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
  Switch,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { SpeciesList } from '../../data/SpeciesList';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

type FormProps = {
  passCoords: Array<Number>;
  closeFormCallback: () => void;
};

const CatchForm = ({ passCoords, closeFormCallback }: FormProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [sending, setSending] = useState(false);
  const t = useLanguage() === 'en' ? en : pl;
  const [sendBtnText, setSendBtnText] = useState(t.addcatch);

  const coords = passCoords;

  const {
    data: { uid, displayName, email, photoURL },
  } = useAuth();

  const now = new Date();
  const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
  const time = `${now.getHours()}:${
    now.getMinutes() < 10 ? '0' : ''
  }${now.getMinutes()}:${now.getSeconds()}`;
  const timeStamp = firebase.firestore.Timestamp.fromDate(new Date()).seconds;

  const uploadBtn = useColorModeValue('#2d3748', 'lightgreen');
  const uploadBtnText = useColorModeValue('white', '#2d3748');

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const handleProgress = (progress: number) => setUploadProgress(progress);

  const handleUploadError = (error) => {
    setIsUploading(false);
    console.log(error);
    setUploadErrorMessage(error.message);
  };

  const handleUploadSuccess = async (filename: string) => {
    setImage(filename);
    setUploadProgress(100);
    setIsUploading(false);

    storage
      .ref('images/catches')
      .child((await filename) + '')
      .getDownloadURL()
      .then((url) => setImageURL(url));
  };

  const submitForm = async (values, actions) => {
    setSending(true);
    try {
      actions.setSubmitting(false);
      console.log(values.species);
      await db.collection('catches').add({
        author_uid: uid,
        author_name: displayName,
        author_email: email,
        author_photo: photoURL,
        date: date,
        time: time,
        timestamp: timeStamp,
        coords: coords,
        species: values.species,
        weight: values.weight,
        length: values.length,
        method: values.method,
        bait: values.bait,
        image: imageURL,
        private: values.private,
      });
      setSendBtnText(t.success);
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
    <div className="flex justify-center items-center w-full h-full capitalize">
      <Box overflow="hidden" width="full" p="8" pt="2">
        <Formik
          initialValues={{
            species: '',
            weight: undefined,
            length: undefined,
            method: '',
            bait: '',
            private: false,
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
                        {t.species}
                      </FormLabel>
                      <Select size="sm" placeholder={t.selectoption} {...field}>
                        {SpeciesList.sort().map((el) => {
                          const escapedSpecies = el.replace(' ', '');
                          return (
                            <option key={el} value={el}>
                              {t[escapedSpecies]}
                            </option>
                          );
                        })}
                        ;
                      </Select>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <div className="flex flex-row justify-between">
                <Field name="weight">
                  {({ field, form }) => (
                    <Box w="45%" mb="5">
                      <FormControl
                        isInvalid={form.errors.weight && form.touched.weight}
                        isRequired
                      >
                        <FormLabel mb="1" htmlFor="weight">
                          {[t.weight]} <span className="lowercase">(kg)</span>
                        </FormLabel>
                        <NumberInput
                          size="sm"
                          {...field}
                          onChange={(val) =>
                            form.setFieldValue(field.name, val)
                          }
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
                        <FormErrorMessage>
                          {props.errors.weight}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  )}
                </Field>
                <Field name="length">
                  {({ field, form }) => (
                    <Box w="45%" mb="5">
                      <FormControl
                        isInvalid={form.errors.length && form.touched.length}
                        isRequired
                      >
                        <FormLabel mb="1" htmlFor="length">
                          {t.length} <span className="lowercase">(cm)</span>
                        </FormLabel>
                        <NumberInput
                          size="sm"
                          {...field}
                          onChange={(val) =>
                            form.setFieldValue(field.name, val)
                          }
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
                        <FormErrorMessage>
                          {props.errors.length}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  )}
                </Field>
              </div>
              <Field name="method">
                {({ field, form }) => (
                  <Box mb="5">
                    <FormControl isRequired>
                      <FormLabel mb="1" htmlFor="method">
                        {t.method}
                      </FormLabel>
                      <Select size="sm" placeholder={t.selectoption} {...field}>
                        <option value="spinning">{t.spinning}</option>
                        <option value="bottom">{t.bottom}</option>
                        <option value="trolling">{t.trolling}</option>
                        <option value="float">{t.float}</option>
                        <option value="fly">{t.fly}</option>
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
                        {t.bait}
                      </FormLabel>
                      <Input
                        size="sm"
                        {...field}
                        id="bait"
                        placeholder={t.bait_cap}
                      />
                      <FormErrorMessage mb="5">
                        {props.errors.bait}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                )}
              </Field>
              <Field name="private">
                {({ field, form }) => (
                  <FormControl display="flex" alignItems="center">
                    <FormLabel htmlFor="private" mb="0">
                      {t.private}
                    </FormLabel>
                    <Switch id="private" {...field} />
                  </FormControl>
                )}
              </Field>
              <div className="flex flex-row items-end justify-end">
                {isUploading && (
                  <div className="relative left-20 -top-8">
                    <p className="text-xs">
                      {t.uploading}: {uploadProgress}%
                    </p>
                  </div>
                )}
                <CustomUploadButton
                  randomizeFilename
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
                  {t.addpicture}
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
                isDisabled={!props.isValid || sending || isUploading}
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
