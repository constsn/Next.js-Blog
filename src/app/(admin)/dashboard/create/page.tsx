import PostCreateForm from '@/components/form/PostCreateForm';
import { popularTags } from '@/lib/db/tag';

export const revalidate = 30;

const Page = async () => {
  const tags = await popularTags();
  return <PostCreateForm popularTags={tags} />;
};

export default Page;
