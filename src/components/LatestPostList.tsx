import LatestPostItem from './LatestPostItem';

type PostsProp = {
  posts: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const LatestPostList = ({ posts }: PostsProp) => (
  <div className="border shadow-md rounded p-4">
    <h2 className="text-lg font-bold border-b pb-2">最新記事</h2>
    {posts.map(post => (
      <LatestPostItem key={post.id} post={post} />
    ))}
  </div>
);
export default LatestPostList;
