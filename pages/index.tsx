import { useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Menu from '../components/molecules/Menu';
import { useAuth } from '../contexts/authContext';
import CatchButton from '../components/molecules/CatchButton';

const Home = (): React.ReactNode => {
  const user = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="h-screen">
      <Head>
        <title>Fisherman&apos;s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu />
      {user.data ? (
        <>
          <div className="pt-12">
            <p>Recent catches</p>
          </div>
          <CatchButton />
        </>
      ) : (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">You have to sign in.</p>
          <Link href="/login">
            <a href="/login" className="p-2">
              <Button colorScheme="blue" size="sm">
                Sign in
              </Button>
            </a>
          </Link>
          <Link href="/create-account">
            <a href="/create-account" className="p-2">
              <Button
                rightIcon={<FaArrowRight />}
                colorScheme="blue"
                variant="outline"
                size="sm"
              >
                Create account
              </Button>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
