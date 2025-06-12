import LatestPostList from '@/components/LatestPostList';
import PostCard from '@/components/PostCard';
import TagList from '@/components/TagList';
import { getLatestPosts } from '@/lib/post';
import { getAllTags, getPostsByTagName } from '@/lib/tag';

type Params = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Params) => {
  const { id } = await params;

  const tagName = decodeURIComponent(id);
  console.log(tagName);

  const posts = await getPostsByTagName(tagName);
  console.log(posts);

  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6">
      <p className="text-xl mb-8 text-gray-800">
        <span>{tagName}</span>
        の記事一覧
      </p>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="flex flex-col gap-12">
          <LatestPostList posts={latestPosts} />
          <TagList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default page;
