'use client';

import { Facebook, MessageCircle, Twitter } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, 'share', 'width=600,height=400');
  };

  return (
    <div className="flex justify-center flex-wrap items-center gap-3 p-4">
      <span className="text-gray-700 font-medium">シェア:</span>
      <button
        onClick={() =>
          openShareWindow(
            `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
          )
        }
        className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        <Twitter size={16} />
        Twitter
      </button>
      <button
        onClick={() =>
          openShareWindow(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
          )
        }
        className="flex items-center gap-1 px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
      >
        <Facebook size={16} />
        Facebook
      </button>
      <button
        onClick={() =>
          openShareWindow(
            `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`
          )
        }
        className="flex items-center gap-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        <MessageCircle size={16} />
        LINE
      </button>
    </div>
  );
};

export default ShareButtons;
