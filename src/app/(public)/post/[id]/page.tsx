import { notFound } from 'next/navigation';
import { getLatestPosts, getPost } from '@/lib/post';
import LatestPostList from '@/components/LatestPostList';
import PostDetail from '@/components/PostDetail';
import { getAllTags, getTagsByPostIdAndRelatedPosts } from '@/lib/tag';
import Link from 'next/link';
import PostCard from '@/components/PostCard';

type Params = {
  params: Promise<{ id: number }>;
};

const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const postId = Number(id);
  const post = await getPost(postId);
  if (!post) return notFound();

  const latestPosts = await getLatestPosts();

  const tags = await getAllTags();

  const tagsWithPosts = await getTagsByPostIdAndRelatedPosts(postId);

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

  console.log(relatedPosts);

  return (
    <div className="py-7 md:mx-auto md:container px-4 lg:px-40 ">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="flex flex-col gap-12">
          <PostDetail post={post} />
          <div className="border rounded p-6 shadow-md">
            <h2 className="text-lg font-bold border-b pb-2 mb-6">関連記事</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
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

export default PostPage;
