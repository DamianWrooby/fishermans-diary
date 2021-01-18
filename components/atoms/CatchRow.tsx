import { useEffect } from 'react';

const CatchRow = ({ data }) => {
  return (
    <div className="w-full bordered border-2 flex flex-row justify-between p-3 mb-4 items-center">
      <div className="w-1/8">
        <div className="rounded-full w-10 overflow-hidden bg-blue-300 p-1">
          <img src={data.image} />
        </div>
      </div>
      <p className="w-1/8">{data.species}</p>
      <p className="w-1/8">{data.weight} kg</p>
      <p className="w-1/8">{data.length} cm</p>
      <p className="w-1/8">{data.method}</p>
      <p className="w-1/8">{data.bait}</p>
      <p className="w-1/8">{data.time}</p>
      <p className="w-1/8">{data.date}</p>
    </div>
  );
};

export default CatchRow;
