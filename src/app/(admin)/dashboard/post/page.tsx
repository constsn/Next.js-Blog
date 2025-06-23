import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardPagination from '@/components/dashboard/DashboardPagination';
import DashboardPostTable from '@/components/dashboard/DashboardPostTable';
import { ADMIN_ITEMS_PER_PAGE } from '@/lib/constant';
import { getAllPosts } from '@/lib/db/post';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const posts = await getAllPosts();
  const paginatedPosts = posts.slice(0, ADMIN_ITEMS_PER_PAGE);
  return (
    <DashboardNav isActive="post" label="記事管理">
      <div className="px-30 mt-12">
        <DashboardPostTable paginatedPosts={paginatedPosts} />
        <DashboardPagination />
      </div>
    </DashboardNav>
  );
};

export default Page;
