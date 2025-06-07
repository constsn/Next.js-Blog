import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Post } from '@/types/post';
import Link from 'next/link';

type PostProp = {
  post: Post;
};

const DashboardActionMenu = ({ post }: PostProp) => {
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
        <DropdownMenuItem>削除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardActionMenu;
