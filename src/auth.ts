import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';
import { authConfig } from './auth.config';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'パスワードは8文字以上'),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) {
          console.error('管理者アカウント情報が設定されていません');
          return null;
        }

        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          console.error(
            'バリデーションエラー',
            parsedCredentials.error.format()
          );
          return null;
        }

        const { email, password } = parsedCredentials.data;

        if (email !== adminEmail) {
          return null;
        }

        const passwordsMatch = await bcryptjs.compare(
          password,
          adminPasswordHash
        );

        if (passwordsMatch) {
          return {
            id: '1',
            email: adminEmail,
            name: 'shuto',
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
