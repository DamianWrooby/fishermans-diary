import Image from 'next/image';
import PinIcon from '../../public/pin.svg';
import { MemoCardMap } from '../molecules/CardMap';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

const CatchCard = ({ data, open, close }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="pb-0">{`${
            data.species.charAt(0).toUpperCase() + data.species.slice(1)
          } - ${data.weight}kg / ${data.length}cm`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row">
              <div className="w-2/3">
                <div className="flex flex-row items-end text-sm -mt-3 text-gray-100">
                  <p className="mr-3">
                    <strong>Method: </strong>
                    {`${data.method}`}
                  </p>
                  <p className="mr-3">
                    <strong>Bait: </strong>
                    {`${data.bait}`}
                  </p>
                </div>
                <div className="flex flex-row  text-sm text-gray-400">
                  <p>{`Catched ${data.date} at ${data.time}`}</p>
                </div>
              </div>
              <div
                onClick={onOpen}
                className="flex flex-row group w-1/3 text-sm cursor-pointer"
              >
                <p className="group">
                  <PinIcon className="w-4 -mt-1 mr-1 inline fill-current transform transition duration-300  group-hover:rotate-12 dark:text-white" />
                  Show on map
                </p>
              </div>
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <MemoCardMap />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CatchCard;
