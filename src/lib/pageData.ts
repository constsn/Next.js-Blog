import { getPublishedPosts } from './db/post';

export async function getBasePageData() {
  const posts = await getPublishedPosts();
  if (!posts) return null;

  const latestPosts = posts.slice(0, 5);
  const allTags = posts.flatMap(post => post.tags);
  const uniqueTagsByName = Array.from(
    new Map(allTags.map(tag => [tag.id, tag])).values()
  );

  return {
    posts,
    latestPosts,
    uniqueTagsByName,
  };
}
