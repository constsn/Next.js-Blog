'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

export const getPublishedPosts = async () => {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      tags: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getPreviousPost = async (updatedAt: Date) => {
  const previousPost = await prisma.post.findFirst({
    where: {
      published: true,
      updatedAt: {
        lt: updatedAt,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return previousPost?.id;
};

export const getNextPost = async (updatedAt: Date) => {
  const nextPost = await prisma.post.findFirst({
    where: {
      published: true,
      updatedAt: {
        gt: updatedAt,
      },
    },
    orderBy: {
      updatedAt: 'asc',
    },
  });

  return nextPost?.id;
};

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });
};

export const getPublishedPost = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
      published: true,
    },
    include: {
      tags: true,
    },
  });
};

export const getAnyPost = async (postId: number) => {
  return await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: { tags: true },
  });
};

export const getLatestPosts = async () => {
  return await prisma.post.findMany({
    where: { published: true },
    take: 5,
    orderBy: { updatedAt: 'desc' },
  });
};

export const handleDeletePost = async (id: number) => {
  try {
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
    include: {
      tags: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
};
