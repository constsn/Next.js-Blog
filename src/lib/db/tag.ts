'use server';

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

export const getTagsByPostIdAndRelatedPosts = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: {
        include: {
          posts: {
            where: {
              slug: {
                not: slug,
              },
            },
            include: {
              tags: true,
            },
          },
        },
      },
    },
  });
};
