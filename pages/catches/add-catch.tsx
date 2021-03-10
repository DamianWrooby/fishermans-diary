import { useState } from 'react';
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
import { MemoCatchMap } from '../../components/catches/CatchMap';
import CatchForm from '../../components/catches/CatchForm';
import { useAuth } from '../../contexts/authContext';
import { MemoMapComponent } from '../../components/catches/MapComponent';
import { fromLonLat } from 'ol/proj';

const AddCatch = () => {
  const user = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const polandLonLat: Array<Number> = [19.408318, 52.121216];
  const polandWebMercator: Array<Number> = fromLonLat(polandLonLat);
  const [coords, setCoords] = useState([]);

  const getData = (data: Array<Number>): void => {
    setCoords(data);
  };

  //TODO Mapa nie ładuje się kiedy geolokacja jest wyłączona

  return (
    <Layout>
      {user.isAuthenticated ? (
        <>
          {/* <MemoCatchMap getDataCallback={getData} showFormCallback={onOpen} /> */}
          <div className="w-screen h-screen m-auto flex justify-center">
            <div className="w-9/12 h-2/3 m-auto cursor-pointer">
              <MemoMapComponent
                sourceUrl="https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu"
                centerCoords={polandWebMercator}
                getDataCallback={getData}
                showFormCallback={onOpen}
                geolocation={true}
              />
            </div>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Catch Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CatchForm passCoords={coords} closeFormCallback={onClose} />
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
