import { POSTS_PER_PAGE } from '@/lib/constant';
import Link from 'next/link';
import NotFound from './post/[slug]/not-found';
import SearchBox from '@/components/ui/SearchBox';
import PostCard from '@/components/post/PostCard';
import LatestPostList from '@/components/post/LatestPostList';
import TagList from '@/components/tag/TagList';
import { getBasePageData } from '@/lib/pageData';

export const revalidate = 30;

const HomePage = async () => {
  const data = await getBasePageData();
  if (!data) return <NotFound />;

  const { posts, latestPosts, uniqueTagsByName } = data;

  const paginatedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
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
                  href={`/pages/${i + 1}`}
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

export default HomePage;
