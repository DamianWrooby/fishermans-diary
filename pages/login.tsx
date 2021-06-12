import { useRouter } from 'next/router';

import Layout from '../layouts/layout';
import { useAuth } from '../contexts/authContext';
import en from '../translations/en';
import pl from '../translations/pl';
import LoginHead from '../heads/LoginHead';
import LoginButtons from '../components/partials/LoginButtons';

const Login = () => {
	const user = useAuth();
	const router = useRouter();
	const { locale } = router;
	const t = locale === 'en' ? en : pl;

	return (
		<Layout>
			<LoginHead />
			<div className="pt-24 sm:pt-16 -mb-20 flex flex-col">
				<div className="w-full h-full flex flex-col justify-center items-center">
					{user.isAuthenticated ? <p>{t.youreloggedin}</p> : <LoginButtons />}
				</div>
			</div>
		</Layout>
	);
};

export default Login;
