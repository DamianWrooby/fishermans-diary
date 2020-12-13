import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Menu from '../../components/molecules/Menu';
import CatchMap from '../../components/molecules/CatchMap';
import CatchForm from '../../components/molecules/CatchForm';
import { useAuth } from '../../contexts/authContext';

const AddCatch = (): React.ReactNode => {
  const user = useAuth();
  const router = useRouter();

  const redirect = (): void => {
    router.push('/login');
  };

  return (
    <div className="h-screen">
      <Menu />
      {user.isAuthenticated ? (
        <>
          <CatchMap />
          <CatchForm />
        </>
      ) : (
        <p>
          You're not logged in. Go to the{' '}
          <Link href="/login">
            <a href="/login" className="text-blue-300 hover:text-blue-500">
              Login page
            </a>
          </Link>
          .
        </p>
      )}
    </div>
  );
};

export default AddCatch;
