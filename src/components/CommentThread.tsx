import { Comment } from '@/types/post';
import { formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';
import { User } from 'lucide-react';

type Props = {
  comment: Comment;
  allComments: Comment[];
  onReplyClick: (commentId: number) => void;
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
};

const CommentThread = ({ comment, allComments, onReplyClick, user }: Props) => {
  const replies = allComments.filter(c => c.parentId === comment.id);

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
  const isMyComment = adminEmail === comment.authorEmail;

  return (
    <div className="ml-4 mt-4 border-l border-gray-200 pl-4">
      <div className="flex items-center gap-2 text-sm text-gray-700 mb-1">
        <User
          className={`w-8 h-8 text-white ${
            isMyComment ? 'bg-blue-500' : 'bg-gray-500'
          }   rounded-full`}
        />
        <span className="font-medium">{comment.author}</span>
        {isMyComment && (
          <span className="bg-blue-100 p-1 rounded-full text-blue-600">
            管理人
          </span>
        )}
        <span className="text-xs text-gray-400 ml-2">
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
            locale: ja,
          })}
        </span>
      </div>
      <div className="flex gap-6">
        <p className="text-sm text-gray-800 mt-3">{comment.content}</p>
        <button
          onClick={() => onReplyClick(comment.id)}
          className="text-sm text-blue-500 hover:underline cursor-pointer mt-2"
        >
          返信する
        </button>
      </div>

      {replies.map(reply => (
        <CommentThread
          key={reply.id}
          comment={reply}
          allComments={allComments}
          onReplyClick={onReplyClick}
          user={user}
        />
      ))}
    </div>
  );
};

export default CommentThread;
