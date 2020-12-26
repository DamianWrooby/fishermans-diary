import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import Menu from '../../components/molecules/Menu';
import CatchMap from '../../components/molecules/CatchMap';
import CatchForm from '../../components/molecules/CatchForm';
import { useAuth } from '../../contexts/authContext';

const AddCatch = (): React.ReactNode => {
  const user = useAuth();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [coords, setCoords] = useState([]);

  const getData = (data): Array => {
    setCoords(data);
  };

  const toggleForm = () => {
    setShowCatchForm(!showCatchForm);
  };

  return (
    <div className="h-screen">
      <Menu />
      {user.isAuthenticated ? (
        <>
          <CatchMap getDataCallback={getData} showFormCallback={onOpen} />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Catch Form</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <CatchForm />
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
    </div>
  );
};

export default AddCatch;
