import '../styles/globals.css';
import '../styles/tailwind.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import AuthProvider, { ProtectRoute } from '../contexts/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
