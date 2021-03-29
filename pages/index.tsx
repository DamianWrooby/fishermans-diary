import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import CatchButton from '../components/catches/CatchButton';
import CatchList from '../components/catches/CatchList';
import Loader from '../components/partials/Loader';
import NoUserLinks from '../components/partials/NoUserLinks';
import en from '../translations/en';
import pl from '../translations/pl';
import { motion, AnimatePresence } from 'framer-motion';

const Home = (): React.ReactNode => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  let content;

  if (user.isAuthenticated && !user.loading) {
    content = (
      <>
        <section className="p-5 pt-24 sm:pt-12 pb-12">
          <AnimatePresence>
            <motion.h2
              initial={{ opacity: 0, x: 300, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 0 }}
              className="text-md sm:text-xl text-center p-3"
            >
              {t.yourlastcatches}
            </motion.h2>
          </AnimatePresence>
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
            userID={user.data.uid}
            personal={true}
          />
        </section>
        <section className="p-5 pt-12 pb-12">
          <AnimatePresence>
            <motion.h2
              initial={{ opacity: 0, x: 300, y: 0 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 100, y: 0 }}
              className="text-md sm:text-xl text-center p-3"
            >
              {t.fishesrecentlycatchedbysociety}
            </motion.h2>
          </AnimatePresence>
          <CatchList
            amount={30}
            features={[
              'image',
              'species',
              'weight',
              'length',
              'date',
              'time',
              'author_name',
            ]}
            pagination={true}
            paginationAmount={5}
            personal={false}
          />
        </section>
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
    content = <NoUserLinks />;
  }

  return (
    <Layout>
      <Head>
        <title>Fisherman&apos;s Diary </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Fishbook - every angler's diary" />
      </Head>
      {content}
    </Layout>
  );
};

export default Home;
