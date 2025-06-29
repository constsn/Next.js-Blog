import PostDetail from '@/components/post/PostDetail';
import { getPublishedPost, getPublishedPosts } from '@/lib/db/post';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ShareButtons from '@/components/ui/ShareButtons';
import PostCard from '@/components/post/PostCard';
import SearchBox from '@/components/ui/SearchBox';
import { FileText } from 'lucide-react';
import LatestPostList from '@/components/post/LatestPostList';
import TagList from '@/components/tag/TagList';
import NotFound from './not-found';
import { getBasePageData } from '@/lib/pageData';
import PageViewTracker from '@/components/post/PageViewTracker';

type Params = {
  params: Promise<{ slug: string }>;
};

const baseUrl = process.env.BASE_URL;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);

  const post = await getPublishedPost(slug);
  if (!post) return notFound();

  return {
    title: post.title,
    description: post.content.slice(0, 100),
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 100),
      url: `${baseUrl}/post/${post.slug}`,
      type: 'article',
      images: [
        {
          url: `${post.coverImageUrl}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.content.slice(0, 100),
      images: [`${post.coverImageUrl}`],
    },
  };
}

export const revalidate = 30;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map(post => ({ slug: post.slug }));
}

const PostPage = async ({ params }: Params) => {
  const { slug: encodeSlug } = await params;
  const slug = decodeURIComponent(encodeSlug);

  const data = await getBasePageData();
  if (!data) return <NotFound />;
  const { posts: allPosts, latestPosts, uniqueTagsByName } = data;

  const filteredPost = allPosts.find(post => post.slug === slug);
  if (!filteredPost) return <NotFound />;

  const currentUrl = `${baseUrl}/post/${filteredPost.slug}`;

  const index = allPosts.findIndex(p => p.slug === slug);
  const previousPost = allPosts[index + 1];
  const nextPost = allPosts[index - 1];
  const previousSlug = previousPost?.slug ?? null;
  const nextSlug = nextPost?.slug ?? null;

  const relatedPosts = Array.from(
    new Map(
      filteredPost.tags
        .flatMap(tag => tag.posts)
        .filter(post => post.id !== filteredPost.id)
        .map(post => [post.id, post])
    ).values()
  ).slice(0, 3);

  return (
    <div className="py-7 md:mx-auto md:container lg:px-24 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
        <div className="flex flex-col mx-auto gap-12 md:max-w-4xl">
          <PostDetail post={filteredPost} />
          <PageViewTracker slug={slug} />
          <div className="mx-auto">
            <ShareButtons title={filteredPost.title} url={currentUrl} />
          </div>
          <div className="flex justify-between items-center mt-6 px-6 md:px-14 pt-6 text-sm text-white">
            {previousSlug ? (
              <Link
                href={`/post/${encodeURIComponent(previousSlug)}`}
                className="px-4 py-2 border bg-gray-900 hover:bg-gray-300 rounded-md"
              >
                ◀ 前の記事
              </Link>
            ) : (
              <span />
            )}
            {nextSlug ? (
              <Link
                href={`/post/${encodeURIComponent(nextSlug)}`}
                className="px-4 py-2 border bg-gray-900 hover:bg-gray-300 rounded-md"
              >
                次の記事 ▶
              </Link>
            ) : (
              <span />
            )}
          </div>
          <div className="p-6">
            <div className="mb-10 md:px-6 gap-3 flex items-center tracking-wider">
              <FileText />
              <h2 className="text-lg">関連記事</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:px-6 gap-9">
              {relatedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="md:hidden mx-4">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={uniqueTagsByName} />
        </div>
      </div>
    </div>
  );
};

export default PostPage;
