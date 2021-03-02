import { useRouter } from 'next/router';
import { setCookie } from 'nookies';

const LanguageToggler = (): JSX.Element => {
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
