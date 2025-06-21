import DeleteCommentDialog from '@/components/admin/DeleteCommentDialog';
import DashboardNav from '@/components/dashboard/DashboardNav';
import { getComments } from '@/lib/db/comment';
import { ADMIN_COMMENTS_PER_PAGE } from '@/lib/constant';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Clock, Eye, Globe, Lock } from 'lucide-react';
import Link from 'next/link';

const Page = async () => {
  const comments = await getComments();
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const paginatedComments = comments.slice(0, ADMIN_COMMENTS_PER_PAGE);

  const totalPages = Math.ceil(comments.length / ADMIN_COMMENTS_PER_PAGE);

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <Globe className="w-4 h-4 text-green-500" />
    ) : (
      <Lock className="w-4 h-4 text-gray-500" />
    );
  };
  return (
    <DashboardNav isActive="comment" label="コメント管理">
      <div className="px-30 mt-12">
        <div className="px-6 py-6 bg-white rounded shadow-sm border border-gray-200">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  id
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  parentId
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  コメント内容
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  投稿者
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  記事
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  投稿日時
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedComments.map(comment => {
                const isMyComment = comment.authorEmail === adminEmail;
                const hasReplies = comment.replies.length > 0;
                return (
                  <tr key={comment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div
                        className={`text-sm text-center font-medium text-gray-900 ${
                          hasReplies
                            ? 'bg-indigo-600  text-white p-1 rounded-full'
                            : ''
                        }`}
                      >
                        {comment.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {comment.parentId ? comment.parentId : 'なし'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 items-center">
                        {getStatusIcon(comment.post.published)}
                        <div className="text-sm font-medium text-gray-900">
                          {comment.content}
                        </div>
                      </div>
                    </td>
                    <td className="flex items-center gap-2 px-6 py-4">
                      <span className="text-xs font-medium">
                        {comment.author}
                      </span>
                      {isMyComment && (
                        <span className="bg-blue-100 text-xs font-medium p-1 rounded-full text-blue-600">
                          管理人
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {comment.post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {format(new Date(comment.createdAt), 'yyyy年M月d日', {
                          locale: ja,
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/dashboard/post/${encodeURIComponent(
                            comment.post.slug
                          )}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        {hasReplies || (
                          <DeleteCommentDialog commentId={comment.id} />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => {
            if (i === 0) {
              return (
                <span
                  key={i}
                  className="px-3 py-1 border rounded font-bold bg-gray-200"
                >
                  {i + 1}
                </span>
              );
            }
            return (
              <Link
                key={i}
                href={`/dashboard/comment/pages/${i + 1}`}
                className="px-3 py-1 border rounded"
              >
                {i + 1}
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardNav>
  );
};

export default Page;
