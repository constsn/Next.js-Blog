import Link from 'next/link';
import DeleteCommentDialog from '../admin/DeleteCommentDialog';
import { Clock, Eye, Globe, Lock } from 'lucide-react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

type Comment = {
  id: number;
  author: string;
  content: string;
};

interface CommentTableRowProps {
  comment: {
    id: number;
    parentId?: number | null;
    content: string;
    author: string;
    authorEmail?: string | null;
    createdAt: Date;
    replies: Comment[] | [];
    post: {
      title: string;
      slug: string;
      published: boolean;
    };
  };
}

const DashboardCommentTableRow = ({ comment }: CommentTableRowProps) => {
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isMyComment = comment.authorEmail === adminEmail;
  const hasReplies = comment.replies.length > 0;

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <Globe className="w-4 h-4 text-green-500" />
    ) : (
      <Lock className="w-4 h-4 text-gray-500" />
    );
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4">
        <div
          className={`text-sm text-center font-medium text-gray-900 ${
            hasReplies ? 'bg-indigo-600  text-white p-1 rounded-full' : ''
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
        <span className="text-xs font-medium">{comment.author}</span>
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
            href={`/dashboard/post/${encodeURIComponent(comment.post.slug)}`}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </Link>
          {hasReplies || <DeleteCommentDialog commentId={Number(comment.id)} />}
        </div>
      </td>
    </tr>
  );
};

export default DashboardCommentTableRow;
