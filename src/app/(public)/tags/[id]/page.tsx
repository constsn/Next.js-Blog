import LatestPostList from '@/components/LatestPostList';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getLatestPosts } from '@/lib/post';
import { getAllTags, getPostsByTagName } from '@/lib/tag';
import Link from 'next/link';

type Params = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Params) => {
  const { id } = await params;

  const tagName = decodeURIComponent(id);

  const posts = await getPostsByTagName(tagName);
  const paginatedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6">
      <p className="text-xl mb-8 text-gray-800">
        <span>{tagName}</span>
        の記事一覧
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => {
              return i === 0 ? (
                <span
                  key={i}
                  className="px-3 py-1 border rounded font-bold bg-gray-200"
                >
                  {i + 1}
                </span>
              ) : (
                <Link
                  key={i}
                  href={`/tags/${id}/${i + 1}`}
                  className="px-3 py-1 border rounded"
                >
                  {i + 1}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <LatestPostList posts={latestPosts} />
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default page;
