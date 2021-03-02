import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import CatchButton from '../components/catches/CatchButton';
import CatchList from '../components/catches/CatchList';
import en from '../translations/en';
import pl from '../translations/pl';

const Home = (): React.ReactNode => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Layout>
      <Head>
        <title>Fisherman&apos;s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Fishbook - every angler's diary" />
      </Head>
      {user.data ? (
        <>
          <div className="p-5 pt-12 pb-12">
            <h2 className="text-xl p-3">{t.yourlastcatches}</h2>
            <CatchList
              amount={3}
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
            />
            <div className="text-sm dark:hover:text-blue-200 hover:text-blue-500">
              <a href="/catches/my-catches">{t.showall}</a>
            </div>
          </div>
          <div className="p-5 pt-12 pb-12">
            <h2 className="text-xl p-3">{t.fishesrecentlycatchedbysociety}</h2>
            <CatchList
              amount={5}
              features={[
                'image',
                'species',
                'weight',
                'length',
                'date',
                'time',
              ]}
            />
          </div>
          <CatchButton />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center w-full">
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
  );
};

export default Home;
