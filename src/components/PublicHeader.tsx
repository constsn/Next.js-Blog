import Link from 'next/link';
import SearchBox from './SearchBox';

const PublicHeader = () => (
  <header className="bg-gray-100 shadow">
    <div className="mx-auto container py-6 px-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-semibold hover:underline">
          shuto tech
        </Link>
        <Link href="/tags" className="text-xl hover:underline">
          タグ
        </Link>
      </div>
      <SearchBox />
    </div>
  </header>
);

export default PublicHeader;
