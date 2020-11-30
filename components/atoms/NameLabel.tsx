import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/authContext';

const NameLabel = () => {
  const user = useAuth();

  return <>{user ? <div>{`${user.data.email}`}</div> : null}</>;
};

export default NameLabel;
