import Menu from '../components/molecules/Menu';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-300 dark:bg-bg-gray">
      <Menu />
      {children}
      <img src="/angler.png" />
    </div>
  );
};

export default Layout;
