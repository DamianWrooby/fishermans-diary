import { useEffect } from 'react';
import Head from 'next/head';
import { Button } from '@chakra-ui/core';
import Link from 'next/link';
import Menu from '../components/Menu';
import { useAuth } from '../contexts/authContext';
// import styles from '../styles/Home.module.css';

type HomeProps = {
  children: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  const user = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Head>
        <title>Fisherman&apos;s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Menu />
      {user.user ? (
        <div>MAPA</div>
      ) : (
        <div className="container flex flex-col justify-center items-center h-screen">
          <p className="p-2">You have to sign in.</p>
          <Link href="/login">
            <a className="p-2">
              <Button variantColor="blue" size="sm">
                Sign in
              </Button>
            </a>
          </Link>
          <Link href="/">
            <a className="p-2">
              <Button
                rightIcon="arrow-forward"
                variantColor="blue"
                variant="outline"
                size="sm"
              >
                Create account
              </Button>
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Home;
