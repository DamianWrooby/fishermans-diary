import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/router';
import MenuButton from './MenuButton';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const Menu = () => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMobileOpen = (): void => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
      document.body.style.overflow = 'unset';
    } else {
      setIsMobileOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <>
      <MenuButton open={isMobileOpen} handleClick={handleMobileOpen} />
      <MobileMenu data={user.data} locale={locale} isOpen={isMobileOpen} />
      <DesktopMenu data={user.data} locale={locale} />
    </>
  );
};

export default Menu;
