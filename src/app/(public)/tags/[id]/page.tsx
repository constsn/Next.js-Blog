import LatestPostList from '@/components/post/LatestPostList';
import PostCard from '@/components/post/PostCard';
import TagList from '@/components/tag/TagList';
import SearchBox from '@/components/ui/SearchBox';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getAllTags } from '@/lib/db/tag';
import Link from 'next/link';
import NotFound from '../../post/[slug]/not-found';
import { getBasePageData } from '@/lib/pageData';

type Params = {
  params: Promise<{ id: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map(tag => ({
    id: encodeURIComponent(tag.name),
  }));
}

const page = async ({ params }: Params) => {
  const { id } = await params;
  const tagName = decodeURIComponent(id);

  const data = await getBasePageData();
  if (!data) return <NotFound />;
  const { posts: allPosts, latestPosts, uniqueTagsByName } = data;

  const filteredPosts = allPosts.filter(post =>
    post.tags.some(tag => tag.name === tagName)
  );
  const paginatedPosts = filteredPosts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  return (
    <div className="mx-auto container px-4 lg:px-24 mt-10 py-6">
      <p className="text-xl mb-8 text-gray-800 border-b pb-2">
        <span>{tagName}</span>
        の記事一覧
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24 items-start">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            {paginatedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-15">
            {Array.from({ length: totalPages }).map((_, i) => {
              return i === 0 ? (
                <span
                  key={i}
                  className="px-3 py-1 border text-white rounded font-bold bg-indigo-600"
                >
                  {i + 1}
                </span>
              ) : (
                <Link
                  key={i}
                  href={`/tags/${encodeURIComponent(id)}/${i + 1}`}
                  className="px-3 py-1 rounded pagination hover:border hover:text-white"
                >
                  {i + 1}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={uniqueTagsByName} />
        </div>
      </div>
    </div>
  );
};

export default page;
