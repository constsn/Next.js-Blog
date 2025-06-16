import { ActionState } from '@/lib/actions/createPost';
import { Input } from './ui/input';
import { Label } from './ui/label';

type Props = {
  title: string;

  onChange: (value: string) => void;
  state: ActionState;
};

const PostTitleInput = ({ title, onChange, state }: Props) => (
  <div>
    <Label htmlFor="title" className="font-medium text-gray-700 text-sm">
      タイトル
    </Label>
    <Input
      className="mt-2 py-5 text-gray-800 placeholder-gray-400 font-bold resize-none bg-gray-50"
      type="text"
      id="title"
      name="title"
      value={title}
      onChange={e => onChange(e.target.value)}
      placeholder="タイトルを入力してください"
    />
    {state.errors.title && (
      <p className="text-red-500 text-sm mt-1">{state.errors.title.join('')}</p>
    )}
  </div>
);

export default PostTitleInput;
