import Head from 'next/head';
// import styles from '../styles/Home.module.css';

type HomeProps = {
  children: React.ReactNode;
};

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full justify-between flex flex-row">
        <p>Lorem ipsum</p>
        <p>Lorem ipsum 2</p>
      </div>
    </>
  );
};

export default Home;
