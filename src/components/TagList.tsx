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
  <div className="border rounded bg-white p-4 shadow-md">
    <h2 className="text-lg font-bold border-b pb-2 mb-2">タグ一覧</h2>
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          href={`/tags/${tag.name}`}
          key={tag.id}
          className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:text-white btn"
        >
          {tag.name}
        </Link>
      ))}
    </div>
  </div>
);

export default TagList;
