'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    await signIn('credentials', {
      email: email,
      password: password,
      redirect: false,
    });

    redirect('/dashboard');
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return 'メールアドレスまたはパスワードが正しくありません';
        default:
          return 'エラーが発生しました';
      }
    }
    throw err;
  }
};
