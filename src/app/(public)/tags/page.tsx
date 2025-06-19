import LatestPostList from '@/components/LatestPostList';
import SearchBox from '@/components/SearchBox';
import TagList from '@/components/TagList';
import { getLatestPosts } from '@/lib/post';
import { getAllTags } from '@/lib/tag';
import { Tag } from 'lucide-react';
import Link from 'next/link';

const TagsPage = async () => {
  const tags = await getAllTags();
  console.log(tags);
  const latestPosts = await getLatestPosts();

  const filteredTags = tags.filter(tag => tag.posts.length > 0);

  return (
    <div className="mx-auto container px-4 lg:px-40 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
        <div>
          <div className="flex items-center gap-2 border-b pb-2 mb-6">
            <Tag className="w-5 h-5 bg-white" />
            <h1 className="text-2xl  ">タグ一覧</h1>
          </div>
          <div className="flex flex-wrap gap-6">
            {filteredTags.map(tag => (
              <Link
                href={`/tags/${tag.name}`}
                key={tag.id}
                className=" bg-white rounded border-gray-200 px-4 py-4 shadow-lg"
              >
                <div className="flex items-center gap-6 justify-between">
                  <span className="text-xl font-semibold">{tag.name}</span>
                  <span>{tag.posts.length}記事 </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-12">
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

export default TagsPage;
