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
    <Card className="w-full rounded pt-0">
      <Link href={`/post/${post.id}`}>
        <div className="relative w-full h-72 sm:h-50 mb-2 ">
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
          <CardDescription>
            {format(new Date(post.updatedAt), 'yyyy年M月d日', { locale: ja })}
          </CardDescription>
          <CardTitle className="text-xl">{post.title}</CardTitle>
          <div className="flex flex-wrap gap-1 ">
            {post.tags.map(tag => (
              <span
                key={tag.id}
                className="bg-black/70 text-white text-xs px-2 py-0.5 rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </CardHeader>
      </Link>
    </Card>
  );
};

export default PostCard;
