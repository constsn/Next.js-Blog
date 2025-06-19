import Link from 'next/link';

type Prop = {
  tags: {
    id: number;
    name: string;
    posts: {
      id: number;
    }[];
  }[];
};

const TagList = ({ tags }: Prop) => (
  <div className="shadow-xl p-4">
    <h2 className="text-lg font-bold border-b pb-2 mb-2">タグ一覧</h2>
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map(tag => (
        <Link
          href={`/tags/${tag.name}`}
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
