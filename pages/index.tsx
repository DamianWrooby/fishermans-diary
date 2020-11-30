import { useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Menu from '../components/molecules/Menu';
import { useAuth } from '../contexts/authContext';
import AddCatch from '../components/molecules/AddCatch';
// import styles from '../styles/Home.module.css';

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
      {user ? (
        <>
          <p>Recent catches</p>
          <AddCatch />
        </>
      ) : (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">You have to sign in.</p>
          <Link href="/login">
            <a className="p-2">
              <Button colorScheme="blue" size="sm">
                Sign in
              </Button>
            </a>
          </Link>
          <Link href="/">
            <a className="p-2">
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
