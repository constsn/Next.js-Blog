'use server';

import { redirect } from 'next/navigation';
import { saveImage } from '../image';
import { prisma } from '../prisma';
import { postShema } from '@/schemas/postSchema';

export type ActionState = {
  success: boolean;
  errors: {
    title?: string[];
    content?: string[];
    coverImageUrl?: string[];
  };
};

export const createPost = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const published = formData.get('published') === 'true';
  const coverImageInput = formData.get('coverImageUrl');
  const tagString = formData.get('tags') as string;
  const tags = tagString.split(',');

  console.log(tags);

  //✅ 明示的に instanceof File を満たしてるように型定義
  if (!coverImageInput || !(coverImageInput instanceof File))
    return {
      success: false,
      errors: { coverImageUrl: ['画像ファイルを選択してください'] },
    };

  const validationResult = postShema.safeParse({
    title,
    content,
    coverImageUrl: coverImageInput,
  });

  if (!validationResult.success) {
    return {
      success: false,
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const coverImageUrl = await saveImage(coverImageInput);
  if (!coverImageUrl)
    return {
      success: false,
      errors: { coverImageUrl: ['画像の保存に失敗しました'] },
    };

  await prisma.post.create({
    data: {
      title,
      content,
      coverImageUrl,
      published,
      tags: {
        connectOrCreate: tags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });

  redirect('/');
};
