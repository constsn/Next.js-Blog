import LatestPostList from '@/components/LatestPostList';
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
    <div className="mx-auto container px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <Tag className="w-5 h-5" />
        <h1 className="text-2xl">タグ一覧</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 items-start">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredTags.map(tag => (
            <Link
              href={`/tags/${tag.name}`}
              key={tag.id}
              className="rounded-xl border border-gray-200 px-4 py-4 shadow-sm btn hover:text-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{tag.name}</span>
                <p>
                  <span>{tag.posts.length}</span>記事
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-12">
          <LatestPostList posts={latestPosts} />
          <TagList tags={filteredTags} />
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
