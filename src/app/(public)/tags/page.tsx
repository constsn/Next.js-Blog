import LatestPostList from '@/components/post/LatestPostList';
import SearchBox from '@/components/ui/SearchBox';
import { Tag } from 'lucide-react';
import Link from 'next/link';
import NotFound from '../post/[slug]/not-found';
import { getBasePageData } from '@/lib/pageData';

export const revalidate = 30;

const TagsPage = async () => {
  const data = await getBasePageData();
  if (!data) return <NotFound />;

  const { latestPosts, uniqueTagsByName } = data;

  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24 items-start">
        <div>
          <div className="flex items-center gap-2 border-b pb-2 mb-6">
            <Tag />
            <h1 className="text-xl">タグ一覧</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uniqueTagsByName.map(tag => (
              <Link
                href={`/tags/${encodeURIComponent(tag.name)}`}
                key={tag.id}
                className=" bg-white rounded-lg border-gray-400 px-4 py-4 shadow-xl hover:underline"
              >
                <div className="flex items-center gap-6 justify-between">
                  <span className="text-xl">{tag.name}</span>
                  <span className="text-sm">{tag.posts.length}記事 </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
