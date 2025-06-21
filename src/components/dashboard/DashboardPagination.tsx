import { ADMIN_ITEMS_PER_PAGE } from '@/lib/constant';
import { getAllPosts } from '@/lib/db/post';
import Link from 'next/link';

const DashboardPagination = async () => {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / ADMIN_ITEMS_PER_PAGE);
  return (
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
            href={`/dashboard/post/pages/${i + 1}`}
            className="px-3 py-1 border rounded"
          >
            {i + 1}
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardPagination;
