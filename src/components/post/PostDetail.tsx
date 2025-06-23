'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import type { Comment, Tag } from '@/types/post';
import Link from 'next/link';
import { Loader2, MessageSquare, Tag as TagIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import CommentThread from '../comment/CommentThread';
import { getMarkdownTextServer } from '@/lib/markdown/markdown';

type Prop = {
  post: {
    id: number;
    title: string;
    content: string;
    slug: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    comments: Comment[];
  };
};

const PostDetail = ({ post }: Prop) => {
  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [selectedComment, setSelectedComment] = useState<null | Comment[]>(
    null
  );
  const [comments, setComments] = useState<Comment[]>(post.comments);
  const [errors, setErrors] = useState<{
    author?: string[];
    content?: string[];
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (commentId: number) => {
    inputRef.current?.focus();
    setIsSelected(commentId);
    setSelectedComment(comments.filter(comment => comment.id === commentId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const form = new FormData(e.currentTarget);
    const body = {
      author: form.get('author'),
      content: form.get('content'),
      postId: Number(post.id),
      parentId: Number(isSelected),
    };

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || {});
      } else {
        setComments(prev =>
          [...prev, data.comment].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        (e.target as HTMLFormElement).reset();
        setIsSelected(null);
        setSelectedComment(null);
      }
    } catch (err) {
      console.error('投稿失敗', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-none rounded-none border-none pt-0">
      <div className="relative w-full h-80 lg:h-100">
        <Image
          src={post.coverImageUrl}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw "
        />
      </div>
      <div className="md:max-w-3xl">
        <CardHeader className="px-4 md:px-8">
          <CardDescription className="my-4 tracking-wider">
            {format(new Date(post.createdAt), 'yyyy年M月d日', {
              locale: ja,
            })}
          </CardDescription>
          <CardTitle className="text-3xl mb-6 tracking-wider">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 md:px-8">
          <div
            id="preview"
            className="prose max-w-none w-full py-4 tracking-wider"
            dangerouslySetInnerHTML={getMarkdownTextServer(post.content)}
          />
        </CardContent>
        <div className=" px-6  mt-10">
          <div className="border-b pb-4 flex gap-2 items-center tracking-wider">
            <TagIcon size={24} />
            <h2 className="text-xl ">タグ</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 px-6 mt-8">
          {post.tags.map(tag => (
            <Link key={tag.id} href={`/tags/${encodeURIComponent(tag.name)}`}>
              <span className="text-sm px-5 py-1 font-medium text-white bg-gray-800 transition hover:bg-gray-300 hover:shadow-sm hover:scale-[1.03] rounded-full">
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex items-center px-6 gap-2 mt-20 mb-4 tracking-wider">
          <MessageSquare size={24} className="text-blue-500" />
          <h2 className="text-xl">
            コメント
            {comments.length > 0 ? `(${comments.length})` : ''}
          </h2>
        </div>
        {isSelected && selectedComment && (
          <div className="flex justify-between mb-4 border-b pb-4 px-4">
            <h2>{selectedComment[0].author} さんに返信する</h2>
            <button
              type="button"
              className="cursor-pointer text-red-500"
              onClick={() => setIsSelected(null)}
            >
              キャンセル
            </button>
          </div>
        )}
        <div className="px-6">
          <div className="border border-gray-300 rounded-2xl py-6 px-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <Label htmlFor="author" className="text-lg">
                  名前
                </Label>
                <Input
                  id="author"
                  name="author"
                  type="text"
                  className="border-gray-300"
                  ref={inputRef}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.author.join('')}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="content" className="text-lg">
                  {isSelected ? '返信内容' : 'コメント'}
                </Label>
                <textarea
                  id="content"
                  name="content"
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.content.join('')}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="hover:bg-gray-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    処理中...
                  </>
                ) : isSelected ? (
                  '返信する'
                ) : (
                  '送信'
                )}
              </Button>
            </form>
          </div>
          {comments.length > 0 && (
            <div className="space-y-4 mt-16">
              {comments
                .filter(comment => comment.parentId === null)
                .map(comment => (
                  <CommentThread
                    key={comment.id}
                    comment={comment}
                    allComments={comments}
                    onReplyClick={handleClick}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PostDetail;
