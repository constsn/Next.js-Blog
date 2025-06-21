import DashboardNav from '@/components/dashboard/DashboardNav';
import DashboardPostTable from '@/components/dashboard/DashboardPostTable';
import { ADMIN_ITEMS_PER_PAGE } from '@/lib/constant';
import { getAllPosts } from '@/lib/db/post';
import Link from 'next/link';

type Prop = {
  params: Promise<{ page: number }>;
};

const Page = async ({ params }: Prop) => {
  const param = await params;
  const currentPage = param.page;

  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / ADMIN_ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ADMIN_ITEMS_PER_PAGE,
    currentPage * ADMIN_ITEMS_PER_PAGE
  );

  return (
    <DashboardNav isActive="post" label="記事管理">
      <div className="px-30 mt-12">
        <DashboardPostTable paginatedPosts={paginatedPosts} />
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            if (i === currentPage - 1) {
              return (
                <span
                  key={i}
                  className="px-3 py-1 border rounded font-bold bg-gray-200"
                >
                  {i + 1}
                </span>
              );
            }
            if (i === 0) {
              return (
                <Link
                  key={i}
                  href="/dashboard/post"
                  className="px-3 py-1 border rounded"
                >
                  {i + 1}
                </Link>
              );
            }
            return (
              <Link
                key={i}
                href={`/dashboard/post/pages/${i + 1}`}
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
