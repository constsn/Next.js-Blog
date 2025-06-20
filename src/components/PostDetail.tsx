'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { getMarkdownTextServer } from '@/lib/markdown';
import type { Comment, Tag } from '@/types/post';
import Link from 'next/link';
import { MessageSquare, Tag as TagIcon } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useActionState, useRef, useState } from 'react';
import { createComment } from '@/lib/actions/createComment';
import { Button } from './ui/button';
import CommentThread from './CommentThread';

type Prop = {
  post: {
    id: number;
    title: string;
    content: string;
    published: boolean;
    coverImageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    tags: Tag[];
    comments: Comment[];
  };
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
  };
};

const PostDetail = ({ post, user }: Prop) => {
  const [state, formAction] = useActionState(createComment, {
    success: false,
    errors: {},
  });

  const [isSelected, setIsSelected] = useState<number | null>(null);
  const [selectedComment, setSelectedComment] = useState<null | Comment[]>(
    null
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (commentId: number) => {
    inputRef.current?.focus();
    setIsSelected(commentId);
    setSelectedComment(
      post.comments.filter(comment => comment.id === commentId)
    );
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
      <div>
        <CardHeader className="px-2 md:px-8">
          <CardDescription>
            {format(new Date(post.createdAt), 'yyyy年M月d日', {
              locale: ja,
            })}
          </CardDescription>
          <CardTitle className="text-3xl mb-6">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="px-2 md:px-8">
          <div
            id="preview"
            className="prose max-w-none w-full py-4"
            dangerouslySetInnerHTML={getMarkdownTextServer(post.content)}
          />
          <div className="flex items-center gap-2 border-b pb-0.5 mt-10">
            <TagIcon size={24} />
            <h2 className="text-xl font-bold">タグ</h2>
          </div>
          <div className="flex flex-wrap gap-4 px-2 mt-8">
            {post.tags.map(tag => (
              <Link key={tag.id} href={`/tags/${tag.name}`}>
                <span className="text-sm px-5 py-1 font-medium text-white bg-gray-800 transition hover:bg-gray-300 hover:shadow-sm hover:scale-[1.03] rounded-full">
                  {tag.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-20 mb-4">
            <MessageSquare size={24} className="text-blue-500" />
            <h2 className="text-xl font-bold">
              コメント
              {post.comments.length > 0 ? `(${post.comments.length})` : ''}
            </h2>
          </div>
          {isSelected && selectedComment && (
            <div className="flex justify-between mb-4 border-b pb-4">
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
          <div className="border border-gray-300 rounded-2xl py-6 px-12">
            <form action={formAction} className="flex flex-col gap-6">
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
                {state.errors.author && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.author.join('')}
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
                {state.errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.content.join('')}
                  </p>
                )}
              </div>
              <Button type="submit" className="hover:bg-gray-300">
                {isSelected ? '返信する' : '送信'}{' '}
              </Button>
              <input type="hidden" name="postId" value={post.id} />
              {isSelected && (
                <input type="hidden" name="parentId" value={isSelected} />
              )}
            </form>
          </div>
          {post.comments.length > 0 && (
            <div className="space-y-4 mt-12">
              {post.comments
                .filter(comment => comment.parentId === null)
                .map(comment => (
                  <CommentThread
                    key={comment.id}
                    comment={comment}
                    allComments={post.comments}
                    onReplyClick={handleClick}
                    user={user}
                  />
                ))}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  );
};

export default PostDetail;

{
  /*<div
                    key={comment.id}
                    className="border rounded-lg p-4 bg-white"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                      <User className="w-6 h-6 text-white bg-gray-500 rounded-full" />
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: ja,
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-800 mt-4">
                        {comment.content}
                      </p>
                      <span onClick={() => handleClick(comment.id)}>返信</span>
                    </div>
                  </div> */
}
