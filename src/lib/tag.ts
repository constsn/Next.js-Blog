import { prisma } from './prisma';

export const getAllTags = async () => {
  return await prisma.tag.findMany({
    include: {
      posts: true,
    },
    orderBy: { name: 'asc' },
  });
};

export const getPostsByTagName = async (tagName: string) => {
  const tag = await prisma.tag.findUnique({
    where: {
      name: tagName,
    },
    include: {
      posts: {
        include: {
          tags: true,
        },
      },
    },
  });

  return tag?.posts ?? [];
};
