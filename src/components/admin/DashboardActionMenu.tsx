'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import Link from 'next/link';
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

const DashboardActionMenu = ({ post }: PostProp) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await handleDeletePost(post.id);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>⚙️</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/dashboard/post/${post.id}/edit`}>編集</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/post/${post.id}`}>詳細</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={e => e.preventDefault()}>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span className='className="w-full cursor-pointer text-red-500'>
                削除
              </span>
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
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardActionMenu;
