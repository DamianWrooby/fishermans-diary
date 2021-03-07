import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import CatchListHeader from './CatchListHeader';
import CatchRow from './CatchRow';
import ConfirmationDialog from './ConfirmationDialog';
import { db } from '../../services/firebase';
import { useCollection } from '@nandorojo/swr-firestore';
import en from '../../translations/en';
import pl from '../../translations/pl';

type CatchListProps = {
  features: Array<string>;
  amount?: number;
  userID?: string;
};

const CatchList = ({ features, amount, userID }: CatchListProps) => {
  const [catches, setCatches] = useState([]);
  const [sorting, setSorting] = useState('date');
  const [elementToRemove, setElementToRemove] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  //* If userID is not specified, fetch non-privet catches from all users
  const { data, error } = userID
    ? useCollection(`catches`, {
        where: ['author_uid', '==', userID],
        limit: amount,
        listen: true,
      })
    : useCollection(`catches`, {
        where: ['private', '==', false],
        limit: amount,
        listen: true,
      });
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

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

  const translateCatches = (arr: typeof catches) => {
    let translatedCatches: typeof catches = [];
    let i: number = 0;
    let noSpaceValue: string = '';

    arr.forEach((obj) => {
      translatedCatches[i] = {};
      for (const property in obj) {
        if (typeof obj[property] === 'string') {
          noSpaceValue = obj[property].replace(' ', '');
          translatedCatches[i][property] = t[noSpaceValue]
            ? t[noSpaceValue]
            : obj[property];
        } else {
          translatedCatches[i][property] = obj[property];
        }
      }
      i++;
    });
    return translatedCatches;
  };

  const sortRows = (id: string) => {
    let sortedCatches = [];
    let translatedCatches = [];

    if (sorting === id) {
      setSorting(`-${id}`);
      //* Translate  catches object's values if language is not en
      if (t === en) {
        sortedCatches = catches.sort(dynamicSort(`-${id}`));
      } else {
        translatedCatches = translateCatches(catches);
        sortedCatches = translatedCatches.sort(dynamicSort(`-${id}`));
      }
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

  useEffect(() => {
    const tmp = [];
    if (data) {
      data.map((doc) => {
        tmp.push({ id: doc.id, ...doc });
      });
    }
    tmp.sort(dynamicSort('-date'));
    console.log('Data:', tmp);
    setSorting('-date');
    setCatches(tmp);
  }, [data]);

  return (
    <>
      <CatchListHeader
        featureList={features}
        sortingType={sorting}
        onFeatureClick={sortRows}
      />

      {error ? <p>Fetching data error</p> : null}
      {!data ? <p>Loading...</p> : null}
      <div className="flex flex-row flex-wrap sm:flex-col justify-around px-8 xs:px-16 sm:px-0">
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
