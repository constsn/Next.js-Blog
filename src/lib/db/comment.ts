'use server';

export const runtime = 'nodejs';

import { revalidatePath } from 'next/cache';
import { prisma } from './prisma';

export const getComments = async () => {
  return await prisma.comment.findMany({
    include: {
      post: true,
      replies: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const deleteComment = async (commentId: number) => {
  try {
    await prisma.comment.delete({
      where: {
        id: commentId,
      },
    });
    revalidatePath('/dashboard/comment');
  } catch (err) {
    console.error('コメントの削除に失敗しました', err);
  }
};
