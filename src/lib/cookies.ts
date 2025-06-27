import { cookies } from 'next/headers';

export const getOrSetAnonymousId = async () => {
  const store = await cookies();
  // アクセスしてきた(リクエストが送られた)該当のブラウザの情報を取得
  // そのブラウザの情報をもとに、idを持っているか確認
  let id = store.get('anonymousId')?.value;

  if (!id) {
    id = crypto.randomUUID();
    // 該当のブラウザにこのcookieを保存してと指示
    // ブラウザはこのcookieを保存 ▶️▶️次からはidを持っている
    store.set('anonymousId', id, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return id;
};
