import Link from 'next/link';
import DarkModeToggler from '../atoms/DarkModeToggler';
import { useAuth } from '../../contexts/authContext';

const Menu = (): JSX.Element => {
  const user = useAuth();

  return (
    <div className="w-full justify-between flex flex-row">
      <nav className="p-4">
        <Link href="/">
          <a href="/" className="p-1">
            Home
          </a>
        </Link>
      </nav>
      <div className="flex flex-row items-center">
        {user.data ? (
          <div>
            <nav>
              <Link href="/account">
                <a href="/account">
                  {user.data.photoURL ? (
                    <div className="flex flex-row justify-center items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img src={user.data.photoURL} />
                      </div>
                      <div className="mr-2">
                        {user.data.displayName
                          ? user.data.displayName
                          : user.data.email}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center">
                      <div className="p-1 w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img src="/user.svg" />
                      </div>
                      <div className="mr-2">
                        {user.data.displayName
                          ? user.data.displayName
                          : user.data.email}
                      </div>
                    </div>
                  )}
                </a>
              </Link>
            </nav>
          </div>
        ) : (
          <nav className="p-4 mr-2">
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
          </nav>
        )}
        <div className="p-1 mr-4">
          <DarkModeToggler />
        </div>
      </div>
    </div>
  );
};

export default Menu;
