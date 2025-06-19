import PostCard from '@/components/PostCard';
import LatestPostList from '@/components/LatestPostList';
import { getLatestPosts, getPublishedPosts, searchPosts } from '@/lib/post';
import { getAllTags } from '@/lib/tag';
import { POSTS_PER_PAGE } from '@/lib/constant';
import Link from 'next/link';
import TagList from '@/components/TagList';
import SearchBox from '@/components/SearchBox';
import NotFound from './post/[slug]/not-found';

type SearchParams = {
  searchParams: Promise<{
    search?: string;
  }>;
};

const HomePage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = params.search || '';
  const posts = query ? await searchPosts(query) : await getPublishedPosts();

  if (!posts) return <NotFound />;
  if (query && posts.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        「{query}」に関する記事は見つかりませんでした。
      </div>
    );
  }

  const paginatedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6 mt-10">
      {query && posts.length > 0 && (
        <p className="text-gray-600 mb-8 border-b pb-2">
          「<span className="font-semibold">{query}</span>」の検索結果
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-14">
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
                  className="px-3 py-1 border text-white rounded font-bold bg-indigo-600"
                >
                  {i + 1}
                </span>
              ) : (
                <Link
                  key={i}
                  href={
                    query
                      ? `/pages/${i + 1}/?search=${encodeURIComponent(query)}`
                      : `/pages/${i + 1}`
                  }
                  className="px-3 py-1 rounded pagination hover:border hover:text-white"
                >
                  {i + 1}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
