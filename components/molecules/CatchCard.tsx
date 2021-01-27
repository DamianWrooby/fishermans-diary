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
        <ModalHeader className="pb-0">{`${
          data.species.charAt(0).toUpperCase() + data.species.slice(1)
        } - ${data.weight}kg / ${data.length}cm`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="flex flex-row text-sm -mt-3 text-gray-100">
            <p className="mr-3">
              <strong>Method: </strong>
              {`${data.method}`}
            </p>
            <p className="mr-3">
              <strong>Bait: </strong>
              {`${data.bait}`}
            </p>
          </div>

          {data.image ? (
            <div className="w-full h-80 relative">
              <Image
                src={data.image}
                alt={data.species}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CatchCard;
