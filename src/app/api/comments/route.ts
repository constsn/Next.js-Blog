import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: Request) {
  const formData = await req.json();
  const session = await auth();

  const commentSchema = z.object({
    author: z.string().min(1, '名前は必須です'),
    content: z.string().min(5, 'コメントは5文字以上で入力して下さい'),
    postId: z.number(),
    parentId: z.number().optional(),
  });

  const result = commentSchema.safeParse(formData);
  if (!result.success) {
    console.error('❌ バリデーション失敗:', result.error.flatten().fieldErrors);
    return NextResponse.json(
      { success: false, errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { author, content, postId, parentId } = result.data;

  const newComment = await prisma.comment.create({
    data: {
      author,
      content,
      postId,
      parentId,
      authorEmail: session?.user?.email ?? 'anonymous@unknown.com',
    },
  });

  return NextResponse.json({ success: true, comment: newComment });
}
