import { useEffect } from 'react';
import CatchRow from '../atoms/CatchRow';

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
      <CatchRow data={data} />
    </>
  );
};

export default CatchList;
