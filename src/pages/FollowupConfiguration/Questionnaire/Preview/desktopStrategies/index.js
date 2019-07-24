import { QUESTION_SYMBOL } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';
import Single from './Single';
import Multiple from './Multiple';
import DropdownType from './Dropdown';
import Blank from './Blank';
import Score from './Score';
import Remark from './Remark';
import useScroll from '@/utils/useScroll';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';

const { single, multiple, dropdown, blank, score, remark } = QUESTION_SYMBOL;

const RenderType = {
  [single]: Single,
  [multiple]: Multiple,
  [dropdown]: DropdownType,
  [score]: Score,
  [blank]: Blank,
  [remark]: Remark,
};
function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const [ref, scroll] = useScroll();
  const { type, questionToScroll, dispatch, id } = props;
  const _dispatch = dispatchCreator(dispatch);
  useEffect(() => {
    if (questionToScroll === id) {
      scroll();
      _dispatch('updateState', { questionToScroll: '' });
    }
  }, [questionToScroll]);

  const Type = RenderType[type];
  return (
    <div ref={ref}>
      <Type {...props} />;
    </div>
  );
});
