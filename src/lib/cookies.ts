import { cookies } from 'next/headers';

export const getOrSetAnonymousId = async () => {
  const store = await cookies();
  let id = store.get('anonymousId')?.value;

  if (!id) {
    id = crypto.randomUUID();
    store.set('anonymousId', id, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return id;
};
