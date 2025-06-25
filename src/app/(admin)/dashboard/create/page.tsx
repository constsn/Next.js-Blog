import PostCreateForm from '@/components/form/PostCreateForm';
import { popularTags } from '@/lib/db/tag';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const tags = await popularTags();
  return <PostCreateForm popularTags={tags} />;
};

export default Page;
