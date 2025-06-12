import { notFound } from 'next/navigation';
import LatestPostList from '@/components/LatestPostList';
import PostDetail from '@/components/PostDetail';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { getLatestPosts, getPost } from '@/lib/post';
import { getAllTags, getTagsByPostIdAndRelatedPosts } from '@/lib/tag';

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
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
