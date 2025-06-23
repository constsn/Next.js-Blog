import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Post } from '@/types/post';
import { Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type PostProp = {
  post: Post;
};

const PostCard = ({ post }: PostProp) => {
  return (
    <Card className="w-full border-none shadow-2xl rounded-none pt-0 pb-2 gap-3 hover:shadow-xl transform transition-all hover:-translate-y-1 duration-300 ease-in-out">
      <Link
        href={`/post/${encodeURIComponent(post.slug)}`}
        className="flex-glow"
      >
        <div className="relative w-full h-[200px] mb-2 ">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl line-clamp-3 tracking-wider mt-6">
            {post.title}
          </CardTitle>
        </CardHeader>
      </Link>
      <div className="flex flex-wrap gap-2 items-center px-6 mt-auto mb-3.5">
        <Tag size={14} className="mt-1 font-bold" />
        {post.tags.map(tag => (
          <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`}>
            <span className="text-xs underline font-medium text-black bg-white transition tag hover:p-1 hover:rounded-full hover:scale-[1.03]">
              {tag.name}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default PostCard;
