import { z } from 'zod';

export const postShema = z.object({
  title: z.string().min(3, 'タイトルは3文字以上で入力してください'),
  content: z.string().min(5, '本文は5文字以上で入力してください'),
  coverImageUrl: z.instanceof(File).refine(file => file.size > 0, {
    message: '画像ファイルが空です',
  }),
});
