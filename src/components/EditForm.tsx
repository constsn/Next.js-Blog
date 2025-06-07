'use client';

import { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import Markdown from './Markdown';
import PostStatusRadioGroup from './admin/PostStatusRadioGroup';
import { editPost } from '@/lib/actions/editPost';
import type { Post } from '@/types/post';

type PostProps = {
  post: Post;
};

const EditForm = ({ post }: PostProps) => {
  const [state, formAction] = useActionState(editPost, {
    success: false,
    errors: {},
  });
  const [published, setPublished] = useState(post.published);
  const [content, setContent] = useState(post.content);

  return (
    <div className="mx-auto container">
      <h1>記事を編集</h1>
      <form action={formAction}>
        <Label>タイトル</Label>
        <Input
          type="text"
          id="title"
          name="title"
          defaultValue={post.title}
          placeholder="タイトルを入力してください"
        />
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title.join('')}</p>
        )}
        <Label>トップ画像</Label>
        <Input
          type="file"
          id="coverImageUrl"
          name="coverImageUrl"
          accept="image/*"
        />
        {state.errors.coverImageUrl && (
          <p className="text-red-500">{state.errors.coverImageUrl.join('')}</p>
        )}
        <Label>本文</Label>
        {state.errors.content && (
          <p className="text-red-500">{state.errors.content.join('')}</p>
        )}
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-4 font-semibold text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md h-50 overflow-y-auto"
          placeholder="マークダウン形式で記事を書いてください"
          style={{ minHeight: '650px' }}
        />
        <Markdown content={content} />
        <PostStatusRadioGroup
          published={published}
          onPublished={setPublished}
        />
        <input type="hidden" name="published" value={published.toString()} />
        <input type="hidden" name="id" value={post.id} />
        <input
          type="hidden"
          name="previousCoverImageUrl"
          value={post.coverImageUrl}
        />
        <Button type="submit">更新する</Button>
      </form>
    </div>
  );
};

export default EditForm;
