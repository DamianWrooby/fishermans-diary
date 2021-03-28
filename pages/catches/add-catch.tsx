import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Layout from '../../layouts/layout';
import { useAuth } from '../../contexts/authContext';
import { MemoMapComponent } from '../../components/map/MapComponent';
import { fromLonLat } from 'ol/proj';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const DynamicCatchForm = dynamic(
  () => import('../../components/catches/CatchForm')
);

const AddCatch = () => {
  const user = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const polandLonLat: Array<Number> = [19.408318, 52.121216];
  const [coords, setCoords] = useState([]);
  const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;

  const getData = (data: Array<Number>): void => {
    setCoords(data);
  };

  return (
    <Layout>
      <Head>
        <title>{t.addcatch} - Fisherman&apos;s Diary</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Fishbook - every angler's diary" />
      </Head>
      {user.isAuthenticated ? (
        <>
          <div className="w-screen h-screen m-auto flex flex-col">
            <AnimatePresence>
              <motion.h1
                initial={{ opacity: 0, x: -100, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 100, y: 0 }}
                className="text-center text-xl pt-20 pb-4 sm:p-8"
              >
                {t.clickonthemap}
              </motion.h1>
            </AnimatePresence>
            <div className="w-5/6 sm:w-9/12 h-2/3 mx-auto cursor-pointer">
              <MemoMapComponent
                sourceUrl="https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu"
                centerCoords={polandLonLat}
                getDataCallback={getData}
                showFormCallback={onOpen}
                geolocation={true}
              />
            </div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{t.addyourfish}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DynamicCatchForm
                  passCoords={coords}
                  closeFormCallback={onClose}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <p>
          You're not logged in. Go to the{' '}
          <Link href="/login">
            <a href="/login" className="text-blue-300 hover:text-blue-500">
              Login page
            </a>
          </Link>
          .
        </p>
      )}
    </Layout>
  );
};

export default AddCatch;
