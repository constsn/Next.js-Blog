import { signOut } from '@/auth';
import { FileText, Home, LogOut, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

type Props = {
  isActive: string;
  label: string;
  children?: React.ReactNode;
};

const DashboardNav = async ({ isActive, label, children }: Props) => {
  const handleLogout = async () => {
    'use server';
    await signOut();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-white ">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="hover:underline">
            <h1 className="text-xl font-bold text-gray-900">shuto tech</h1>
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-gray-500 mt-1 hover:underline"
          >
            管理ダッシュボード
          </Link>
        </div>
        <nav className="p-4">
          <div className="space-y-2">
            <Link
              href="/dashboard"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                isActive === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              } `}
            >
              <div className="flex items-center space-x-3">
                <Home className="w-5 h-5" />
                <span className="font-medium">ダッシュボード</span>
              </div>
            </Link>
            <Link
              href="/dashboard/post"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                isActive === 'post'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              } `}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5" />
                <span className="font-medium">記事管理</span>
              </div>
            </Link>
            <Link
              href="/dashboard/comment"
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left ${
                isActive === 'comment'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              } `}
            >
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">コメント管理</span>
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">ログアウト</span>
              </div>
            </button>
          </div>
        </nav>
      </div>
      <div className="flex flex-1 flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-30 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{label}</h2>
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
        {children}
      </div>
    </div>
  );
};

export default DashboardNav;
