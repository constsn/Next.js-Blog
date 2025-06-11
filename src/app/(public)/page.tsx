import PostCard from '@/components/PostCard';
import NotFound from './post/[id]/not-found';
import LatestPostList from '@/components/LatestPostList';
import { getLatestPosts, getPublishedPosts, searchPosts } from '@/lib/post';
import { getAllTags } from '@/lib/tag';
import Link from 'next/link';

type SearchParams = {
  searchParams: Promise<{
    search?: string;
  }>;
};

const TopPostsPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = params.search || '';
  const posts = query ? await searchPosts(query) : await getPublishedPosts();
  if (!posts) return <NotFound />;

  if (query && posts.length === 0)
    return (
      <div className="p-4 text-gray-500">
        「{query}」に関する記事は見つかりませんでした。
      </div>
    );

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6">
      {query && posts.length > 0 && (
        <p className="text-gray-600 mb-4">
          「<span className="font-semibold">{query}</span>」の検索結果
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="flex flex-col gap-12">
          <LatestPostList posts={latestPosts} />
          <div className="border rounded p-4 shadow-md">
            <h2 className="text-lg font-bold border-b pb-2 mb-2">タグ一覧</h2>
            <div className="grid grid-cols-4 gap-4">
              {tags.map(tag => (
                <Link
                  href={`/tags/${tag.name}`}
                  key={tag.id}
                  className="shadow-sm hover:shadow-md transform transition-all hover:bg-gray-50 hover:-translate-y-1 duration-300 ease-in-out"
                >
                  <div>
                    <p>
                      {tag.name} <span>{`(${tag.posts.length})`}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPostsPage;
