import { prisma } from './prisma';

export const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc',
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
      updatedAt: 'desc',
    },
  });
};
