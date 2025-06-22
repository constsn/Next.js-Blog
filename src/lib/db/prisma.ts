export const runtime = 'nodejs';

import { PrismaClient } from '@prisma/client';

/* eslint-disable no-var */
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

// グローバルがあれば再利用、なければ新規作成
const prisma =
  global.prisma ??
  new PrismaClient({
    log: ['error'],
  });

// production環境では再代入しない（lambdaで問題になりうる）
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export { prisma };
