import { useEffect } from 'react';
import { useUser } from '../contexts/userContext';

type AccountProps = {
  children: React.ReactNode;
};

const Account: React.FC<AccountProps> = () => {
  const user = useUser();

  useEffect(() => {
    console.log(user);
  }, []);

  return <>{user ? <div>{`Welcome ${user.email}`}</div> : null}</>;
};

export default Account;
