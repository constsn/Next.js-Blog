import { prisma } from './prisma';

export const getPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getPost = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
};

export const searchPosts = async (search: string) => {
  const searchWords = search.trim().toLowerCase().split(/\s+/).filter(Boolean);

  console.log(searchWords, 'サーチワード配列');

  return await prisma.post.findMany({
    where: {
      AND: searchWords.map(word => ({
        OR: [
          {
            title: {
              contains: word,
            },
          },
          {
            content: {
              contains: word,
            },
          },
        ],
      })),
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
