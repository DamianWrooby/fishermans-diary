import Link from 'next/link';
import DarkModeToggler from '../atoms/DarkModeToggler';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/router';
import en from '../../translations/en';
import pl from '../../translations/pl';
import LanguageToggler from '../atoms/LanguageToggler';

const Menu = (): JSX.Element => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  return (
    <div className="w-full justify-between flex flex-row">
      <nav className="p-4">
        {user.data ? (
          <ul className="flex flex-row">
            <li
              className={
                router.pathname == '/'
                  ? 'dark:text-blue-300 text-blue-500'
                  : 'dark:hover:text-blue-300 hover:text-blue-500'
              }
            >
              <Link href="/">
                <a href="/" className="p-1">
                  {t.home}
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == '/catches/my-catches'
                  ? 'dark:text-blue-300 text-blue-500'
                  : 'dark:hover:text-blue-300 hover:text-blue-500'
              }
            >
              <Link href="/catches/my-catches">
                <a href="/catches/my-catches" className="p-1">
                  {t.mycatches}
                </a>
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row">
            <li
              className={
                router.pathname == '/catches/my-catches'
                  ? 'dark:text-blue-300 text-blue-500'
                  : 'dark:hover:text-blue-300 hover:text-blue-500'
              }
            >
              <Link href="/">
                <a href="/" className="p-1">
                  {t.home}
                </a>
              </Link>
            </li>
          </ul>
        )}
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
                      <div className="mr-2 hover:text-blue-300">
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
                      <div className="mr-2 hover:text-blue-300">
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
            <ul className="flex flex-row">
              <li
                className={
                  router.pathname == '/login'
                    ? 'dark:text-blue-300 text-blue-500'
                    : 'dark:hover:text-blue-300 hover:text-blue-500'
                }
              >
                <Link href="/login">
                  <a href="/login" className="p-3">
                    {t.signin}
                  </a>
                </Link>
              </li>
              <li
                className={
                  router.pathname == '/create-account'
                    ? 'dark:text-blue-300 text-blue-500'
                    : 'dark:hover:text-blue-300 hover:text-blue-500'
                }
              >
                <Link href="/create-account">
                  <a href="/create-account" className="p-3">
                    {t.signup}
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="p-1 mr-4">
          <LanguageToggler />
        </div>
        <div className="p-1 mr-4">
          <DarkModeToggler />
        </div>
      </div>
    </div>
  );
};

export default Menu;
