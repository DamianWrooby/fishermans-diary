import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { auth } from '../services/firebase';
// import styles from '../styles/Home.module.css';

type HomeProps = {
  children: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  useEffect(() => {
    const setUser = (user) => {
      if (user) {
        // setUser in UserContext
      }
    };
    const unsubscribe = auth().onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Fisherman`&apos`s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full justify-between flex flex-row">
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
