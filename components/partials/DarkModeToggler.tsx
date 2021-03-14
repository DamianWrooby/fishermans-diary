import { IconButton, useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const DarkModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === 'dark') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [colorMode]);

  return (
    <IconButton
      aria-label="Toggle dark mode"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <RiMoonLine /> : <RiSunLine />}
    />
  );
};

export default DarkModeToggler;
