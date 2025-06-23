import LatestPostList from '@/components/post/LatestPostList';
import SearchResult from '@/components/post/SearchResult';
import TagList from '@/components/tag/TagList';
import SearchBox from '@/components/ui/SearchBox';
import { getLatestPosts } from '@/lib/db/post';
import { getAllTags } from '@/lib/db/tag';
import { Suspense } from 'react';

const Page = async () => {
  const latestPosts = await getLatestPosts();
  const tags = await getAllTags();
  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
        <Suspense fallback={<div>検索結果を読み込み中...</div>}>
          <SearchResult />
        </Suspense>
        <div className="flex flex-col gap-16">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default Page;
