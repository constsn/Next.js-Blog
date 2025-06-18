'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

export type State = {
  success: boolean;
  errors: {
    author?: string[];
    content?: string[];
  };
};

export const createComment = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  const author = formData.get('author') as string;
  const content = formData.get('content') as string;
  const postId = formData.get('postId');
  const parentId = formData.get('parentId');

  const session = await auth();

  const commentSchema = z.object({
    author: z.string().min(1, '名前は必須です'),
    content: z.string().min(5, 'コメントは5文字以上で入力して下さい'),
  });

  const result = commentSchema.safeParse({
    author,
    content,
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  if (parentId) {
    await prisma.comment.create({
      data: {
        author,
        content,
        postId: Number(postId),
        parentId: Number(parentId),
        authorEmail: session?.user?.email ?? 'anonymous@unknown.com',
      },
    });
  } else {
    await prisma.comment.create({
      data: {
        author,
        content,
        postId: Number(postId),
        authorEmail: session?.user?.email ?? 'anonymous@unknown.com',
      },
    });
  }

  revalidatePath(`/post/${postId}`);

  return { success: true, errors: {} };
};
