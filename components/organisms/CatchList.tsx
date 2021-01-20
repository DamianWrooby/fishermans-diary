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
        tmp.push({ id: doc.id, ...doc.data() });
      });
      setCatches(tmp);
    };
    fetchCatches();
    console.log(catches);
  }, []);

  return (
    <>
      <div className="w-full max-w-screen-lg flex flex-row justify-between p-3 items-center">
        <p className="w-1/8"></p>
        <p className="w-1/8">species</p>
        <p className="w-1/8">weight</p>
        <p className="w-1/8">length</p>
        <p className="w-1/8">method</p>
        <p className="w-1/8">bait</p>
        <p className="w-1/8">date</p>
        <p className="w-1/8">time</p>
      </div>
      {catches.map((el) => {
        return <CatchRow key={el.id} data={el} />;
      })}
    </>
  );
};

export default CatchList;
