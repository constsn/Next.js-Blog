'use server';

import { saveImage } from '../image';
import { prisma } from '../prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';

type ActionState = {
  success: boolean;
  errors: {
    title?: string[];
    content?: string[];
    coverImageUrl?: string[];
  };
};

export const editPost = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const coverImageInput = formData.get('coverImageUrl') as File;
  const previousCoverImageUrl = formData.get('previousCoverImageUrl') as string;

  const postShema = z.object({
    title: z.string().min(3, 'タイトルは3文字以上で入力してください'),
    content: z.string().min(5, '本文は5文字以上で入力してください'),
  });

  const validationResult = postShema.safeParse({
    title,
    content,
  });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const coverImageUrl =
    coverImageInput.size > 0
      ? await saveImage(coverImageInput)
      : previousCoverImageUrl;

  if (!coverImageUrl && coverImageInput.size > 0)
    return {
      success: false,
      errors: { coverImageUrl: ['画像の保存に失敗しました'] },
    };
  console.log('画像保存完了✅');

  await prisma.post.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
      published,
      coverImageUrl,
    },
  });

  console.log('更新完了⭐️');
  redirect('/');
};
