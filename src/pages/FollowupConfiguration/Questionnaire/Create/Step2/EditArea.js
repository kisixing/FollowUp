import { title } from './index.less';
import { container, wrap, tragStart } from './EditArea.less';

import { MODEL, ID } from '../models/index';
import RenderQestion from './QestionStrategy';

function mapStateToProps({ questionnaire_model }) {
  return { questionnaire_model };
}

export default connect(mapStateToProps)(props => {
  // const [state, setState] = useState({});
  const { dispatch, questionnaire_model } = props;
  const { questionList } = questionnaire_model;
  // const { } = state;
  function _dispatch(type, payload) {
    dispatch({ type: `${MODEL}/${type}`, payload });
  }
  return (
    <div className={container}>
      <div className={wrap}>
        <div className={title}>OGTT异常随访</div>
        <div>感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！</div>
      </div>
      {questionList.length > 0 ? (
        questionList.map(question => {
          return (
            <div key={question[ID]}>
              <RenderQestion question={question} />
            </div>
          );
        })
      ) : (
        <div
          className={tragStart}
          onDrop={e => {
            e.preventDefault();
            // e.stopPropagation()
            // debugger
            _dispatch('addNewQuestion');
          }}
          onDragOver={e => {
            e.preventDefault();
            const { target, clientY } = e;
            const rect = target.getBoundingClientRect();
            const doesNewQuestionPlaceBefore = clientY < rect.height / 2 + rect.top;
            _dispatch('updateState', { doesNewQuestionPlaceBefore });
          }}
        >
          点击题型 或者 将题型拖入此区域
        </div>
      )}
    </div>
  );
});
