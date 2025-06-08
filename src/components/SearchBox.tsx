'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';

const SearchBox = () => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const hanldeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput('');
    router.push(`/?search=${encodeURIComponent(input)}`);
  };

  return (
    <form onSubmit={hanldeSubmit} className="flex items-center gap-2">
      <Input
        className="w-[300px] bg-white"
        id="search"
        type="text"
        value={input}
        placeholder="記事を検索..."
        onChange={e => setInput(e.target.value)}
      />
      <Button type="submit">検索</Button>
    </form>
  );
};

export default SearchBox;
