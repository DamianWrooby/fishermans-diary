import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

import { Button } from '@chakra-ui/react';
import { FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollection } from '@nandorojo/swr-firestore';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useColorModeValue } from '@chakra-ui/react';

import Layout from '../../layouts/layout';
import { useAuth } from '../../contexts/authContext';
import CatchButton from '../../components/catches/CatchButton';
import CatchList from '../../components/catches/CatchList';
import CatchMap from '../../components/catches/CatchMap';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';
import Loader from '../../components/partials/Loader';
import { CatchTypes } from '../../components/catches/CatchList';

const User = () => {
  const t = useLanguage() === 'en' ? en : pl;
  const user = useAuth();
  const router = useRouter();
  const { id } = router.query;
  let content, userInfo;
  const skeletonColor = useColorModeValue('#b1b1b1', '#242c3c');
  const skeletonHighlightColor = useColorModeValue('#b9b9b9', '#2a3346');
  const { data, error } = useCollection<CatchTypes>(`catches`, {
    where: [
      ['author_uid', '==', id],
      ['private', '==', false],
    ],
    limit: 1,
    listen: true,
  });

  if (data) {
    userInfo = data[0].author_photo ? (
      <div className="flex flex-row justify-center items-center">
        <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
          <img src={data[0].author_photo} />
        </div>
        <div className="mr-2">
          {data[0].author_name ? data[0].author_name : data[0].author_email}
        </div>
      </div>
    ) : (
      <div className="flex flex-row justify-center items-center">
        <div className="p-1 w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
          <img src="/user.svg" />
        </div>
        <div className="mr-2">
          {data[0].author_name ? data[0].author_name : data[0].author_email}
        </div>
      </div>
    );
  } else {
    userInfo = (
      <SkeletonTheme
        color={skeletonColor}
        highlightColor={skeletonHighlightColor}
      >
        <Skeleton count={1} height={100} />
      </SkeletonTheme>
    );
  }

  if (user.isAuthenticated && !user.loading) {
    content = (
      <>
        <div className="p-5 pt-20 sm:pt-12">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -100, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 0 }}
              className="p-3 text-md sm:text-xl text-center"
            >
              {userInfo}
            </motion.div>
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
            userID={id}
            pagination={true}
            paginationAmount={5}
            personal={false}
          />
          <CatchMap userID={id} />
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
          <title>{t.userpage} - Fisherman&apos;s Diary</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Fisherman's Diary - every angler's diary"
          />
        </Head>
        {content}
      </Layout>
    </div>
  );
};

export default User;
