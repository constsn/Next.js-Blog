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

type PostProp = {
  post: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const PostDetail = ({ post }: PostProp) => (
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
      </CardContent>
    </div>
  </Card>
);

export default PostDetail;
