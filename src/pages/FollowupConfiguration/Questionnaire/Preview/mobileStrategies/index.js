import { QUESTION_SYMBOL } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';
import Single from './Single';
import Multiple from './Multiple';
import DropdownType from './Dropdown';
import Blank from './Blank';
import Score from './Score';
import Remark from './Remark';

const { single, multiple, dropdown, blank, score, remark } = QUESTION_SYMBOL;

const RenderType = {
  [single]: Single,
  [multiple]: Multiple,
  [dropdown]: DropdownType,
  [score]: Score,
  [blank]: Blank,
  [remark]: Remark,
};
export default React.memo(props => {
  const { type } = props;
  const Type = RenderType[type];
  return <Type {...props} />;
});
