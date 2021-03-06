import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import en from '../../translations/en';
import pl from '../../translations/pl';

const NoUserLinks = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : pl;

  return (
    <section className="flex flex-col justify-center items-center w-full">
      <Link href="/login">
        <a href="/login" className="p-2">
          <Button colorScheme="blue" size="sm">
            {t.signin}
          </Button>
        </a>
      </Link>
      <Link href="/create-account">
        <a href="/create-account" className="p-2">
          <Button
            rightIcon={<FaArrowRight />}
            colorScheme="blue"
            variant="outline"
            size="sm"
          >
            {t.createaccount}
          </Button>
        </a>
      </Link>
    </section>
  );
};

export default NoUserLinks;
