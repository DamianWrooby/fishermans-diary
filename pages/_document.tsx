import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#1a202c" />
          <script async src="https://unpkg.com/elm-pep"></script>
          <link rel="shortcut icon" href="/fish.svg" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@200;400;700&display=swap"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@200;400;700&display=swap"
            media="print"
            onload="this.media='all'"
          />

          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Mukta+Malar:wght@200;400;700&display=swap"
            />
          </noscript>
        </Head>
        <body>
          <ColorModeScript initialColorMode={'system'} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
