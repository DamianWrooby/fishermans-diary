import { useAuth } from '../contexts/authContext';
import Layout from '../layouts/layout';

import IndexCatchLists from '../components/catches/IndexCatchLists';
import Loader from '../components/partials/Loader';
import NoUserLinks from '../components/partials/NoUserLinks';
import IndexHead from '../heads/IndexHead';

const Home = () => {
	const user = useAuth();
	const { isAuthenticated, loading } = user;
	let mode;

	const CONTENT = {
		authenticated: <IndexCatchLists />,
		loading: <Loader />,
		unauthenticated: <NoUserLinks />
	};

	if (isAuthenticated && !loading) {
		mode = 'authenticated';
	} else if (!isAuthenticated && loading) {
		mode = 'loading';
	} else if (!isAuthenticated && !loading) {
		mode = 'unauthenticated';
	}

	return (
		<Layout>
			<IndexHead />
			{CONTENT[mode]}
		</Layout>
	);
};

export default Home;
