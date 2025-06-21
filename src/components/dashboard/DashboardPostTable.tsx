import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Clock, Edit3, Eye, Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import DeletePostDialog from '../admin/DeletePostDialog';

type Prop = {
  paginatedPosts: {
    id: number;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const DashboardPostTable = async ({ paginatedPosts }: Prop) => {
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
    <div className="px-16 py-6 bg-white rounded shadow-sm border border-gray-200">
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
            <tr key={post.id} className="hover:bg-gray-50">
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
                    href={`/dashboard/post/${encodeURIComponent(post.slug)}`}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link
                    href={`/dashboard/post/${encodeURIComponent(
                      post.slug
                    )}/edit`}
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
  );
};

export default DashboardPostTable;
