import LatestPostList from '@/components/LatestPostList';
import PostDetail from '@/components/PostDetail';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import {
  getLatestPosts,
  getNextPost,
  getPublishedPost,
  getPreviousPost,
} from '@/lib/post';
import { getAllTags, getTagsByPostIdAndRelatedPosts } from '@/lib/tag';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import SearchBox from '@/components/SearchBox';

type Params = {
  params: Promise<{ slug: string }>;
};

const PostPage = async ({ params }: Params) => {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);

  console.log(slug);
  const post = await getPublishedPost(slug);
  if (!post) return notFound();

  const latestPosts = await getLatestPosts();

  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  const tagsWithPosts = await getTagsByPostIdAndRelatedPosts(slug);

  const relatedPosts = Array.from(
    new Map(
      tagsWithPosts?.tags.flatMap(tag => tag.posts).map(post => [post.id, post])
    ).values()
  )
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3);

  const previousPostSlug = await getPreviousPost(post.updatedAt);
  const nextPostSlug = await getNextPost(post.updatedAt);

  const session = await auth();

  return (
    <div className="py-7 md:mx-auto md:container lg:px-40 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="flex flex-col gap-12">
          <PostDetail post={post} user={session?.user} />
          <div className="flex justify-between items-center mt-6 px-2 border-t pt-6 text-sm text-white">
            {previousPostSlug ? (
              <Link
                href={`/post/${encodeURIComponent(previousPostSlug)}`}
                className="px-4 py-2 border bg-gray-900 hover:bg-gray-300 rounded-md"
              >
                ◀ 前の記事
              </Link>
            ) : (
              <span />
            )}

            {nextPostSlug ? (
              <Link
                href={`/post/${encodeURIComponent(nextPostSlug)}`}
                className="px-4 py-2 border bg-gray-900 hover:bg-gray-300 rounded-md"
              >
                次の記事 ▶
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className=" p-6">
            <h2 className="text-lg font-bold border-b pb-2 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="md:hidden mx-4">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
