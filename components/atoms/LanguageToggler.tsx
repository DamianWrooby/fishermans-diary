import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';

const LanguageToggler = (): JSX.Element => {
  const router = useRouter();
  const { locale } = useRouter();
  const cookies = parseCookies();

  useEffect(() => {
    console.log({ cookies });
  }, []);

  const changeLan = (lan) => {
    setCookie(null, 'NEXT_LOCALE', lan, { maxAge: 1 * 2 * 60 * 60 });
    if (lan === 'en') {
      router.push(`/en${router.pathname}`, `/en${router.pathname}`, {
        locale: 'en',
      });
    } else if (lan === 'pl') {
      console.log(router.pathname);
      router.push(`/pl${router.pathname}`, `/pl${router.pathname}`, {
        locale: 'pl',
      });
    }
    console.log({ cookies });
  };

  return (
    <div className="inline text-xs">
      <button
        className={
          locale === 'en' ? 'text-white' : 'text-gray-500 hover:text-white'
        }
        onClick={() => changeLan('en')}
      >
        EN{' '}
      </button>
      <span> / </span>
      <button
        className={
          locale === 'pl' ? 'text-white' : 'text-gray-500 hover:text-white'
        }
        onClick={() => changeLan('pl')}
      >
        {' '}
        PL
      </button>
    </div>
  );
};

export default LanguageToggler;
