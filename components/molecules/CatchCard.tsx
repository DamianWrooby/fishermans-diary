import Image from 'next/image';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const CatchCard = ({ data, open, close }) => {
  return (
    <Modal isOpen={open} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${
          data.species.charAt(0).toUpperCase() + data.species.slice(1)
        } - ${data.weight}kg / ${data.length}cm`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {data.image ? (
            <Image
              src={data.image}
              alt={data.species}
              width={400}
              height={300}
            />
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CatchCard;
