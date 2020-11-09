import '../styles/globals.css';
import '../styles/tailwind.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { UserProvider } from '../contexts/userContext';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}

export default MyApp;
