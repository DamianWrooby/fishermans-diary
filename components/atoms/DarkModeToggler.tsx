import { IconButton, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const DarkModeToggler = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    console.log(localStorage.theme);
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, []);

  const changeColorMode = (): void => {
    toggleColorMode();
    if (colorMode === 'light') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else if (colorMode === 'dark') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <IconButton
      aria-label="Toggle dark mode"
      onClick={changeColorMode}
      icon={colorMode === 'light' ? <RiMoonLine /> : <RiSunLine />}
    />
  );
};

export default DarkModeToggler;
