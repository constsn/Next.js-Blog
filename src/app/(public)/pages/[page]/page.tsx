import LatestPostList from '@/components/LatestPostList';
import Pagination from '@/components/Pagination';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getLatestPosts, getPublishedPosts, searchPosts } from '@/lib/post';
import { getAllTags } from '@/lib/tag';

type Params = {
  params: Promise<{ page: number }>;
  searchParams: Promise<{ search: string }>;
};

const Page = async ({ params, searchParams }: Params) => {
  const { page: currentPage } = await params;
  const param = await searchParams;
  const query = param.search;

  const posts = query ? await searchPosts(query) : await getPublishedPosts();

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6">
      {query && posts.length > 0 && (
        <p className="text-gray-600 mb-4">
          「<span className="font-semibold">{query}</span>」の検索結果
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {paginatedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            query={query}
          />
        </div>
        <div className="flex flex-col gap-12">
          <LatestPostList posts={latestPosts} />
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default Page;
