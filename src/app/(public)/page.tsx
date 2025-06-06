import PostCard from '@/components/PostCard';
import NotFound from './post/[id]/not-found';
import { getPosts, searchPosts } from '@/lib/post';

type SearchParams = {
  searchParams: Promise<{
    search?: string;
  }>;
};

const TopPostsPage = async ({ searchParams }: SearchParams) => {
  const params = await searchParams;
  const query = params.search || '';

  const posts = query ? await searchPosts(query) : await getPosts();

  if (!posts) return <NotFound />;

  if (query && posts.length === 0)
    return (
      <div className="p-4 text-gray-500">
        「{query}」に関する記事は見つかりませんでした。
      </div>
    );

  return (
    <div className="mx-auto container px-4 py-6">
      {query && posts.length > 0 && (
        <p className="text-gray-600 mb-4">
          「<span className="font-semibold">{query}</span>」の検索結果
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TopPostsPage;
