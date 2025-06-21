import EditForm from '@/components/form/EditForm';
import { getAnyPost } from '@/lib/db/post';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{ slug: string }>;
};

const EditPage = async ({ params }: Params) => {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);
  const post = await getAnyPost(slug);
  if (!post) return notFound();
  return <EditForm post={post} />;
};

export default EditPage;
