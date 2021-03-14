import { useRouter } from 'next/router';

function useLanguage(): string {
  const router = useRouter();
  const { locale } = router;

  return locale;
}

export default useLanguage;
