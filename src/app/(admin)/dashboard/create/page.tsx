import PostCreateForm from '@/components/form/PostCreateForm';
import { getAllTags } from '@/lib/db/tag';

const Page = async () => {
  const alltags = await getAllTags();

  const popularTags = alltags
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 5);

  return <PostCreateForm popularTags={popularTags} />;
};

export default Page;
