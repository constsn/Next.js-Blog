import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getPost } from '@/lib/post';
import { getMarkdownTextServer } from '@/lib/markdown';
import Image from 'next/image';

type Params = {
  params: Promise<{ id: number }>;
};

const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const postId = Number(id);
  const post = await getPost(postId);
  if (!post) return notFound();
  console.log(post);

  return (
    <div className="mx-auto container px-4 py-7">
      <Card className=" mx-auto max-w-3xl rounded pt-0">
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
        <div className="px-4">
          <CardHeader>
            <CardDescription>
              {format(new Date(post.createdAt), 'yyyy年M月d日', { locale: ja })}
            </CardDescription>
            <CardTitle className="text-3xl mb-6">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              id="preview"
              className="markdown-body prose max-w-none w-full p-4"
              dangerouslySetInnerHTML={getMarkdownTextServer(post.content)}
            />
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PostPage;
