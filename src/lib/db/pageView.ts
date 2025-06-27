import { prisma } from './prisma';

export const createPageView = async (postId: number, anonymousId: string) => {
  await prisma.pageview.upsert({
    where: {
      postId_anonymousId: {
        postId: postId,
        anonymousId: anonymousId,
      },
    },
    create: {
      postId: postId,
      anonymousId: anonymousId,
    },
    update: {},
  });
};
