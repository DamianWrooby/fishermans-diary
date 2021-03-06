import Image from 'next/image';

import { useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

import CatchCard from './CatchCard';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';

type Data = {
  author_uid: string;
  bait: string;
  coords: Array<number>;
  date: string;
  id: string;
  image: string;
  length: string;
  method: string;
  species: string;
  time: string;
  weight: string;
  author_email: string;
  author_name: string;
};

type CatchRowProps = {
  data: Data;
  rowFeatures: Array<string>;
  handleRemove: (e: React.MouseEvent<HTMLInputElement>) => void;
  iterationIndex: number;
  removing: boolean;
};

interface IDisclosure {
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onToggle?: () => void;
}

const CatchRow = ({
  data,
  rowFeatures,
  removing,
  handleRemove,
  iterationIndex,
}: CatchRowProps) => {
  const { isOpen, onOpen, onClose }: IDisclosure = useDisclosure();
  const t = useLanguage() === 'en' ? en : pl;
  let escapedName: string;
  let featureData;

  const removeButton = (
    <div
      onClick={handleRemove}
      className="w-4 absolute right-2 top-2 rounded-full transition duration-200 ease-in-out opacity-0 group-hover:opacity-100	transform hover:scale-125"
    >
      <img src="/remove.svg" />
    </div>
  );

  const defaultFishImage = (
    <div className="rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-1">
      <img src="/fish-logo-01.png" />
    </div>
  );

  const fishImage = (
    <div className="flex relative justify-center rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-0">
      <Image
        src={data.image}
        alt={data.species}
        objectFit="cover"
        width="128"
        height="128"
      />
    </div>
  );

  const row = rowFeatures.map((feature) => {
    escapedName = data[feature] ? data[feature].replace(' ', '') : '';

    if (
      feature === 'weight' &&
      (data[feature] === '0' || data[feature] === '')
    ) {
      featureData = '-';
    } else if (t[escapedName]) {
      featureData = t[escapedName];
    } else {
      featureData = data[feature];
    }

    return feature === 'image' ? (
      <div
        key={feature}
        className={`w-full sm:w-1/${rowFeatures.length} mb-2 sm:mb-0 flex justify-center`}
      >
        {data.image ? fishImage : defaultFishImage}
      </div>
    ) : (
      <div
        key={feature}
        className={`flex flex-row text-sm md:text-sm sm:w-1/${rowFeatures.length} pr-2`}
      >
        <div className="block sm:hidden text-blue-500 dark:text-blue-200">
          {t[feature]}:&nbsp;
        </div>
        <div>
          {feature === 'author_name' && !data[feature]
            ? data['author_email']
            : null}
          {featureData}
          {feature === 'weight' &&
          data[feature] !== '0' &&
          data[feature] !== '' ? (
            <span className="lowercase"> kg</span>
          ) : null}
          {feature === 'length' ? <span className="lowercase"> cm</span> : null}
        </div>
      </div>
    );
  });

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="w-full"
          initial={{ opacity: 0, x: 300, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -300, y: 0 }}
          transition={{ duration: 0.2, delay: iterationIndex / 10 }}
        >
          <div
            className="group w-full flex m-auto max-w-screen-lg bordered border rounded-lg  p-3 mb-4 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-800 dark:hover:border-white  transform hover:-translate-y-1 hover:translate-x-1 transition duration-100 ease-in-out"
            onClick={onOpen}
          >
            <div className="m-auto sm:w-full sm:flex sm:items-center">
              {row}
              {removing && removeButton}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <CatchCard data={data} open={isOpen} close={onClose} />
    </>
  );
};

export default CatchRow;
