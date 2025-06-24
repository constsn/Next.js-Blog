'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './input';
import { Search } from 'lucide-react';

const SearchBox = () => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const hanldeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setInput('');

    startTransition(() => {
      router.push(`/search?q=${encodeURIComponent(input)}`);
    });
  };

  return (
    <form onSubmit={hanldeSubmit} className="flex items-center gap-2">
      <Input
        className="flex-1 bg-white w-full rounded-none"
        id="search"
        type="text"
        value={input}
        placeholder="記事を検索..."
        onChange={e => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="cursor-pointer text-white search py-1 px-3 rounded-full"
      >
        {isPending ? '検索中...' : <Search />}
      </button>
    </form>
  );
};

export default SearchBox;
