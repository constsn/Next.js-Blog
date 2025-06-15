'use client';

import PostStatusRadioGroup from '@/components/admin/PostStatusRadioGroup';
import CoverImageUpload from '@/components/CoverImageUpload';
import MarkdownEditor from '@/components/MarkdownEditor';
import PostPreview from '@/components/PostPreview';
import PostTitleInput from '@/components/PostTitleInput';
import TagInput from '@/components/TagInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createPost } from '@/lib/actions/createPost';
import { useActionState, useCallback, useState } from 'react';

type Prop = {
  popularTags: {
    id: number;
    name: string;
    posts: {
      id: number;
    }[];
  }[];
};

const ClientCreatePage = ({ popularTags }: Prop) => {
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState(true);
  const [content, setContent] = useState('');
  const [inputTag, setInputTag] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setImageUrl(previewUrl);
      }
    },
    []
  );

  const addTag = (tagName: string) => {
    if (
      !selectedTags.some(selectedTag =>
        selectedTag.toLowerCase().includes(tagName.toLowerCase())
      )
    ) {
      const newSelectedTags = [...selectedTags, tagName];
      setSelectedTags(newSelectedTags);
    }
  };

  return (
    <div className="mx-auto px-6 py-10 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12">
        <div className="bg-white shadow-lg border border-gray-300 rounded p-8">
          <form action={formAction} className="flex flex-col gap-4">
            <PostTitleInput
              title={title}
              onChange={setTitle}
              state={state}
              defaultValue=""
            />
            <CoverImageUpload state={state} onChange={handleImageChange} />
            <MarkdownEditor
              content={content}
              state={state}
              onChange={setContent}
            />
            <TagInput
              inputTag={inputTag}
              setInputTag={setInputTag}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
            <div>
              <Label className="font-medium text-gray-700 text-sm mt-2">
                人気のタグ
              </Label>
              <div className="flex gap-2">
                {popularTags.map(tag =>
                  selectedTags.some(selectedTag =>
                    selectedTag.toLowerCase().includes(tag.name.toLowerCase())
                  ) ? (
                    <span key={tag.id} />
                  ) : (
                    <span
                      key={tag.id}
                      className="px-3 py-1 mt-4 mb-2 bg-blue-100 text-blue-800 hover:bg-blue-400 cursor-pointer rounded-full text-sm font-medium"
                      onClick={() => addTag(tag.name)}
                    >
                      {tag.name} ({tag.posts.length})
                    </span>
                  )
                )}
              </div>
            </div>
            <PostStatusRadioGroup
              published={published}
              onPublished={setPublished}
            />
            <Button
              type="submit"
              size="lg"
              className="mt-4 hover:bg-gray-400 cursor-pointer"
            >
              投稿する
            </Button>
            <input
              type="hidden"
              name="published"
              value={published.toString()}
            />
            <input type="hidden" name="tags" value={selectedTags} />
          </form>
        </div>
        <PostPreview title={title} content={content} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default ClientCreatePage;
