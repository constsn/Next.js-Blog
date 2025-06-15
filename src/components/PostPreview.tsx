import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { getMarkdownTextServer } from '@/lib/markdown';

type Props = {
  imageUrl: string | null;
  title: string;
  content: string;
};

const PostPreview = ({ imageUrl, title, content }: Props) => (
  <Card className="w-full md:max-w-3xl rounded border-gray-300 shadow-lg pt-0">
    <div className="relative w-full h-80 lg:h-100">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="選択した画像のプレビュー"
          fill
          priority
          className="object-cover rounded-t"
          sizes="100vw "
        />
      )}
    </div>
    <div>
      <CardHeader>
        <CardTitle className="text-3xl mb-6">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          id="preview"
          className="markdown-body prose max-w-none w-full py-4"
          dangerouslySetInnerHTML={getMarkdownTextServer(content)}
        />
      </CardContent>
    </div>
  </Card>
);

export default PostPreview;
