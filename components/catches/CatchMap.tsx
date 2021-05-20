import { memo } from 'react';

import { motion } from 'framer-motion';
import { useCollection } from '@nandorojo/swr-firestore';

import { MemoMapComponent } from '../map/MapComponent';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

interface Catches {
  author_email: string;
  author_name: string;
  author_photo: string;
  author_uid: string;
  bait: string;
  coords: Array<number>;
  date: string;
  exists: boolean;
  hasPendingWrites: boolean;
  id: string;
  image: string;
  length: string;
  method: string;
  private: boolean;
  species: string;
  time: string;
  weight: string;
  __snapshot: any;
}

type CatchMapProps = {
  userID: string | string[];
};

const CatchMap = memo(({ userID }: CatchMapProps) => {
  const t = useLanguage() === 'en' ? en : pl;
  let markersCoords = [];
  let mapElement,
    headerElement = null;
  const { data, error } = useCollection<Catches>(`catches`, {
    where: ['author_uid', '==', userID],
    listen: true,
  });

  if (data) {
    data.map((el) => {
      markersCoords.push(el.coords);
    });
  }

  if (markersCoords[0]) {
    headerElement = (
      <motion.h2
        initial={{ opacity: 0, x: -100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="pt-8 pb-3 text-md sm:text-xl text-center"
      >
        {t.allfish}
      </motion.h2>
    );
    mapElement = (
      <div className="w-5/6 sm:w-9/12 h-96 mx-auto">
        <MemoMapComponent
          sourceUrl="https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu"
          centerCoords={markersCoords[markersCoords.length - 1]}
          catchData={data}
          markers={markersCoords}
          zoom={18}
          tooltips
        />
      </div>
    );
  } else {
    headerElement = null;
    mapElement = null;
  }

  return (
    <div className="pt-16">
      {headerElement}
      {mapElement}
    </div>
  );
});

export default CatchMap;
