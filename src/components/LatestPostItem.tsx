import Image from 'next/image';
import Link from 'next/link';

type PostProp = {
  post: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
  };
};

const LatestPostItem = ({ post }: PostProp) => (
  <Link
    key={post.id}
    href={`/post/${post.id}`}
    className="flex items-start gap-3 hover:bg-gray-50 trantion p-2"
  >
    <div className="relative w-20 h-14">
      <Image
        src={post.coverImageUrl}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 80px"
        className="object-cover"
      />
    </div>
    <p className="text-md font-semibold leading-snug line-clamp-2">
      {post.title}
    </p>
  </Link>
);

export default LatestPostItem;
