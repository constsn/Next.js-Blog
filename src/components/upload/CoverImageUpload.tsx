import { ActionState } from '@/lib/actions/createPost';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

type Props = {
  state: ActionState;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CoverImageUpload = ({ state, onChange }: Props) => (
  <div>
    <Label
      htmlFor="coverImageUrl"
      className="font-medium text-gray-700 text-sm"
    >
      画像アップロード
    </Label>
    <Input
      className="mt-2 bg-gray-50 focus:ring-2 focus:ring-blue-300"
      type="file"
      id="coverImageUrl"
      name="coverImageUrl"
      accept="image/*"
      onChange={onChange}
    />
    {state.errors.coverImageUrl && (
      <p className="text-red-500 text-sm mt-1">
        {state.errors.coverImageUrl.join('')}
      </p>
    )}
  </div>
);

export default CoverImageUpload;
