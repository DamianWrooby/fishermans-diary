import Menu from '../components/molecules/Menu';
import Image from 'next/image';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-300 dark:bg-bg-gray min-h-screen flex flex-col justify-between">
      <Menu />
      {children}
      <div className="w-1/2 max-w-xs">
        <Image
          src="/angler.png"
          alt=""
          width={450}
          height={265}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default Layout;
