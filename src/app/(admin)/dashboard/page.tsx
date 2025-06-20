import DashboardNav from '@/components/DashboardNav';
import { getComments } from '@/lib/comment';
import { getAllPosts } from '@/lib/post';
import { FileText, Globe, Lock, MessageSquare } from 'lucide-react';

const DashBoardPage = async () => {
  const posts = await getAllPosts();
  const comments = await getComments();

  const draftPosts = posts.filter(post => !post.published);
  const publishedPosts = posts.filter(post => post.published);

  return (
    <DashboardNav isActive="dashboard" label="ダッシュボード">
      <div className="px-30 mt-12">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">総記事数</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {posts.length}
                </p>
              </div>
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  総コメント数
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {comments.length}
                </p>
              </div>
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">下書き</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {draftPosts.length}
                </p>
              </div>
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          <div className="bg-white rounded-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">公開済み</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {publishedPosts.length}
                </p>
              </div>
              <Globe className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </DashboardNav>
  );
};

export default DashBoardPage;

{
  /* <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white ">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">shuto tech</h1>
          <p className="text-sm text-gray-500 mt-1">管理ダッシュボード</p>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left bg-blue-50 text-blue-700 border border-blue-200"
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5" />
                <span className="font-medium">ダッシュボード</span>
              </div>
            </Link>
            <Link
              href="/dashboard/post"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100"
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
              <h2 className="text-lg font-semibold text-gray-900">
                ダッシュボード
              </h2>
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
      </div>
    </div> */
}
