import { searchPosts } from '@/lib/db/post';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';

  if (!q) return NextResponse.json([]);

  try {
    const posts = await searchPosts(q);
    return NextResponse.json(posts);
  } catch (err) {
    console.error('検索APIエラー:', err);
    return NextResponse.json(
      { error: '検索に失敗しました。' },
      { status: 500 }
    );
  }
}
