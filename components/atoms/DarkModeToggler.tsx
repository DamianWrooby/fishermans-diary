import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';

const DarkModeToggler = (): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();

  const changeColorMode = (): void => {
    toggleColorMode();
    if (colorMode === 'light') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else if (colorMode === 'dark') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
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
