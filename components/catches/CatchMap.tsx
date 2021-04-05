import { MemoMapComponent } from '../map/MapComponent';
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useCollection } from '@nandorojo/swr-firestore';
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
  userID: string;
};

const CatchMap = memo(({ userID }: CatchMapProps) => {
  const t = useLanguage() === 'en' ? en : pl;
  let markersCoords = [];
  let map = null;
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
    map = (
      <MemoMapComponent
        sourceUrl="https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu"
        centerCoords={markersCoords[markersCoords.length - 1]}
        markers={markersCoords}
        zoom={18}
        tooltips
      />
    );
  } else {
    map = null;
  }

  return (
    <div className="pt-16">
      <motion.h2
        initial={{ opacity: 0, x: -100, y: 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="pt-8 pb-3 text-md sm:text-xl text-center"
      >
        {t.yourcatchmap}
      </motion.h2>
      <div className="w-5/6 sm:w-9/12 h-96 mx-auto cursor-pointer">{map}</div>
    </div>
  );
});

export default CatchMap;
