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

interface Data {
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
}

type CatchRowProps = {
  data: Data;
  rowFeatures: Array<string>;
};

const CatchRow = ({ data, rowFeatures }: CatchRowProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="w-full max-w-screen-lg bordered border rounded-lg flex flex-row justify-between p-3 mb-4 items-center cursor-pointer hover:bg-gray-800 hover:border-white transform hover:-translate-y-1 hover:translate-x-1 transition duration-100 ease-in-out"
        onClick={onOpen}
      >
        {rowFeatures.map((feature) => {
          return feature === 'image' ? (
            <div key={feature} className={`w-1/${rowFeatures.length}`}>
              {data.image ? (
                <>
                  <div className="flex justify-center rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-0">
                    <Image
                      src={data.image}
                      alt={data.species}
                      width={64}
                      height={64}
                    />
                  </div>
                </>
              ) : (
                <div className="rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-1">
                  <img src="/fish-logo-01.png" />
                </div>
              )}
            </div>
          ) : (
            <p key={feature} className={`w-1/${rowFeatures.length}`}>
              {data[feature]}
            </p>
          );
        })}
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
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CatchRow;
