'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

export const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      tags: {
        include: {
          posts: {
            include: {
              tags: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      comments: true,
      pageViews: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getPublishedPost = async (slug: string) => {
  return await prisma.post.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      tags: true,
      comments: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          author: true,
          content: true,
          createdAt: true,
          parentId: true,
          authorEmail: true,
        },
      },
    },
  });
};

export const getAnyPost = async (slug: string) => {
  return await prisma.post.findUnique({
    where: {
      slug,
    },
    include: { tags: true, comments: true },
  });
};

export const handleDeletePost = async (id: number) => {
  try {
    await prisma.comment.deleteMany({
      where: { postId: id },
    });

    await prisma.post.delete({
      where: {
        id,
      },
    });

    revalidatePath('/dashboard');
  } catch (err) {
    console.error('記事の削除に失敗しました', err);
  }
};

export const searchPosts = async (search: string) => {
  const searchWords = search.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return await prisma.post.findMany({
    where: {
      published: true,
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
    include: {
      tags: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getPostBySlug = async (slug: string) => {
  return await prisma.post.findUnique({
    where: {
      published: true,
      slug,
    },
  });
};
