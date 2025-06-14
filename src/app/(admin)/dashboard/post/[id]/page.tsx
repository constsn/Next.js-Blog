import PostDetail from '@/components/PostDetail';
import { getAnyPost } from '@/lib/post';
import { notFound } from 'next/navigation';

type Prop = {
  params: Promise<{ id: number }>;
};

const PostDetailPage = async ({ params }: Prop) => {
  const { id } = await params;
  const post = await getAnyPost(Number(id));
  if (!post) return notFound();

  return (
    <div className="py-7 md:mx-auto md:container px-4 lg:px-40 ">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="flex flex-col gap-12">
          <PostDetail post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
