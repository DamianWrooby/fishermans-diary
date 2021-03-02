import { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'next/router';
import MenuButton from './MenuButton';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const Menu = (): JSX.Element => {
  const user = useAuth();
  const router = useRouter();
  const { locale } = router;
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleMobileOpen = (): void => {
    isMobileOpen ? setIsMobileOpen(false) : setIsMobileOpen(true);
  };

  return (
    <>
      <MenuButton open={isMobileOpen} handleClick={handleMobileOpen} />
      <MobileMenu locale={locale} isOpen={isMobileOpen} />
      <DesktopMenu data={user.data} locale={locale} />
    </>
  );
};

export default Menu;
