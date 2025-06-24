import LatestPostList from '@/components/post/LatestPostList';
import PostCard from '@/components/post/PostCard';
import TagList from '@/components/tag/TagList';
import Pagination from '@/components/ui/Pagination';
import SearchBox from '@/components/ui/SearchBox';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getLatestPosts, getPublishedPosts } from '@/lib/db/post';
import { getAllTags } from '@/lib/db/tag';

type Params = {
  params: Promise<{ page: number }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages - 1 }).map((_, i) => ({
    page: (i + 2).toString(),
  }));
}

const Page = async ({ params }: Params) => {
  const { page: currentPage } = await params;

  const [posts, latestPosts, tags] = await Promise.all([
    getPublishedPosts(),
    getLatestPosts(),
    getAllTags(),
  ]);

  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return (
    <div className="mx-auto container px-4 lg:px-24 mt-10 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
            {paginatedPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} />
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
