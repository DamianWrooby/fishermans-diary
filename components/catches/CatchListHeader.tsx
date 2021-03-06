import { useRouter } from 'next/router';
import Arrow from '../../public/arrow.svg';
import en from '../../translations/en';
import pl from '../../translations/pl';

const CatchListHeader = ({ featureList, onFeatureClick, sortingType }) => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  return (
    <div className="w-full max-w-screen-lg flex flex-row justify-between p-3 items-center">
      {featureList.map((feature) => {
        return feature === 'image' ? (
          <div key={feature} className={`w-1/${featureList.length}`}></div>
        ) : (
          <div
            key={feature}
            className={`w-1/${featureList.length} flex flex-row cursor-pointer invisible sm:visible`}
            onClick={() => onFeatureClick(feature)}
          >
            <p>{t[feature]}</p>
            {sortingType === feature && (
              <div className="w-2 ml-3 transform -rotate-90">
                <Arrow className="fill-current dark:text-white invisible sm:visible" />
              </div>
            )}
            {sortingType === `-${feature}` && (
              <div className="w-2 -ml-1 transform rotate-90">
                <Arrow className="fill-current dark:text-white invisible sm:visible" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CatchListHeader;
