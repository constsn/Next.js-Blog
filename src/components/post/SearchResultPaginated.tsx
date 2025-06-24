'use client';

import { POSTS_PER_PAGE } from '@/lib/constant';
import { Post } from '@/types/post';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import Link from 'next/link';

const cache: { [query: string]: Post[] } = {};

type Prop = {
  currentPage: number;
};

const SearchResultPaginated = ({ currentPage }: Prop) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    if (cache[query]) {
      setPosts(cache[query]);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          cache: 'no-store',
        });
        const data = await res.json();
        setPosts(data);
        cache[query] = data;
      } catch (err) {
        console.error('検索エラー', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  if (!query)
    return <p className="text-gray-500">キーワードを入力してください。</p>;
  if (isLoading) return <p className="text-gray-500">読み込み中...</p>;
  if (!isLoading && posts.length === 0)
    return (
      <p className="text-gray-500">「{query}」に一致する記事はありません。</p>
    );

  return (
    <div>
      <p className="text-gray-600 mb-4">
        「<span className="font-semibold">{query}</span>」の検索結果
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-9">
        {paginatedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-15">
        {Array.from({ length: totalPages }).map((_, i) => {
          if (i === 0) {
            return (
              <Link
                key={i}
                href={`/search?q=${encodeURIComponent(query)}`}
                className="px-3 py-1 rounded pagination hover:border hover:text-white"
              >
                {i + 1}
              </Link>
            );
          }
          return i === currentPage - 1 ? (
            <span
              key={i}
              className="px-3 py-1 border text-white rounded font-bold bg-indigo-600"
            >
              {i + 1}
            </span>
          ) : (
            <Link
              key={i}
              href={`/search/${i + 1}?q=${encodeURIComponent(query)}`}
              className="px-3 py-1 rounded pagination hover:border hover:text-white"
            >
              {i + 1}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchResultPaginated;
