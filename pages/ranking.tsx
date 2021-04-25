import { useState } from 'react';
import Head from 'next/head';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import CatchButton from '../components/catches/CatchButton';
import CatchList from '../components/catches/CatchList';
import useLanguage from '../hooks/useLanguage';
import en from '../translations/en';
import pl from '../translations/pl';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/partials/Loader';
import NoUserLinks from '../components/partials/NoUserLinks';

const Ranking = () => {
  const [speciesFilter, setSpeciesFilter] = useState('');
  const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;
  const user = useAuth();

  let content: JSX.Element | null;
  let list: JSX.Element | null;

  const handleFilter = (index) => {
    setSpeciesFilter(index);
  };

  list = (
    <CatchList
      features={['image', 'species', 'weight', 'length', 'date', 'author_name']}
      personal={false}
      sortBy="-length"
      species={speciesFilter}
      amount={5}
    />
  );

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
              {t.largestfish}
            </motion.h1>
          </AnimatePresence>
          <div className="p-3 text-md text-center">
            <span
              onClick={() => handleFilter('')}
              className={
                speciesFilter === ''
                  ? 'cursor-pointer  text-blue-600 dark:text-white'
                  : 'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
              }
            >
              {t.allspecies}
            </span>{' '}
            /{' '}
            <span
              onClick={() => handleFilter('carp')}
              className={
                speciesFilter === 'carp'
                  ? 'cursor-pointer  text-blue-600 dark:text-white'
                  : 'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
              }
            >
              {t.carp}
            </span>{' '}
            /{' '}
            <span
              onClick={() => handleFilter('perch')}
              className={
                speciesFilter === 'perch'
                  ? 'cursor-pointer  text-blue-600 dark:text-white'
                  : 'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
              }
            >
              {t.perch}
            </span>{' '}
            /{' '}
            <span
              onClick={() => handleFilter('pike')}
              className={
                speciesFilter === 'pike'
                  ? 'cursor-pointer  text-blue-600 dark:text-white'
                  : 'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
              }
            >
              {t.pike}
            </span>{' '}
            /{' '}
            <span
              onClick={() => handleFilter('catfish')}
              className={
                speciesFilter === 'catfish'
                  ? 'cursor-pointer  text-blue-600 dark:text-white'
                  : 'cursor-pointer text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
              }
            >
              {t.catfish}
            </span>
          </div>
          {list}
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
      <>
        <p className="p-2 text-center">{t.youhavetosignin}</p>
        <NoUserLinks />
      </>
    );
  }

  return (
    <div className="h-screen">
      <Layout>
        <Head>
          <title>{t.ranking} - Fisherman&apos;s Diary</title>
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

export default Ranking;
