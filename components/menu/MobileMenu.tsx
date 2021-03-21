import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageToggler from '../partials/LanguageToggler';
import DarkModeToggler from '../partials/DarkModeToggler';
import en from '../../translations/en';
import pl from '../../translations/pl';
import HomeIcon from '../../public/home_icon.svg';

type MobileMenuProps = {
  data: any;
  isOpen: boolean;
  locale: string;
};

const MobileMenu = ({ data, isOpen, locale }: MobileMenuProps) => {
  const router = useRouter();
  const t = locale === 'en' ? en : pl;

  return (
    <div
      className={`mobile-menu fixed sm:hidden overflow-hidden flex flex-col justify-around w-screen origin-top z-20 bg-gray-300 dark:bg-bg-gray ${
        isOpen ? ' h-screen' : ' h-0'
      }`}
    >
      <nav className="p-4 text-center">
        {data ? (
          <ul className="flex flex-col">
            <li
              className={
                router.pathname == '/login'
                  ? 'dark:text-blue-300 text-blue-500 p-4'
                  : 'dark:hover:text-blue-300 hover:text-blue-500 p-4'
              }
            >
              <Link href="/">
                <a href="/">
                  <HomeIcon className="m-auto fill-current mr-2 text-white hover:text-blue-300" />
                </a>
              </Link>
            </li>
            <li
              className={
                router.pathname == '/catches/my-catches'
                  ? 'dark:text-blue-300 text-blue-500 p-4'
                  : 'dark:hover:text-blue-300 hover:text-blue-500 p-4'
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
          <ul className="flex flex-col justify-center">
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
          </ul>
        )}
      </nav>
      <div className="flex flex-row justify-center items-center">
        {data ? (
          <div>
            <nav>
              <Link href="/account">
                <a href="/account">
                  {data.photoURL ? (
                    <div className="flex flex-row justify-center items-center">
                      <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img src={data.photoURL} />
                      </div>
                      <div className="mr-2 hover:text-blue-300">
                        {data.displayName ? data.displayName : data.email}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-row justify-center items-center">
                      <div className="p-1 w-8 h-8 mr-2 rounded-full bg-gray-300 overflow-hidden">
                        <img src="/user.svg" />
                      </div>
                      <div className="mr-2 hover:text-blue-300">
                        {data.displayName ? data.displayName : data.email}
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
        <div className="p-4">
          <LanguageToggler />
        </div>
        <div className="p-4">
          <DarkModeToggler />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;