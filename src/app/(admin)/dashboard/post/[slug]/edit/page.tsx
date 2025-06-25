import EditForm from '@/components/form/EditForm';
import { getAnyPost, getPublishedPosts } from '@/lib/db/post';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 30;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const EditPage = async ({ params }: Params) => {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);
  const post = await getAnyPost(slug);
  if (!post) return notFound();
  return <EditForm post={post} />;
};

export default EditPage;
