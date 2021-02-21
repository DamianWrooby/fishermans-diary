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
import { MemoCatchMap } from '../../components/molecules/CatchMap';
import CatchForm from '../../components/molecules/CatchForm';
import { useAuth } from '../../contexts/authContext';

const AddCatch = (): React.ReactNode => {
  const user = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [coords, setCoords] = useState([]);

  const getData = (data: Array<Number>): void => {
    setCoords(data);
  };

  return (
    <Layout>
      {user.isAuthenticated ? (
        <>
          <MemoCatchMap getDataCallback={getData} showFormCallback={onOpen} />
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
