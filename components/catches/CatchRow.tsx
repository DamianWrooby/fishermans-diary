import Image from 'next/image';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CatchCard from './CatchCard';
import en from '../../translations/en';
import pl from '../../translations/pl';
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
  author_email: string;
  author_name: string;
}

type CatchRowProps = {
  data: Data;
  rowFeatures: Array<string>;
  handleRemove: (e: React.MouseEvent<HTMLInputElement>) => void;
};

const CatchRow = ({ data, rowFeatures, handleRemove }: CatchRowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  return (
    <>
      <div
        className="group w-full flex max-w-screen-lg bordered border rounded-lg  p-3 mb-4 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-800 dark:hover:border-white  transform hover:-translate-y-1 hover:translate-x-1 transition duration-100 ease-in-out"
        onClick={onOpen}
      >
        <div className="m-auto sm:w-full sm:flex sm:items-center">
          {rowFeatures.map((feature) => {
            const noSpaceValue = data[feature].replace(' ', '');

            return feature === 'image' ? (
              <div
                key={feature}
                className={`w-full sm:w-1/${rowFeatures.length} mb-2 sm:mb-0 flex justify-center`}
              >
                {data.image ? (
                  <>
                    <div>
                      <div className="flex relative justify-center rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-0">
                        <Image
                          src={data.image}
                          alt={data.species}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-full w-16 h-16 overflow-hidden bg-blue-300 p-1">
                    <img src="/fish-logo-01.png" />
                  </div>
                )}
              </div>
            ) : (
              <div
                key={feature}
                className={`flex flex-row text-sm md:text-sm sm:w-1/${rowFeatures.length} pr-2`}
              >
                <div className="block sm:hidden text-blue-200">
                  {feature}:&nbsp;
                </div>
                <div>
                  {t[noSpaceValue] ? t[noSpaceValue] : data[feature]}
                  {feature === 'weight' ? (
                    <span className="lowercase"> kg</span>
                  ) : null}
                  {feature === 'length' ? (
                    <span className="lowercase"> cm</span>
                  ) : null}
                </div>
              </div>
            );
          })}
          <div
            onClick={handleRemove}
            className="w-4 absolute right-2 top-2 rounded-full transition duration-200 ease-in-out opacity-0 group-hover:opacity-100	transform hover:scale-125"
          >
            <img src="/remove.svg" />
          </div>
        </div>
      </div>
      <CatchCard data={data} open={isOpen} close={onClose} />
    </>
  );
};

export default CatchRow;
