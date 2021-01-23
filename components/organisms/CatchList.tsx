import { useEffect, useState } from 'react';
import CatchRow from '../atoms/CatchRow';
import { db } from '../../services/firebase';

type CatchListProps = {
  features: Array<string>;
};

const CatchList = ({ features }: CatchListProps): JSX.Element => {
  const [catches, setCatches] = useState([]);
  const [sorting, setSorting] = useState('date');

  useEffect(() => {
    const fetchCatches = async () => {
      const results = await db.collection('catches').get();
      const tmp = [];
      results.docs.map((doc) => {
        tmp.push({ id: doc.id, ...doc.data() });
      });
      setCatches(tmp);
    };
    fetchCatches();
  }, []);

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
                  className="w-2 ml-2 transform rotate-90"
                  src="/arrow.svg"
                />
              )}
              {sorting === `-${feature}` && (
                <img
                  className="w-2 ml-2 transform -rotate-90"
                  src="/arrow.svg"
                />
              )}
            </div>
          );
        })}
      </div>
      {catches.map((el) => {
        return <CatchRow rowFeatures={features} key={el.id} data={el} />;
      })}
    </>
  );
};

export default CatchList;
