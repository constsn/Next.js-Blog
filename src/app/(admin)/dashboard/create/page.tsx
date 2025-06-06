'use client';

import Markdown from '@/components/Markdown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createPost } from '@/lib/actions/createPost';
import { useActionState, useState } from 'react';

const PostCreatePage = () => {
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');

  return (
    <div className="mx-auto container">
      <h1>新規記事作成</h1>
      <form action={formAction}>
        <Label>タイトル</Label>
        <Input
          type="text"
          id="title"
          name="title"
          placeholder="タイトルを入力してください"
        />
        {state?.errors?.title && (
          <p className="text-red-500 text-sm mt-1">{state.errors.title[0]}</p>
        )}
        <Label>トップ画像</Label>
        <Input
          type="file"
          id="coverImageUrl"
          name="coverImageUrl"
          accept="image/*"
        />
        <Label>本文</Label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full p-4 font-semibold text-sm text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md overflow-hidden"
          placeholder="マークダウン形式で記事を書いてください"
          style={{ minHeight: '650px' }}
        />
        <Markdown content={content} />
        <RadioGroup
          value={published.toString()}
          onValueChange={value => setPublished(value === 'true')}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-true" />
            <Label htmlFor="公開">公開</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-false" />
            <Label htmlFor="非公開">非公開</Label>
          </div>
        </RadioGroup>
        <input type="hidden" name="published" value={published.toString()} />
        <Button type="submit">投稿する</Button>
      </form>
    </div>
  );
};

export default PostCreatePage;
