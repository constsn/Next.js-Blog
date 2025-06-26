import { getBasePageData } from '@/lib/pageData';
import NotFound from '../post/[slug]/not-found';
import LatestPostList from '@/components/post/LatestPostList';
import TagList from '@/components/tag/TagList';
import SearchBox from '@/components/ui/SearchBox';
import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

const Page = async () => {
  const data = await getBasePageData();
  if (!data) return <NotFound />;

  const { latestPosts, uniqueTagsByName } = data;
  return (
    <div className="mx-auto container px-4 lg:px-24 py-6 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-24">
        <div className=" bg-white p-6 text-center mx-auto">
          <div className="relative h-[200px] w-[200px] mb-4 mx-auto mt-10 md:mt-20">
            <Image
              src={`/profile.png`}
              alt="profile"
              fill
              priority
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl mb-4">shuto tech</h1>
          <p>
            独学でプログラミングを始めてアプリ開発を行っています。日々の学びや技術の関することなど発信していきます。
          </p>
          <div className="flex items-center justify-center gap-4 mt-10">
            <a
              href="https://github.com/constsn"
              className="text-white bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://x.com/const_sun"
              className="text-white bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-colors"
            >
              <Twitter size={24} />
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <div className="md:hidden">
            <SearchBox />
          </div>
          <LatestPostList posts={latestPosts} />
          <TagList tags={uniqueTagsByName} />
        </div>
      </div>
    </div>
  );
};

export default Page;
