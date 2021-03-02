type MobileMenuProps = {
  isOpen: boolean;
  locale: string;
};

const MobileMenu = ({ isOpen, locale }: MobileMenuProps): JSX.Element => {
  return (
    <div
      className={`absolute w-screen origin-top z-10 bg-bg-gray${
        isOpen ? ' h-screen' : ' h-0'
      }`}
    ></div>
  );
};

export default MobileMenu;
