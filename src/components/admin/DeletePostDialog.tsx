'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { handleDeletePost } from '@/lib/post';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';

type PostProp = {
  post: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const DeletePostDialog = ({ post }: PostProp) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await handleDeletePost(post.id);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2 className=" text-gray-400 hover:text-red-600 transition-colors w-4 h-4 cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は元に戻せません。データが完全に削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
          >
            {isPending ? '削除中...' : '削除する'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostDialog;
