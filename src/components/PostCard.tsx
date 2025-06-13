import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Post } from '@/types/post';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

type PostProp = {
  post: Post;
};

const PostCard = ({ post }: PostProp) => {
  return (
    <Card className="w-full rounded-sm pt-0 pb-2 gap-3 shadow-md hover:shadow-xl transform transition-all hover:-translate-y-1 duration-300 ease-in-out">
      <Link href={`/post/${post.id}`} className="flex-glow">
        <div className="relative w-full h-72 sm:h-50 mb-2 ">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover rounded-t-sm"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardDescription>
            {format(new Date(post.updatedAt), 'yyyy年M月d日', { locale: ja })}
          </CardDescription>
          <CardTitle className="text-lg line-clamp-3">{post.title}</CardTitle>
        </CardHeader>
      </Link>
      <div className="flex flex-wrap gap-2 px-6 mt-auto">
        {post.tags.map(tag => (
          <Link key={tag.id} href={`/tags/${tag.name}`}>
            <span className="text-xs px-2.5 py-0.5 font-medium text-white bg-gray-800 transition hover:bg-gray-700 hover:shadow-sm hover:scale-[1.03] rounded-full">
              {tag.name}
            </span>
          </Link>
        ))}
      </div>
    </Card>
  );
};

export default PostCard;
