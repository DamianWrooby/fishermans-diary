import Head from 'next/head';
import Link from 'next/link';
// import styles from '../styles/Home.module.css';

type HomeProps = {
  children: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>Fisherman&apos;s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full justify-between flex flex-row">
        <div className="p-2">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/login">
            <a>Login</a>
          </Link>
          <Link href="/account">
            <a>My account</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
