'use server';

import { prisma } from './prisma';

export const getAllTags = async () => {
  return await prisma.tag.findMany({
    include: {
      posts: {
        where: {
          published: true,
        },
      },
    },
    orderBy: { name: 'asc' },
  });
};

export const popularTags = async () =>
  await prisma.tag.findMany({
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 5,
    include: {
      posts: {
        where: {
          published: true,
        },
      },
    },
  });

export const getPostsByTagName = async (tagName: string) => {
  const tag = await prisma.tag.findUnique({
    where: {
      name: tagName,
    },
    include: {
      posts: {
        where: { published: true },
        include: {
          tags: true,
        },
      },
    },
  });

  return tag?.posts ?? [];
};
