import { memo, useState } from 'react';

import ReactStars from 'react-stars';

import { db } from '../../services/firebase';
import useLanguage from '../../hooks/useLanguage';
import pl from '../../translations/pl';
import en from '../../translations/en';

interface RatingDataType {
  [key: string]: number;
}

interface RatingProps {
  docID: string;
  ratingData: RatingDataType;
  userID: string;
  ratingChangedHandler: () => void;
}

const Rating = ({
  docID,
  ratingData,
  userID,
  ratingChangedHandler,
}: RatingProps) => {
  const [ratingError, setRatingError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;
  const ratingsArr: number[] = ratingData ? Object.values(ratingData) : [];
  const ratingCount: number = ratingData ? Object.keys(ratingData).length : 0;
  const overallRating: number | 0 = ratingData
    ? ratingsArr.reduce((a: number, b: number) => a + b) / ratingCount
    : 0;
  let timer;

  const mouseEnterHandler = () => {
    setHovered(true);
  };
  const mouseLeaveHandler = () => {
    setHovered(false);
  };
  const ratingChanged = (newRating) => {
    db.collection('catches')
      .doc(docID)
      .set(
        {
          ratings: { [userID]: newRating },
        },
        { merge: true }
      )
      .then((doc) => {})
      .catch((error) => {
        setRatingError(true);
      });
    setActive(true);
    clearTimeout(timer);
    timer = setTimeout(() => setActive(false), 300);
  };

  return (
    <>
      <div onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
        <div
          className={`${hovered ? `react-stars` : `react-stars hidden`} ${
            active ? `active` : ``
          }`}
        >
          <ReactStars
            count={5}
            onChange={ratingChanged}
            isHalf
            edit={true}
            size={20}
            activeColor="#ffd700"
          />
          <span className="shape">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className={hovered ? `hidden` : `flex flex-row flex-wrap`}>
          <ReactStars
            count={5}
            value={overallRating}
            isHalf
            edit={false}
            size={20}
            activeColor="#ffd700"
          />

          <p className="text-xs text-blue-300 my-auto pl-2">
            {ratingCount !== 0
              ? `${overallRating.toFixed(2)} / ${t.ratingcount}: ${ratingCount}`
              : `${t.bethefirsttorate}`}
          </p>
        </div>
      </div>

      {ratingError ? (
        <p className="text-sm text-red-500">{t.ratingerror}</p>
      ) : null}
    </>
  );
};

export default memo(Rating);
