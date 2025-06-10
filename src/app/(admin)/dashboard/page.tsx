import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import DashboardActionMenu from '@/components/admin/DashboardActionMenu';
import { signOut } from '@/auth';
import { getAllPosts } from '@/lib/post';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

const DashBoardPage = async () => {
  const handleLogout = async () => {
    'use server';
    await signOut();
  };

  const posts = await getAllPosts();

  return (
    <div className="mx-auto container mt-10">
      <Button onClick={handleLogout}>ログアウト</Button>
      <Button>
        <Link href="/dashboard/create">新規記事作成</Link>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">更新日</TableHead>
            <TableHead>ステータス</TableHead>
            <TableHead>記事タイトル</TableHead>
            <TableHead className="text-right">アクション</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                {format(new Date(post.updatedAt), 'yyyy年M月d日', {
                  locale: ja,
                })}
              </TableCell>
              <TableCell>{post.published ? '公開中' : '非公開'}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell className="text-right">
                <DashboardActionMenu post={post} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashBoardPage;
