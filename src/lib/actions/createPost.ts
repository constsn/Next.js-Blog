'use server';

import { redirect } from 'next/navigation';
import { postShema } from '@/schemas/postSchema';
import { saveImage } from '../storage/image';
import { prisma } from '../db/prisma';

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/　/g, '-')
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '');
  };

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

  const slug = generateSlug(title);

  await prisma.post.create({
    data: {
      title,
      content,
      coverImageUrl,
      published,
      slug,

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
