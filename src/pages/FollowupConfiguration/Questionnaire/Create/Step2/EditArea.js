import { title } from './index.less';
import { container, wrap, tragStart } from './EditArea.less';

import { ID, dispatchCreator } from '../../models/questionnaireModel';
import QuestionItem from './QuestionItem';
import MyInput from './MyInput';

function mapStateToProps({ questionnaire_model }) {
  return { questionnaire_model };
}

export default connect(mapStateToProps)(props => {
  // const [state, setState] = useState({});
  const { dispatch, questionnaire_model } = props;
  const { questionList, questionnaireTitle } = questionnaire_model;
  // const { } = state;

  const _dispatch = dispatchCreator(dispatch);
  return (
    <div className={container}>
      <div className={wrap}>
        <div className={title}>
          <MyInput
            value={questionnaireTitle}
            onChange={_questionnaireTitle => {
              _dispatch('updateState', {
                questionnaireTitle: _questionnaireTitle,
              });
            }}
          />
        </div>
        <MyInput value="感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！" />
      </div>
      {questionList.length > 0 ? (
        questionList.map((question, index) => {
          return (
            <div key={question[ID]}>
              <QuestionItem question={question} index={index} />
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
