'use client';

import Link from 'next/link';
import SearchBox from '../ui/SearchBox';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="shadow-sm h-[80px]">
      <div className="mx-auto container py-6 px-4 lg:px-24 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-16">
          <Link
            href="/"
            className="text-lg font-semibold whitespace-nowrap hover:underline"
          >
            shuto tech
          </Link>
          {isOpen && (
            <div className="fixed inset-0 z-50">
              <div className="fixed top-0 right-0 bg-white w-full h-100 p-6 shadow-lg">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-2xl absolute top-4 right-4 cursor-pointer hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
                <nav className="mt-10 text-right">
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/tags"
                      onClick={() => setIsOpen(false)}
                      className="hover:underline"
                    >
                      タグ
                    </Link>
                    <Link
                      href="/about"
                      className="hover:underline"
                      onClick={() => setIsOpen(false)}
                    >
                      プロフィール
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
          <Link
            href="/tags"
            className="md:block text-lg hover:underline hidden"
          >
            タグ
          </Link>
          <Link
            href="/about"
            className="md:block text-lg hover:underline hidden"
          >
            プロフィール
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
        <div className="hidden md:block">
          <SearchBox />
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;
