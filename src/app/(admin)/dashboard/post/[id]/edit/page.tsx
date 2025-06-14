import EditForm from '@/components/EditForm';
import { getAnyPost } from '@/lib/post';
import { notFound } from 'next/navigation';

type Params = {
  params: Promise<{ id: number }>;
};

const EditPage = async ({ params }: Params) => {
  const { id } = await params;
  const post = await getAnyPost(Number(id));
  if (!post) return notFound();
  return <EditForm post={post} />;
};

export default EditPage;
