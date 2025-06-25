import { Tag } from 'lucide-react';
import Link from 'next/link';

type Prop = {
  tags: {
    id: number;
    name: string;
  }[];
};

const TagList = ({ tags }: Prop) => (
  <div className="shadow-xl bg-white border p-8">
    <div className="flex items-center text-gray-600 gap-2 border-b pb-4 mb-4 tracking-wider">
      <Tag />
      <h2 className="text-lg ">タグ一覧</h2>
    </div>
    <div className="flex flex-wrap gap-4 mt-4">
      {tags.map(tag => (
        <Link
          href={`/tags/${encodeURIComponent(tag.name)}`}
          key={tag.id}
          className="px-3 py-1 bg-gray-100 text-sm font-medium tag hover:text-white rounded-full"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  </div>
);

export default TagList;
