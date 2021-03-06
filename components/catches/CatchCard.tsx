import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import PinIcon from '../../public/pin.svg';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../contexts/authContext';
import { MapProps } from '../map/MapComponent';
import Rating from '../partials/Rating';
import useLanguage from '../../hooks/useLanguage';
import pl from '../../translations/pl';
import en from '../../translations/en';

const DynamicMapComponent = dynamic<MapProps>(() =>
  import('../map/MapComponent').then((mod) => mod.MemoMapComponent)
);

const CatchCard = ({ data, open, close }) => {
  const user = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const marker: Array<number> = [];
  const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;
  const escapedBait: string = data.bait.replace(' ', '');
  const escapedName: string = data.species.replace(' ', '');

  marker[0] = data.coords;
  let userLink: string;

  userLink =
    data.author_uid === user.data.uid
      ? '/catches/my-catches'
      : `/users/${data.author_uid}`;

  return (
    <div className="h-screen sm:h-auto">
      <Modal isOpen={open} onClose={close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size="sm" className="pb-0 ">{`${
            t[escapedName] ? t[escapedName] : t[data.species]
          } - ${
            data.weight === '0' || data.weight === ''
              ? ''
              : `${data.weight} kg /`
          } ${data.length}cm`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col sm:flex-row">
              <div className="w-2/3">
                <div className="flex flex-row sm:flex-row items-end text-sm -mt-3 text-gray-600 dark:text-gray-100 ">
                  <div className="flex flex-row mr-3">
                    <p className="capitalize">
                      <strong>{t.method}:&nbsp;</strong>
                    </p>
                    <span>{`${t[data.method]}`}</span>
                  </div>
                  <div className="flex flex-row mr-3">
                    <div className="capitalize">
                      <strong>{t.bait}:&nbsp;</strong>
                    </div>
                    <span>{t[escapedBait] ? t[escapedBait] : data.bait}</span>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-row  text-sm text-gray-400">
                  <p>{`${t.caught} ${data.date} ${t.at} ${data.time}`}</p>
                </div>
                <div className="flex flex-row sm:flex-row py-2 text-sm">
                  <div className="mr-3 flex flex-row">
                    <p>
                      <strong>{t.caughtby}:&nbsp;</strong>
                    </p>
                    <span>
                      <Link href={userLink}>
                        <a
                          className="text-blue-500 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                          href={userLink}
                        >
                          {data.author_name
                            ? data.author_name
                            : data.author_email}
                        </a>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div
                onClick={onOpen}
                className="flex flex-row group text-sm cursor-pointer"
              >
                <p className="group">
                  <PinIcon className="w-4 -mt-1 mr-1 inline fill-current transform transition duration-300  group-hover:rotate-12 dark:text-white" />
                  {t.showonmap}
                </p>
              </div>
            </div>
            {data.image ? (
              <div className="w-full h-60 sm:h-80 relative">
                <Image
                  src={data.image}
                  alt={data.species}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            ) : (
              <div className="w-full h-60 sm:h-80 relative flex justify-center align-middle">
                <p className="m-auto text-gray-700 dark:text-gray-400">
                  {t.nophoto}
                </p>
              </div>
            )}
            <Rating
              docID={data.id}
              ratingData={data.ratings}
              userID={user.data.uid}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="h-80">
              <DynamicMapComponent
                sourceUrl="https://api.maptiler.com/maps/outdoor/tiles.json?key=GflTzOMvFDCYQ9RjOmMu"
                centerCoords={data.coords}
                markers={marker}
                zoom={19}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CatchCard;
