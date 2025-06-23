import { getCommentsByPostId } from '@/lib/db/comment';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> }
) {
  const { postId } = await context.params;
  const postIdNumber = Number(postId);
  try {
    const comments = await getCommentsByPostId(postIdNumber);
    return NextResponse.json({ comments });
  } catch (err) {
    console.error('コメント取得失敗', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
