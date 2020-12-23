import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import Link from 'next/link';
import { useAuth } from '../../contexts/authContext';

const Menu = (): JSX.Element => {
  const user = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="w-full justify-between flex flex-row">
      <div className="p-2">
        <Link href="/">
          <a href="/" className="p-1">
            Home
          </a>
        </Link>
        {user.data ? (
          <Link href="/account">
            <a href="/account" className="p-1">
              My account
            </a>
          </Link>
        ) : (
          <Link href="/login">
            <a href="/login" className="p-1">
              Login
            </a>
          </Link>
        )}
      </div>
      <div className="m-2">
        <IconButton
          aria-label="Toggle dark mode"
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <RiMoonLine /> : <RiSunLine />}
        />
      </div>
    </div>
  );
};

export default Menu;
