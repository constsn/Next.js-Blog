import Link from 'next/link';

const AdminHeader = () => {
  return (
    <header className="bg-gray-100 shadow">
      <div className="mx-auto container py-6 px-4 flex items-center justify-between">
        <Link className="text-2xl font-semibold" href="/">
          shuto tech
        </Link>
        <h1 className="text-2xl font-semibold">管理ページ</h1>
      </div>
    </header>
  );
};

export default AdminHeader;
