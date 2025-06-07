import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type PostStatusProps = {
  published: boolean;
  onPublished: (value: boolean) => void;
};

const PostStatusRadioGroup = ({ published, onPublished }: PostStatusProps) => {
  return (
    <RadioGroup
      value={published.toString()}
      onValueChange={value => onPublished(value === 'true')}
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
  );
};

export default PostStatusRadioGroup;
