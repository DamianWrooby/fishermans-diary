import Head from 'next/head';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Layout from '../../layouts/layout';
import { useAuth } from '../../contexts/authContext';
import CatchButton from '../../components/catches/CatchButton';
import CatchList from '../../components/catches/CatchList';
import CatchMap from '../../components/catches/CatchMap';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../../components/partials/Loader';

const MyCatches = () => {
  const t = useLanguage() === 'en' ? en : pl;
  const user = useAuth();

  let content;

  if (user.isAuthenticated && !user.loading) {
    content = (
      <>
        <div className="p-5 pt-20 sm:pt-12">
          <AnimatePresence>
            <motion.h1
              initial={{ opacity: 0, x: -100, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 0 }}
              className="p-3 text-md sm:text-xl text-center"
            >
              {t.allyourcatches}
            </motion.h1>
          </AnimatePresence>
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
            userID={user.data.uid}
            pagination={true}
            personal={true}
          />
          <CatchMap userID={user.data.uid} />
        </div>
        <CatchButton />
      </>
    );
  } else if (!user.isAuthenticated && user.loading) {
    content = (
      <div className="w-24 m-auto fill-current	text-blue-200">
        <Loader />
      </div>
    );
  } else if (!user.isAuthenticated && !user.loading) {
    content = (
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
    );
  }

  return (
    <div className="h-screen">
      <Layout>
        <Head>
          <title>{t.mycatches} - Fisherman&apos;s Diary</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Fishbook - every angler's diary" />
        </Head>
        {content}
      </Layout>
    </div>
  );
};

export default MyCatches;
