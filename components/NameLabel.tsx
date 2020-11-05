import { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
} from '@chakra-ui/core';
import { useUser } from '../context/userContext';

const NameLabel = () => {
  const { name, age } = useUser();
  useEffect(() => {
    console.log(name.value);
  }, [name]);
  return (
    <>
      <Button
        variantColor="blue"
        size="sm"
        onClick={() => {
          name.changeName('Adam');
        }}
      >
        Set name
      </Button>
      <div>{name.value}</div>
    </>
  );
};

export default NameLabel;
