import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '../contexts/authContext';
import { FuegoProvider } from '@nandorojo/swr-firestore';
import { Fuego } from '../services/fuego';
import { firebaseConfig } from '../services/firebase';

const fuego = new Fuego(firebaseConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FuegoProvider fuego={fuego}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </FuegoProvider>
  );
}

export default MyApp;
