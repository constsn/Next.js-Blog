import ClientCreatePage from '@/components/ClientCreatePage';
import { getAllTags } from '@/lib/tag';

const Page = async () => {
  const alltags = await getAllTags();

  console.log(alltags);

  const popularTags = alltags
    .sort((a, b) => b.posts.length - a.posts.length)
    .slice(0, 5);

  return <ClientCreatePage popularTags={popularTags} />;
};

export default Page;
