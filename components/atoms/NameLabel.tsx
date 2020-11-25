import { useEffect } from 'react';
import { Button } from '@chakra-ui/react';
import { useUser } from '../../contexts/userContext';

const NameLabel = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return <>{user ? <div>{`${user.email}`}</div> : null}</>;
};

export default NameLabel;
