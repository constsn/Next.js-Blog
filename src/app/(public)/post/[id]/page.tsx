import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { getPost } from '@/lib/post';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

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
            <p>{post.content}</p>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PostPage;
