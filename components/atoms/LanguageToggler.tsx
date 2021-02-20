import { useRouter } from 'next/router';
import { parseCookies, setCookie } from 'nookies';

const LanguageToggler = (): JSX.Element => {
  const router = useRouter();

  const changeLan = (lan) => {
    const cookies = parseCookies();
    console.log({ cookies });
    setCookie(null, 'NEXT_LOCALE', lan, { maxAge: 30 * 24 * 60 * 60 });
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
  };

  return (
    <div className="inline">
      <button onClick={() => changeLan('en')}>EN</button>/
      <button onClick={() => changeLan('pl')}>PL</button>
    </div>
  );
};

export default LanguageToggler;
