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
  <div className="shadow-xl p-4">
    <h2 className="text-lg font-bold border-b mb-2 pb-2">最新記事</h2>
    {posts.map(post => (
      <LatestPostItem key={post.id} post={post} />
    ))}
  </div>
);
export default LatestPostList;
