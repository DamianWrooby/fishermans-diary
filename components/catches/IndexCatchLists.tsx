import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/authContext';
import en from '../../translations/en';
import pl from '../../translations/pl';
import CatchButton from '../../components/catches/CatchButton';
import CatchList from '../../components/catches/CatchList';
import Heading from '../../components/partials/Heading';

const IndexCatchLists = () => {
    const user = useAuth();
  const {  data } = user;
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

    return (
        <>
        <section className="p-5 pt-24 sm:pt-12 pb-12">
          <Heading text={t.yourlastcatches} tag={'h2'} />
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
            userID={data.uid}
            personal={true}
          />
        </section>
        <section className="p-5 pt-12 pb-12">
          <Heading text={t.fishrecentlycaughtbysociety} tag={'h2'} />
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
};

export default IndexCatchLists;