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

export const getTagsByPostIdAndRelatedPosts = async (slug: string) => {
  return await prisma.post.findUnique({
    where: { published: true, slug },
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
