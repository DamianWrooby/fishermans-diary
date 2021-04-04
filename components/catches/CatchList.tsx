import { useEffect, useState } from 'react';
import { useDisclosure, useColorModeValue } from '@chakra-ui/react';
import CatchListHeader from './CatchListHeader';
import CatchRow from './CatchRow';
import PaginationControls from '../partials/PaginationControls';
import ConfirmationDialog from './ConfirmationDialog';
import { db } from '../../services/firebase';
import { useCollection } from '@nandorojo/swr-firestore';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

type CatchListProps = {
  features: Array<string>;
  amount?: number;
  userID?: string;
  pagination?: boolean;
  paginationAmount?: number;
  personal: boolean;
};

interface Catches {
  author_email: string;
  author_name: string;
  author_photo: string;
  author_uid: string;
  bait: string;
  coords: Array<number>;
  date: string;
  exists: boolean;
  hasPendingWrites: boolean;
  id: string;
  image: string;
  length: string;
  method: string;
  private: boolean;
  species: string;
  time: string;
  weight: string;
  __snapshot: any;
}

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

const CatchList = ({
  features,
  amount,
  userID,
  personal,
  pagination,
  paginationAmount,
}: CatchListProps) => {
  const [catches, setCatches] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [sorting, setSorting] = useState('date');
  const [elementToRemove, setElementToRemove] = useState('');
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  //* If userID is not specified, fetch non-private catches from all users
  const { data, error } = userID
    ? useCollection<Catches>(`catches`, {
        where: ['author_uid', '==', userID],
        limit: amount,
        listen: true,
      })
    : useCollection<Catches>(`catches`, {
        where: ['private', '==', false],
        limit: amount,
        listen: true,
      });
  const t = useLanguage() === 'en' ? en : pl;
  const skeletonColor = useColorModeValue('#b1b1b1', '#242c3c');
  const skeletonHighlightColor = useColorModeValue('#b9b9b9', '#2a3346');
  const perChunk = paginationAmount ? paginationAmount : 3;
  let chunkedCatchesArr = null;
  let rows = null;

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
    const sortIndex = id === 'date' ? 'timestamp' : id;

    if (sorting === sortIndex) {
      setSorting(`-${sortIndex}`);
      //* Translate  catches object's values if language is not en
      if (t === en) {
        sortedCatches = catches.sort(dynamicSort(`-${sortIndex}`));
      } else {
        translatedCatches = translateCatches(catches);
        sortedCatches = translatedCatches.sort(dynamicSort(`-${sortIndex}`));
      }
    } else {
      setSorting(sortIndex);
      sortedCatches = catches.sort(dynamicSort(sortIndex));
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
    setLoading(true);
    const tmp = [];
    if (data) {
      data.map((doc) => {
        tmp.push({ id: doc.id, ...doc });
      });
    }
    tmp.sort(dynamicSort('-date'));
    setSorting('-date');
    setCatches(tmp);
    setLoading(false);
  }, [data]);

  if (catches && pagination) {
    chunkedCatchesArr = catches.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);

    if (chunkedCatchesArr[0]) {
      rows = chunkedCatchesArr[paginationPage - 1].map((el, index) => {
        return (
          <CatchRow
            rowFeatures={features}
            key={el.id}
            handleRemove={(e) => prepareRemove(e, el.id)}
            data={el}
            iterationIndex={index}
            removing={personal}
          />
        );
      });
    } else {
      rows = null;
    }
  } else if (catches) {
    rows = catches.map((el, index) => {
      return (
        <CatchRow
          rowFeatures={features}
          key={el.id}
          handleRemove={(e) => prepareRemove(e, el.id)}
          data={el}
          iterationIndex={index}
          removing={personal}
        />
      );
    });
  }

  const changePage = (id) => {
    if (id === 'prevPage') {
      setPaginationPage(paginationPage - 1);
    } else if (id === 'nextPage') {
      setPaginationPage(paginationPage + 1);
    } else {
      setPaginationPage(id);
    }
  };

  return (
    <>
      {catches ? (
        <CatchListHeader
          featureList={features}
          sortingType={sorting}
          onFeatureClick={sortRows}
        />
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-500">
          {t.addfirstfish}
        </p>
      )}
      {error ? <p>{t.fetchingdataerror}</p> : null}
      {!data ? (
        <div className="max-w-screen-lg m-auto">
          <SkeletonTheme
            color={skeletonColor}
            highlightColor={skeletonHighlightColor}
          >
            <Skeleton count={amount ? amount : 3} height={100} />
          </SkeletonTheme>
        </div>
      ) : null}
      <div
        className={`w-full flex flex-row flex-wrap sm:flex-col justify-start px-8 xs:px-16 sm:px-0 sm:min-h-${perChunk}`}
      >
        {rows}
      </div>

      {pagination && catches && Math.ceil(catches.length / perChunk) > 1 ? (
        <PaginationControls
          pages={Math.ceil(catches.length / perChunk)}
          currentPage={paginationPage}
          handleClick={changePage}
        />
      ) : null}

      <ConfirmationDialog
        handleIsOpen={isOpen}
        handleOnClose={onClose}
        handleAction={() => removeRow(elementToRemove)}
        text={t.areyousure}
        confirmButtonText={t.delete_cap}
        cancelButtonText={t.cancel_cap}
      />
    </>
  );
};

export default CatchList;
