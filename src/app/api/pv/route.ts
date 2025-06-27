import { getOrSetAnonymousId } from '@/lib/cookies';
import { createPageView } from '@/lib/db/pageView';
import { getPostBySlug } from '@/lib/db/post';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { slug } = await req.json();

  const anonymousId = await getOrSetAnonymousId();

  if (!slug || !anonymousId) {
    return NextResponse.json(
      { error: 'データが見つかりません' },
      { status: 400 }
    );
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json(
      { error: '記事が見つかりません' },
      { status: 404 }
    );
  }
  await createPageView(post.id, anonymousId);

  return NextResponse.json({ success: true });
}
