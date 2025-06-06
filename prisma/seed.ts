import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.post.deleteMany();

  const dummyImages = [
    'https://picsum.photos/id/1015/800/600',
    'https://picsum.photos/id/1025/800/600',
  ];

  await prisma.post.create({
    data: {
      title: 'テスト01',
      content: 'これは最初のブログ投稿です。',
      coverImageUrl: dummyImages[0],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト02',
      content: 'これは2番目のブログ投稿です。',
      coverImageUrl: dummyImages[1],
      published: true,
    },
  });
};

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
