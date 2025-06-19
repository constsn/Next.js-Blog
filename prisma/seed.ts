import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.post.deleteMany();
  await prisma.tag.deleteMany();

  const dummyImages = [
    'https://picsum.photos/id/1015/800/600',
    'https://picsum.photos/id/1025/800/600',
    'https://picsum.photos/id/1035/800/600',
    'https://picsum.photos/id/1045/800/600',
    'https://picsum.photos/id/1055/800/600',
    'https://picsum.photos/id/1065/800/600',
    'https://picsum.photos/id/1065/800/600',
  ];

  const tags = ['React', '初心者', 'TypeScript', 'Git', 'Prisma'];

  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { name: tagName }, // 重複確認
      update: {},
      create: { name: tagName },
    });
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/　/g, '-')
      .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF-]/g, '');
  };

  await prisma.post.create({
    data: {
      title: 'テスト01',
      content: 'これは最初のブログ投稿です。',
      slug: generateSlug('テスト01'),
      tags: {
        connectOrCreate: [
          { where: { name: 'React' }, create: { name: 'React' } },
          { where: { name: '初心者' }, create: { name: '初心者' } },
        ],
      },
      coverImageUrl: dummyImages[0],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト02',
      content: 'これは2番目のブログ投稿です。',
      slug: generateSlug('テスト02'),
      tags: {
        connectOrCreate: [
          {
            where: { name: 'TypeScript' },
            create: { name: 'TypeScript' },
          },
        ],
      },
      coverImageUrl: dummyImages[1],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト03',
      content: 'これは3番目のブログ投稿です。',
      slug: generateSlug('テスト03'),
      tags: {
        connectOrCreate: [
          { where: { name: 'Git' }, create: { name: 'Git' } },
          { where: { name: 'Prisma' }, create: { name: 'Prisma' } },
        ],
      },
      coverImageUrl: dummyImages[2],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト04',
      content: 'これは4番目のブログ投稿です。',
      slug: generateSlug('テスト04'),
      tags: {
        connectOrCreate: [
          { where: { name: 'React' }, create: { name: 'React' } },
          { where: { name: 'Git' }, create: { name: 'Git' } },
        ],
      },
      coverImageUrl: dummyImages[3],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト05',
      content: 'これは5番目のブログ投稿です。',
      slug: generateSlug('テスト05'),
      tags: {
        connectOrCreate: [
          { where: { name: 'TypeScript' }, create: { name: 'TypeScript' } },
        ],
      },
      coverImageUrl: dummyImages[4],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト06',
      content: 'これは6番目のブログ投稿です。',
      slug: generateSlug('テスト06'),
      tags: {
        connectOrCreate: [
          { where: { name: '初心者' }, create: { name: '初心者' } },
        ],
      },
      coverImageUrl: dummyImages[5],
      published: true,
    },
  });

  await prisma.post.create({
    data: {
      title: 'テスト07',
      content: 'これは7番目のブログ投稿です。',
      slug: generateSlug('テスト07'),
      tags: {
        connectOrCreate: [
          { where: { name: 'Prisma' }, create: { name: 'Prisma' } },
        ],
      },
      coverImageUrl: dummyImages[6],
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
