import { useEffect, useState } from 'react';
import CatchRow from '../atoms/CatchRow';
import { db } from '../../services/firebase';

const data = {
  imageURL: '/fish-logo-01.png',
  length: '3',
  method: 'bottom',
  species: 'carp',
  weight: '0.200',
  date: '11-1-2021',
  time: '19:54:21',
  bait: 'worm',
};

const CatchList = (): JSX.Element => {
  const [catches, setCatches] = useState([]);
  useEffect(() => {
    const fetchCatches = async () => {
      const results = await db.collection('catches').get();
      const tmp = [];
      results.docs.map((doc) => {
        tmp.push({ ...doc.data() });
      });
      setCatches(tmp);
      console.log(catches);
    };
    fetchCatches();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row justify-between p-3 items-center">
        <p className="w-1/8">image</p>
        <p className="w-1/8">species</p>
        <p className="w-1/8">weight</p>
        <p className="w-1/8">length</p>
        <p className="w-1/8">method</p>
        <p className="w-1/8">bait</p>
        <p className="w-1/8">time</p>
        <p className="w-1/8">date</p>
      </div>
      {catches.map((el) => {
        return <CatchRow data={el} />;
      })}
    </>
  );
};

export default CatchList;
