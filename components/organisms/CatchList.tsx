import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import CatchRow from '../molecules/CatchRow';
import ConfirmationDialog from '../molecules/ConfirmationDialog';
import { db } from '../../services/firebase';

type CatchListProps = {
  features: Array<string>;
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

const fetchCatches = async (handleSetCatches, handleSetSorting) => {
  const results = await db.collection('catches').get();
  const tmp = [];
  results.docs.map((doc) => {
    tmp.push({ id: doc.id, ...doc.data() });
  });
  tmp.sort(dynamicSort('-date'));
  handleSetSorting('-date');
  handleSetCatches(tmp);
};

const CatchList = ({ features }: CatchListProps): JSX.Element => {
  const [catches, setCatches] = useState([]);
  const [sorting, setSorting] = useState('date');
  const [elementToRemove, setElementToRemove] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchCatches(setCatches, setSorting);
    console.log('onOpen:', onOpen);
  }, []);

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
    fetchCatches(setCatches, setSorting);
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
              className={`w-1/${features.length} flex flex-row cursor-pointer`}
              onClick={() => sortRows(feature)}
            >
              <p>{feature}</p>
              {sorting === feature && (
                <img
                  className="w-2 ml-2 transform -rotate-90"
                  src="/arrow.svg"
                />
              )}
              {sorting === `-${feature}` && (
                <img
                  className="w-2 ml-2 transform rotate-90"
                  src="/arrow.svg"
                />
              )}
            </div>
          );
        })}
      </div>
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
