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
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';

const MyCatches = (): React.ReactNode => {
  const user = useAuth();
  const t = useLanguage() === 'en' ? en : pl;
  const skeletonColor = useColorModeValue('#b1b1b1', '#242c3c');
  const skeletonHighlightColor = useColorModeValue('#b9b9b9', '#2a3346');

  let loggedContent;
  if (user.isAuthenticated && !user.loading) {
    loggedContent = (
      <>
        <div className="p-5 pt-12">
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
          />
        </div>
        <CatchButton />
      </>
    );
  } else if (!user.isAuthenticated && user.loading) {
    loggedContent = (
      <div className="w-1/2 h-screen">
        <SkeletonTheme
          color={skeletonColor}
          highlightColor={skeletonHighlightColor}
        >
          <Skeleton count={1} />
        </SkeletonTheme>
      </div>
    );
  } else if (!user.isAuthenticated && !user.loading) {
    loggedContent = (
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
      <Layout>{loggedContent}</Layout>
    </div>
  );
};

export default MyCatches;
