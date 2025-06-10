'use client';

import type { Post } from '@/types/post';
import { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import PostStatusRadioGroup from './admin/PostStatusRadioGroup';
import { editPost } from '@/lib/actions/editPost';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { getMarkdownTextClient } from '@/lib/markdown';
import { X } from 'lucide-react';

type PostProps = {
  post: Post;
};

const EditForm = ({ post }: PostProps) => {
  const tagNames = post.tags.map(tag => tag.name);
  const [state, formAction] = useActionState(editPost, {
    success: false,
    errors: {},
  });
  const [published, setPublished] = useState(post.published);
  const [content, setContent] = useState(post.content);
  const [inputTag, setInputTag] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(tagNames);
  const [tab, setTab] = useState('edit');

  const addTag = (tag: string) => {
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prevSelectedTags =>
      prevSelectedTags.filter(
        prevSelectedTag => prevSelectedTag !== tagToRemove
      )
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setInputTag('');
      addTag(inputTag);
    }
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-4xl ">
        <div className="bg-white shadow-lg  border border-gray-300 rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">記事編集</h1>
          <form action={formAction} className="flex flex-col gap-6">
            <div>
              <Label htmlFor="title" className="font-semibold text-lg">
                タイトル
              </Label>
              <Input
                className="mt-2 text-2xl font-bold bg-gray-50"
                type="text"
                id="title"
                name="title"
                defaultValue={post.title}
                placeholder="タイトルを入力してください"
              />
              {state.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.title.join('')}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="tag" className="font-semibold text-lg">
                タグ
              </Label>
              <div className="flex gap-2">
                {selectedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 mt-2 mb-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                      aria-label={`${tag}タグを削除`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Input
                className="mt-2 bg-gray-50"
                type="text"
                id="tag"
                value={inputTag}
                placeholder="タグを入力して下さい ( Enter で追加 )"
                onChange={e => setInputTag(e.target.value)}
                onKeyDown={handleInputKeyDown}
              />
            </div>
            <div>
              <Label htmlFor="coverImageUrl" className="font-semibold text-lg">
                トップ画像
              </Label>
              <Input
                className="mt-2 bg-gray-50 focus:ring-2 focus:ring-blue-300"
                type="file"
                id="coverImageUrl"
                name="coverImageUrl"
                accept="image/*"
              />
              {state.errors.coverImageUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.coverImageUrl.join('')}
                </p>
              )}
            </div>
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="edit">編集</TabsTrigger>
                <TabsTrigger value="preview">プレビュー</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <Label htmlFor="content" className="font-semibold text-lg">
                  本文
                </Label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full p-4 text-base bg-gray-50 border rounded-md min-h-[400px] resize-y "
                  placeholder="マークダウン形式で記事を書いてください"
                  style={{ minHeight: '400px', lineHeight: '1.7' }}
                />
                {state.errors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {state.errors.content.join('')}
                  </p>
                )}
              </TabsContent>
              <TabsContent value="preview">
                <Label className="font-semibold text-lg mb-1">プレビュー</Label>
                <div
                  id="preview"
                  className="markdown-body prose max-w-none min-h-[400px] border bg-gray-50 border-gray-300 rounded-md shadow-inner p-4 w-full"
                  dangerouslySetInnerHTML={getMarkdownTextClient(content)}
                />
              </TabsContent>
            </Tabs>
            <PostStatusRadioGroup
              published={published}
              onPublished={setPublished}
            />
            <Button type="submit" size="lg" className="w-full gap-2">
              投稿する
            </Button>
            <input
              type="hidden"
              name="published"
              value={published.toString()}
            />
            <input type="hidden" name="id" value={post.id} />
            <input
              type="hidden"
              name="previousCoverImageUrl"
              value={post.coverImageUrl}
            />
            <input type="hidden" name="tags" value={selectedTags} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
