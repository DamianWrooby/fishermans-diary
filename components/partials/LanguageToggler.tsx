import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

const LanguageToggler = () => {
  const router = useRouter();
  const { locale } = useRouter();

  const changeLan = (lan) => {
    setCookie(null, 'NEXT_LOCALE', lan, { maxAge: 1 * 2 * 60 * 60 });
    if (lan === 'en') {
      router.push(`/en${router.pathname}`, `/en${router.pathname}`, {
        locale: 'en',
      });
    } else if (lan === 'pl') {
      router.push(`/pl${router.pathname}`, `/pl${router.pathname}`, {
        locale: 'pl',
      });
    }
  };

  return (
    <div className="inline text-xs">
      <button
        className={
          locale === 'en'
            ? 'text-blue-600 dark:text-white'
            : 'text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
        }
        onClick={() => changeLan('en')}
      >
        EN{' '}
      </button>
      <span> / </span>
      <button
        className={
          locale === 'pl'
            ? 'text-blue-600 dark:text-white'
            : 'text-blue-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-white'
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
