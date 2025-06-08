import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllTags } from '@/lib/tag';
import Link from 'next/link';

const TagsPage = async () => {
  const tags = await getAllTags();

  return (
    <div className="mx-auto container px-4 py-6">
      <h1 className="text-2xl mb-6">🗂️ タグ一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tags.map(tag => (
          <Link
            href={`/tags/${tag.name}`}
            key={tag.id}
            className="rounded-xl shadow-sm hover:shadow-md transform transition-all hover:-translate-y-1 duration-300 ease-in-out"
          >
            <Card className="w-full pt-1">
              <CardHeader>
                <CardTitle className="text-xl">{tag.name}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
