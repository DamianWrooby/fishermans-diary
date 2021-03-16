import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '../../layouts/layout';
import { useAuth } from '../../contexts/authContext';
import CatchButton from '../../components/catches/CatchButton';
import CatchList from '../../components/catches/CatchList';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

const Home = (): React.ReactNode => {
  const user = useAuth();
  const t = useLanguage() === 'en' ? en : pl;

  return (
    <div className="h-screen">
      <Layout>
        {user.isAuthenticated ? (
          <>
            <div className="p-5 pt-12">
              <h1 className="p-3 text-xl">{t.allyourcatches}</h1>
              <CatchList
                features={[
                  'image',
                  'species',
                  'weight',
                  'length',
                  'method',
                  'bait',
                  'date',
                  'time',
                ]}
                pagination={true}
              />
            </div>
            <CatchButton />
          </>
        ) : (
          <div className="container flex flex-col justify-center items-center h-screen">
            <p className="p-2">{t.youhavetosignin}</p>
            <Link href="/login">
              <a href="/login" className="p-2">
                <Button colorScheme="blue" size="sm">
                  {t.signin}
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
                  {t.createaccount}
                </Button>
              </a>
            </Link>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Home;
