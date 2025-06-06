import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const DashBoardPage = () => {
  const handleLogout = async () => {
    'use server';
    await signOut();
  };
  return (
    <div>
      ああああ
      <Button onClick={handleLogout}>ログアウト</Button>
      <Button>
        <Link href="/dashboard/create">新規記事作成</Link>
      </Button>
    </div>
  );
};

export default DashBoardPage;
