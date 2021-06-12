import {useState} from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/authContext';
import en from '../../translations/en';
import pl from '../../translations/pl';
import CatchButton from '../../components/catches/CatchButton';
import CatchList from '../../components/catches/CatchList';
import Heading from '../../components/partials/Heading';
import RankingFilters from '../../components/partials/RankingFilters';

const IndexCatchLists = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;
  const [
    speciesFilter,
    setSpeciesFilter
] = useState('');

const handleFilter = (index) => {
    setSpeciesFilter(index);
};

    return (
        <>
      <div className="p-5 pt-20 sm:pt-12">
        <Heading text={t.largestfish} tag={'h1'} />
        <RankingFilters filter={speciesFilter} handleFilterCallback={handleFilter} />
        <CatchList
      features={['image', 'species', 'weight', 'length', 'date', 'author_name']}
      personal={false}
      sortBy="-length"
      species={speciesFilter}
      amount={5}
    />
      </div>
      <CatchButton />
  </>
      
    );
};

export default IndexCatchLists;