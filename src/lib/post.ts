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
