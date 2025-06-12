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
  <div className="border rounded p-4 shadow-md">
    <h2 className="text-lg font-bold border-b pb-2 mb-2">タグ一覧</h2>
    <div className="grid grid-cols-4 gap-4">
      {tags.map(tag => (
        <Link
          href={`/tags/${tag.name}`}
          key={tag.id}
          className="shadow-sm hover:shadow-md transform transition-all hover:bg-gray-50 hover:-translate-y-1 duration-300 ease-in-out"
        >
          <div>
            <p>
              {tag.name} <span>{`(${tag.posts.length})`}</span>
            </p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default TagList;
