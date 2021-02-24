import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CatchRow from '../molecules/CatchRow';
import Arrow from '../../public/arrow.svg';
import ConfirmationDialog from '../molecules/ConfirmationDialog';
import { db } from '../../services/firebase';
import { useCollection } from '@nandorojo/swr-firestore';
import en from '../../translations/en';
import pl from '../../translations/pl';

type CatchListProps = {
  features: Array<string>;
  amount?: number;
};

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    const result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const CatchList = ({ features, amount }: CatchListProps): JSX.Element => {
  const [catches, setCatches] = useState([]);
  const [sorting, setSorting] = useState('date');
  const [elementToRemove, setElementToRemove] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error } = useCollection(`catches`, {
    limit: amount,
    listen: true,
  });
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  useEffect(() => {
    console.log(data);
    const tmp = [];
    if (data) {
      data.map((doc) => {
        tmp.push({ id: doc.id, ...doc });
      });
    }
    tmp.sort(dynamicSort('-date'));
    setSorting('-date');
    setCatches(tmp);
  }, [data]);

  const sortRows = (id: string) => {
    let sortedCatches = [];
    if (sorting === id) {
      setSorting(`-${id}`);
      sortedCatches = catches.sort(dynamicSort(`-${id}`));
    } else {
      setSorting(id);
      sortedCatches = catches.sort(dynamicSort(id));
    }
    setCatches(sortedCatches);
  };

  const prepareRemove = (event, id) => {
    event.stopPropagation();
    setElementToRemove(id);
    onOpen();
  };

  const removeRow = (id) => {
    db.collection('catches')
      .doc(id)
      .delete()
      .then(function () {
        console.log('Document successfully deleted!');
      })
      .catch(function (error) {
        console.error('Error removing document: ', error);
      });
    onClose();
  };

  return (
    <>
      <div className="w-full max-w-screen-lg flex flex-row justify-between p-3 items-center">
        {features.map((feature) => {
          return feature === 'image' ? (
            <p key={feature} className={`w-1/${features.length}`}></p>
          ) : (
            <div
              key={feature}
              className={`w-1/${features.length} flex flex-row cursor-pointer invisible sm:visible`}
              onClick={() => sortRows(feature)}
            >
              <p>{t[feature]}</p>
              {sorting === feature && (
                <div className="w-2 ml-3 transform -rotate-90">
                  <Arrow className="fill-current dark:text-white invisible sm:visible" />
                </div>
              )}
              {sorting === `-${feature}` && (
                <div className="w-2 -ml-1 transform rotate-90">
                  <Arrow className="fill-current dark:text-white invisible sm:visible" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {error ? <p>Fetching data error</p> : null}
      {!data ? <p>Loading...</p> : null}
      <div className="flex flex-row flex-wrap sm:flex-col justify-around px-16 sm:px-0">
        {catches.map((el) => {
          return (
            <CatchRow
              rowFeatures={features}
              key={el.id}
              handleRemove={(e) => prepareRemove(e, el.id)}
              data={el}
            />
          );
        })}
      </div>
      <ConfirmationDialog
        handleIsOpen={isOpen}
        handleOnClose={onClose}
        handleAction={() => removeRow(elementToRemove)}
        text="Do you really want to delete this catch?"
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
      />
    </>
  );
};

export default CatchList;
