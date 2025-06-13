import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getMarkdownTextServer } from '@/lib/markdown';
import { Tag } from '@/types/post';
import Link from 'next/link';

type Prop = {
  post: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
  };
};

const PostDetail = ({ post }: Prop) => (
  <Card className="w-full md:max-w-3xl rounded pt-0">
    <div className="relative w-full h-80 lg:h-100">
      <Image
        src={post.coverImageUrl}
        alt={post.title}
        fill
        priority
        className="object-cover rounded-t"
        sizes="100vw "
      />
    </div>
    <div>
      <CardHeader>
        <CardDescription>
          {format(new Date(post.createdAt), 'yyyy年M月d日', {
            locale: ja,
          })}
        </CardDescription>
        <CardTitle className="text-3xl mb-6">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          id="preview"
          className="markdown-body prose max-w-none w-full py-4"
          dangerouslySetInnerHTML={getMarkdownTextServer(post.content)}
        />
        <div className="flex flex-wrap gap-4 px-2 mt-10">
          {post.tags.map(tag => (
            <Link key={tag.id} href={`/tags/${tag.name}`}>
              <span className="text-sm px-5 py-1 font-medium text-white bg-gray-800 transition hover:bg-gray-300 hover:shadow-sm hover:scale-[1.03] rounded-full">
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
      </CardContent>
    </div>
  </Card>
);

export default PostDetail;
