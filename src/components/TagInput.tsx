import { Plus, X } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  inputTag: string;
  setInputTag: (value: string) => void;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
};

const TagInput = ({
  inputTag,
  setInputTag,
  selectedTags,
  setSelectedTags,
}: Props) => {
  const addTag = (tag: string) => {
    if (
      !tag.trim() ||
      selectedTags.some(selectedTag =>
        selectedTag.toLowerCase().includes(tag.toLowerCase())
      ) ||
      tag.length < 2
    ) {
      return;
    }
    setInputTag('');
    const newSelectedTags = [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(prevTags =>
      prevTags.filter(prevTag => prevTag !== tagToRemove)
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputTag);
    }
  };
  return (
    <div>
      <Label htmlFor="tag" className="font-medium text-gray-700 text-sm">
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
              className="hover:bg-blue-200 rounded p-0.5 transition-colors"
              aria-label={`${tag}タグを削除`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          className="bg-gray-50 mt-2 py-4"
          type="text"
          id="tag"
          value={inputTag}
          placeholder="新しいタグを入力..."
          onChange={e => setInputTag(e.target.value)}
          onKeyDown={handleInputKeyDown}
        />
        <button
          onClick={() => addTag(inputTag)}
          type="button"
          className="px-3 mt-2 btn bg-gray-600 text-white rounded-3xl cursor-pointer"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
