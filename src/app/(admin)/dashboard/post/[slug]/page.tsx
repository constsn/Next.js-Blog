import PostDetail from '@/components/post/PostDetail';
import { getAnyPost, getPublishedPosts } from '@/lib/db/post';
import { notFound } from 'next/navigation';

type Prop = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const PostDetailPage = async ({ params }: Prop) => {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);

  const post = await getAnyPost(slug);
  if (!post) return notFound();

  return (
    <div className="py-7 md:mx-auto md:container px-4 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12">
        <div className="flex flex-col md:max-w-4xl gap-12">
          <PostDetail post={post} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
