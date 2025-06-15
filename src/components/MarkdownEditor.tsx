import { ActionState } from '@/lib/actions/createPost';
import { Label } from './ui/label';
import TextareaAutosize from 'react-textarea-autosize';

type Props = {
  state: ActionState;
  content: string;
  onChange: (value: string) => void;
};

const MarkdownEditor = ({ state, content, onChange }: Props) => {
  return (
    <div>
      <Label
        htmlFor="content"
        className="font-medium text-gray-700 text-sm mb-1"
      >
        本文
      </Label>
      <TextareaAutosize
        id="content"
        name="content"
        className="w-full py-3 px-6 bg-gray-50 rounded font-semibold text-base text-gray-800 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent leading-relaxed font-mono resize-none placeholder:text-gray-400"
        minRows={6}
        value={content}
        onChange={e => onChange(e.target.value)}
      />
      {state.errors.content && (
        <p className="text-red-500 text-sm mt-1">
          {state.errors.content.join('')}
        </p>
      )}
    </div>
  );
};
export default MarkdownEditor;
