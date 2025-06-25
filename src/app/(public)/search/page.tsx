import LatestPostList from '@/components/post/LatestPostList';
import SearchResult from '@/components/post/SearchResult';
import TagList from '@/components/tag/TagList';
import SearchBox from '@/components/ui/SearchBox';
import NotFound from '../post/[slug]/not-found';
import { getBasePageData } from '@/lib/pageData';

export const dynamic = 'force-dynamic';

const Page = async () => {
  const data = await getBasePageData();
  if (!data) return <NotFound />;

  const { latestPosts, uniqueTagsByName } = data;

  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
        <SearchResult />
        <div className="flex flex-col gap-16">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={uniqueTagsByName} />
        </div>
      </div>
    </div>
  );
};

export default Page;
