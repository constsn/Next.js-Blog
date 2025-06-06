import Link from 'next/link';
import SearchBox from './SearchBox';

const PublicHeader = () => (
  <header className="bg-gray-100 shadow">
    <div className="mx-auto container py-6 px-4 flex items-center justify-between">
      <Link className="text-2xl font-semibold" href="/">
        shuto tech
      </Link>
      <SearchBox />
    </div>
  </header>
);

export default PublicHeader;
