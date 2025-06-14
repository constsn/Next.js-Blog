import { signOut } from '@/auth';
import DeletePostDialog from '@/components/admin/DeletePostDialog';
import { Button } from '@/components/ui/button';
import { ADMIN_ITEMS_PER_PAGE } from '@/lib/constant';
import { getAllPosts } from '@/lib/post';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Clock, Edit3, Eye, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

type Prop = {
  params: Promise<{ page: number }>;
};

const Page = async ({ params }: Prop) => {
  const param = await params;
  const currentPage = param.page;

  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / ADMIN_ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ADMIN_ITEMS_PER_PAGE,
    currentPage * ADMIN_ITEMS_PER_PAGE
  );

  const handleLogout = async () => {
    'use server';
    await signOut();
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <Globe className="w-4 h-4 text-green-500" />
    ) : (
      <Lock className="w-4 h-4 text-gray-500" />
    );
  };

  const getStatusBadge = (status: boolean) => {
    return status
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="mx-auto container px-4 lg:px-50 mt-10">
      <Button onClick={handleLogout}>ログアウト</Button>
      <Button className="mb-20">
        <Link href="/dashboard/create">新規記事作成</Link>
      </Button>
      <div className="px-6 py-2 bg-white rounded shadow-sm border border-gray-200">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                記事タイトル
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                更新日
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                アクション
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedPosts.map(post => (
              <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex gap-4 items-center">
                    {getStatusIcon(post.published)}
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge(
                      post.published
                    )}`}
                  >
                    {post.published ? '公開中' : '非公開'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-sm text-gray-900">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {format(new Date(post.updatedAt), 'yyyy年M月d日', {
                      locale: ja,
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/post/${post.id}`}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/dashboard/post/${post.id}/edit`}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <DeletePostDialog post={post} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          if (i === currentPage - 1) {
            return (
              <span
                key={i}
                className="px-3 py-1 border rounded font-bold bg-gray-200"
              >
                {i + 1}
              </span>
            );
          }

          if (i === 0) {
            return (
              <Link
                key={i}
                href="/dashboard"
                className="px-3 py-1 border rounded"
              >
                {i + 1}
              </Link>
            );
          }

          return (
            <Link
              key={i}
              href={`/dashboard/pages/${i + 1}`}
              className="px-3 py-1 border rounded"
            >
              {i + 1}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
