import Head from 'next/head';

const IndexHead = () => {
	return (
		<Head>
			<title>Fisherman&apos;s Diary</title>
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<meta name="description" content="🎣 Write down your fish in Fisherman's Diary" />
			<meta property="og:url" content="https://fishermans-diary.vercel.app/pl" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Fisherman's Diary" />
			<meta
				name="twitter:card"
				content="Fisherman's Diary is a web application dedicted to anglers. Users can save information about fish species, method, bait etc. by interactive map. It is possible also to display fish caught by society or display place of catch on map."
			/>
			<meta
				property="og:description"
				content="Fisherman's Diary is a web application dedicted to anglers. Users can save information about fish species, method, bait etc. by interactive map. It is possible also to display fish caught by society or display place of catch on map."
			/>
			<meta property="og:image" content="https://fishermans-diary.vercel.app/og-image.png" />
		</Head>
	);
};

export default IndexHead;
