import { useRouter } from 'next/router';

import Head from 'next/head';
import en from '../translations/en';
import pl from '../translations/pl';

const IndexHead = () => {
	const router = useRouter();
	const { locale } = router;
	const t = locale === 'en' ? en : pl;
	return (
		<Head>
			<title>{t.signinandcatchyourprfishfishbook}</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="description" content={t.logindescription} />
		</Head>
	);
};

export default IndexHead;
