'use client';

import type { Post } from '@/types/post';
import { useActionState, useCallback, useState } from 'react';
import { Button } from '../ui/button';
import PostStatusRadioGroup from '../admin/PostStatusRadioGroup';
import { editPost } from '@/lib/actions/editPost';
import PostTitleInput from '../post/PostTitleInput';
import PostPreview from '../post/PostPreview';
import TagInput from '../tag/TagInput';
import MarkdownEditor from '../post/MarkdownEditor';
import CoverImageUpload from '../upload/CoverImageUpload';
import { Loader2 } from 'lucide-react';

type PostProps = {
  post: Post;
};

const EditForm = ({ post }: PostProps) => {
  const tagNames = post.tags.map(tag => tag.name);
  const [state, formAction, isPending] = useActionState(editPost, {
    success: false,
    errors: {},
  });
  const [published, setPublished] = useState(post.published);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [inputTag, setInputTag] = useState('');
  const [imageUrl, setImageUrl] = useState<string>(post.coverImageUrl);
  const [selectedTags, setSelectedTags] = useState<string[]>(tagNames);

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

  return (
    <div className="mx-auto px-6 py-10 lg:px-28">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-start">
        <div className="bg-white shadow-lg  border border-gray-300 rounded p-8">
          <form action={formAction} className="flex flex-col gap-6">
            <PostTitleInput title={title} onChange={setTitle} state={state} />
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
            <PostStatusRadioGroup
              published={published}
              onPublished={setPublished}
            />
            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="mt-4 hover:bg-gray-400 cursor-pointer"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin w-4 h-4" />
                  投稿中...
                </>
              ) : (
                '投稿する'
              )}
            </Button>
            <input
              type="hidden"
              name="published"
              value={published.toString()}
            />
            <input type="hidden" name="id" value={post.id} />
            <input type="hidden" name="tags" value={selectedTags} />
            <input
              type="hidden"
              name="previousImage"
              value={post.coverImageUrl}
            />
          </form>
        </div>
        <PostPreview title={title} content={content} imageUrl={imageUrl} />
      </div>
    </div>
  );
};

export default EditForm;
