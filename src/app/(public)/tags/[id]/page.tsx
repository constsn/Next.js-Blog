import PostCard from '@/components/PostCard';
import { getPostsByTagName } from '@/lib/tag';

type Params = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: Params) => {
  const { id } = await params;

  const tagName = decodeURIComponent(id);
  console.log(tagName);

  const posts = await getPostsByTagName(tagName);
  console.log(posts);

  return (
    <div className="mx-auto container px-4 py-6">
      <p className="text-xl mb-8 text-gray-800">
        <span>{tagName}</span>
        の記事一覧
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default page;
