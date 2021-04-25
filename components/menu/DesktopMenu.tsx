import { useRouter } from 'next/router';
import Link from 'next/link';
import LanguageToggler from '../partials/LanguageToggler';
import DarkModeToggler from '../partials/DarkModeToggler';
import useLanguage from '../../hooks/useLanguage';
import en from '../../translations/en';
import pl from '../../translations/pl';
import HomeIcon from '../../public/home_icon.svg';

type DesktopMenuProps = {
  data: any;
  locale: string;
};

const DesktopMenu = ({ data }: DesktopMenuProps) => {
  const router = useRouter();
  const t = useLanguage() === 'en' ? en : pl;

  return (
    <div className="flex w-full justify-between flex-row">
      <div className="hidden sm:flex justify-between w-full">
        <nav className="p-4">
          {data ? (
            <ul className="flex flex-row">
              <li
                className={
                  router.pathname == '/'
                    ? 'dark:text-blue-300 text-blue-500'
                    : 'dark:hover:text-blue-300 hover:text-blue-500'
                }
              >
                <Link href="/">
                  <a href="/">
                    <HomeIcon className="fill-current mr-2" />
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
              <li
                className={
                  router.pathname == '/ranking'
                    ? 'dark:text-blue-300 text-blue-500'
                    : 'dark:hover:text-blue-300 hover:text-blue-500'
                }
              >
                <Link href="/ranking">
                  <a href="/ranking" className="p-1">
                    {t.ranking}
                  </a>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-row">
              <li
                className={
                  router.pathname == '/'
                    ? 'dark:text-blue-300 text-blue-500'
                    : 'dark:hover:text-blue-300 hover:text-blue-500'
                }
              >
                <Link href="/">
                  <a href="/">
                    <HomeIcon className="fill-current mr-2" />
                  </a>
                </Link>
              </li>
            </ul>
          )}
        </nav>
        <div className="flex flex-row items-center">
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
          <div className="p-1 mr-4">
            <LanguageToggler />
          </div>
          <div className="p-1 mr-4">
            <DarkModeToggler />
          </div>
        </div>
      </div>
    </div>
  );
};
export default DesktopMenu;
