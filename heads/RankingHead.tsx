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
			<title>{t.ranking} - Fisherman&apos;s Diary</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="description" content="Fisherman's Diary - every angler's diary" />
		</Head>
	);
};

export default IndexHead;
