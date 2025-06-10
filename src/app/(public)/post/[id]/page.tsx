import { notFound } from 'next/navigation';
import { getLatestPosts, getPost } from '@/lib/post';
import LatestPostList from '@/components/LatestPostList';
import PostDetail from '@/components/PostDetail';
import { getAllTags } from '@/lib/tag';
import Link from 'next/link';

type Params = {
  params: Promise<{ id: number }>;
};

const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const postId = Number(id);
  const post = await getPost(postId);
  if (!post) return notFound();

  const latestPosts = await getLatestPosts();

  const tags = await getAllTags();

  return (
    <div className="py-7 md:mx-auto md:container md:px-4 lg:px-40 ">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-0">
        <PostDetail post={post} />
        <div className="flex flex-col gap-4">
          <LatestPostList posts={latestPosts} />
          <div className="border rounded p-4 shadow-md">
            <h2 className="text-lg font-bold border-b pb-2 mb-2">タグ一覧</h2>
            <div className="grid grid-cols-4 gap-4">
              {tags.map(tag => (
                <Link
                  href={`/tags/${tag.name}`}
                  key={tag.id}
                  className="shadow-sm hover:shadow-md transform transition-all hover:bg-gray-50 hover:-translate-y-1 duration-300 ease-in-out"
                >
                  <div>
                    <p>
                      {tag.name} <span>{`(${tag.posts.length})`}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
