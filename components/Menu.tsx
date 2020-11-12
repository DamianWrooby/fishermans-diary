import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Menu = (): React.ReactNode => {
  const user = useAuth();
  return (
    <div className="w-full justify-between flex flex-row">
      <div className="p-2">
        <Link href="/">
          <a className="p-1">Home</a>
        </Link>
        {user ? (
          <Link href="/account">
            <a className="p-1">My account</a>
          </Link>
        ) : (
          <Link href="/login">
            <a className="p-1">Login</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
