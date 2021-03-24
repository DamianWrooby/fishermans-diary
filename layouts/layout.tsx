import Menu from '../components/menu/Menu';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="font-body bg-gray-300 dark:bg-bg-gray min-h-screen flex flex-col justify-between">
      <Menu />
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
            transition: { duration: 0.1 },
          },
          pageAnimate: {
            opacity: 1,
            transition: { duration: 0.1 },
          },
        }}
      >
        {children}
      </motion.div>
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
