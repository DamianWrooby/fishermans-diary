import Image from 'next/image';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const CatchRow = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="w-full max-w-screen-lg bordered border rounded-lg flex flex-row justify-between p-3 mb-4 items-center">
      <div className="w-1/8">
        {data.image ? (
          <>
            <div
              onClick={onOpen}
              className="flex justify-center rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-0 cursor-zoom-in"
            >
              <Image
                src={data.image}
                alt={data.species}
                width={64}
                height={64}
              />
            </div>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>{`${
                  data.species.charAt(0).toUpperCase() + data.species.slice(1)
                } - ${data.weight}kg / ${data.length}cm`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Image
                    src={data.image}
                    alt={data.species}
                    width={400}
                    height={300}
                  />
                  {/* <img src={data.image} /> */}
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        ) : (
          <div className="rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-1">
            <img src="/fish-logo-01.png" />
          </div>
        )}
      </div>
      <p className="w-1/8">{data.species}</p>
      <p className="w-1/8">{data.weight} kg</p>
      <p className="w-1/8">{data.length} cm</p>
      <p className="w-1/8">{data.method}</p>
      <p className="w-1/8">{data.bait}</p>
      <p className="w-1/8">{data.date}</p>
      <p className="w-1/8">{data.time}</p>
    </div>
  );
};

export default CatchRow;
