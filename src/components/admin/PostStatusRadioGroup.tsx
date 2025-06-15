import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

type PostStatusProps = {
  published: boolean;
  onPublished: (value: boolean) => void;
};

const PostStatusRadioGroup = ({ published, onPublished }: PostStatusProps) => {
  return (
    <div>
      <Label htmlFor="tag" className="font-medium text-gray-700 text-sm">
        公開ステータス
      </Label>
      <RadioGroup
        value={published.toString()}
        onValueChange={value => onPublished(value === 'true')}
        className="mt-4"
      >
        <div className="flex items-center gap-4">
          <RadioGroupItem value="true" id="published-true" />
          <div className="flex gap-1.5">
            <Eye
              size={16}
              className="text-green-500 group-hover:text-green-600"
            />
            <Label htmlFor="公開">公開</Label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <RadioGroupItem value="false" id="published-false" />
          <div className="flex gap-1.5">
            <EyeOff
              size={16}
              className="text-gray-500 group-hover:text-gray-700"
            />
            <Label htmlFor="非公開">非公開</Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PostStatusRadioGroup;
