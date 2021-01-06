import { IconButton, useColorMode } from '@chakra-ui/react';
import { RiSunLine, RiMoonLine } from 'react-icons/ri';
import Link from 'next/link';
import { useAuth } from '../../contexts/authContext';

const Menu = (): JSX.Element => {
  const user = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="w-full justify-between flex flex-row">
      <nav className="p-4">
        <Link href="/">
          <a href="/" className="p-1">
            Home
          </a>
        </Link>
      </nav>
      <div className="flex flex-row">
        <nav className="p-4 mr-2">
          {user.data ? (
            <Link href="/account">
              <a href="/account" className="p-3">
                My account
              </a>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <a href="/login" className="p-3">
                  Sign In
                </a>
              </Link>
              <Link href="/create-account">
                <a href="/create-account" className="p-3">
                  Sign Up
                </a>
              </Link>
            </>
          )}
        </nav>
        <div className="p-1">
          <IconButton
            aria-label="Toggle dark mode"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <RiMoonLine /> : <RiSunLine />}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
