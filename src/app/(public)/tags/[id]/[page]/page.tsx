import LatestPostList from '@/components/LatestPostList';
import PostCard from '@/components/PostCard';
import SearchBox from '@/components/SearchBox';
import TagList from '@/components/TagList';
import { POSTS_PER_PAGE } from '@/lib/constant';
import { getLatestPosts } from '@/lib/post';
import { getAllTags, getPostsByTagName } from '@/lib/tag';
import Link from 'next/link';

type Params = {
  params: Promise<{ page: number; id: string }>;
};

const Page = async ({ params }: Params) => {
  const { page: currentPage, id } = await params;
  const tagName = decodeURIComponent(id);

  const posts = await getPostsByTagName(tagName);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  return (
    <div className="mx-auto container px-4 lg:px-24 mt-10 py-6">
      <p className="text-xl mb-8 text-gray-800">
        <span>{tagName}</span>
        の記事一覧
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
              if (i === 0) {
                return (
                  <Link
                    key={i}
                    href={`/tags/${id}`}
                    className="px-3 py-1 rounded pagination hover:border hover:text-white"
                  >
                    {i + 1}
                  </Link>
                );
              }
              return i === currentPage - 1 ? (
                <span
                  key={i}
                  className="px-3 py-1 border text-white rounded font-bold bg-indigo-600"
                >
                  {i + 1}
                </span>
              ) : (
                <Link
                  key={i}
                  href={`/tags/${id}/${i + 1}`}
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

export default Page;
