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

  return <div>hello</div>;
};

export default page;
