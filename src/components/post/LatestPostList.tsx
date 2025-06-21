import { FileText } from 'lucide-react';
import LatestPostItem from './LatestPostItem';

type PostsProp = {
  posts: {
    id: number;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const LatestPostList = ({ posts }: PostsProp) => (
  <div className="shadow-xl bg-white border p-8">
    <div className="flex tracking-wider gap-2 items-center border-b text-gray-600 mb-4 pb-4">
      <FileText />
      <h2 className="text-lg">最新記事</h2>
    </div>
    <div className="flex flex-col gap-3">
      {posts.map(post => (
        <LatestPostItem key={post.id} post={post} />
      ))}
    </div>
  </div>
);
export default LatestPostList;
