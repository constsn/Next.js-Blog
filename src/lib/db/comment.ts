'use server';

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

export const getCommentsByPostId = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
      published: true,
    },
    include: {
      comments: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return post?.comments;
};
