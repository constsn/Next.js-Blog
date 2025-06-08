import { getAllTags } from '@/lib/tag';
import Link from 'next/link';

const TagsPage = async () => {
  const tags = await getAllTags();

  return (
    <div className="flex gap-3">
      {tags.map(tag => (
        <Link href={`/tags/${tag.name}`} key={tag.id}>
          {tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagsPage;
