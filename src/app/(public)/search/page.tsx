import LatestPostList from '@/components/post/LatestPostList';
import PostCard from '@/components/post/PostCard';
import TagList from '@/components/tag/TagList';
import SearchBox from '@/components/ui/SearchBox';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getLatestPosts, searchPosts } from '@/lib/db/post';
import { getAllTags } from '@/lib/db/tag';
import Link from 'next/link';

type SearchParams = {
  searchParams: Promise<{
    q?: string;
  }>;
};

const Page = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = params.q || '';

  const posts = await searchPosts(query);

  const paginatedPosts = posts.slice(0, POSTS_PER_PAGE);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  if (query && posts.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        「{query}」に関する記事は見つかりませんでした。
      </div>
    );
  }
  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <p className="text-gray-600 mb-8 border-b pb-2">
        「<span className="font-semibold">{query}</span>」の検索結果
      </p>
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
                  href={`/search/${i + 1}?q=${encodeURIComponent(query)}`}
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
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default Page;
