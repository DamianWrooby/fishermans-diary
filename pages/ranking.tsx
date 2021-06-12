import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import useLanguage from '../hooks/useLanguage';
import en from '../translations/en';
import pl from '../translations/pl';
import Loader from '../components/partials/Loader';
import NoUserLinks from '../components/partials/NoUserLinks';
import RankingHead from '../heads/RankingHead';
import RankingCatchList from '../components/catches/RankingCatchList';


const Ranking = () => {
  const t: typeof en | typeof pl = useLanguage() === 'en' ? en : pl;
  const user = useAuth();
  const {isAuthenticated, loading} = user;
  let mode;


  const CONTENT = {
		authenticated: <RankingCatchList />,
		loading: <Loader />,
		unauthenticated: (<>
      <p className="p-2 text-center">{t.youhavetosignin}</p>
      <NoUserLinks />
    </>)
	};

	if (isAuthenticated && !loading) {
		mode = 'authenticated';
	} else if (!isAuthenticated && loading) {
		mode = 'loading';
	} else if (!isAuthenticated && !loading) {
		mode = 'unauthenticated';
	}

  return (
    <div className="h-screen">
      <Layout>
        <RankingHead />
        {CONTENT[mode]}
      </Layout>
    </div>
  );
};

export default Ranking;
