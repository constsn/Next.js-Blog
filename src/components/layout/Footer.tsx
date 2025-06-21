import { Home } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full mx-auto py-4 text-center text-sm text-gray-500 mt-auto">
      <p>© 2025 shuto tech. All rights reserved.</p>
      <Link href="/" className="text-center flex mt-4 justify-center">
        <Home />
      </Link>
    </footer>
  );
};

export default Footer;
