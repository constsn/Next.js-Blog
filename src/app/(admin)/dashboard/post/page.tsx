import DashboardNav from '@/components/DashboardNav';
import DashboardPagination from '@/components/DashboardPagination';
import DashboardPostTable from '@/components/DashboardPostTable';

import { ADMIN_ITEMS_PER_PAGE } from '@/lib/constant';
import { getAllPosts } from '@/lib/post';

const Page = async () => {
  const posts = await getAllPosts();
  const paginatedPosts = posts.slice(0, ADMIN_ITEMS_PER_PAGE);
  return (
    <DashboardNav isActive="post" label="記事管理">
      <div className="px-30 mt-12">
        <DashboardPostTable paginatedPosts={paginatedPosts} />
        <DashboardPagination />
      </div>
    </DashboardNav>
  );
};

export default Page;

{
  /*  <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white ">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">shuto tech</h1>
          <p className="text-sm text-gray-500 mt-1">管理ダッシュボード</p>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5" />
                <span className="font-medium">ダッシュボード</span>
              </div>
            </Link>
            <Link
              href="/dashboard/post"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left bg-blue-50 text-blue-700 border border-blue-200"
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <span className="font-medium">記事管理</span>
              </div>
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-12 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">記事管理</h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date().toLocaleDateString('ja-JP', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>
            </div>
            <Link
              href="/dashboard/create"
              className="bg-gray-800 hover:bg-gray-300 text-white px-4 py-2 rounded flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>新規記事</span>
            </Link>
          </div>
        </header>
        <div className="px-12 mt-12">
          <DashboardPostTable paginatedPosts={paginatedPosts} />
          <DashboardPagination />
        </div>
      </div>
    </div>*/
}
