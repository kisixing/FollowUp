import { Component } from 'react';
import withRouter from 'umi/withRouter';
import { title } from './index.less';
import { container, wrap, tragStart } from './EditArea.less';

import { ID, dispatchCreator } from '../../models/questionnaireModel';
import QuestionItem from './QuestionItem';
import MyInput from './MyInput';

function mapStateToProps({ questionnaire_model }) {
  return { questionnaire_model };
}
// export default connect(mapStateToProps)(props => {
@connect(mapStateToProps)
class EditArea extends Component {
  componentWillMount() {
    const {
      dispatch,
      location: {
        query: { edit },
      },
    } = this.props;
    // eslint-disable-next-line no-unused-expressions

    dispatch({
      type: 'questionnaire_model/fetch',
      payload: { edit: !!edit },
    });
  }

  render() {
    // const [state, setState] = useState({});
    const { dispatch, questionnaire_model } = this.props;
    const { questionList, questionnaireTitle, questionnaireSubTitle } = questionnaire_model;
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
          <MyInput
            value={questionnaireSubTitle}
            onChange={_questionnaireSubTitle => {
              _dispatch('updateState', {
                questionnaireSubTitle: _questionnaireSubTitle,
              });
            }}
          />
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

              _dispatch('addNewQuestion');
            }}
            onDragOver={e => {
              e.preventDefault();
              // let doesNewQuestionPlaceBefore = false

              // const { target, clientY } = e;
              // if(clientY>lastY){
              //   console.log('aaa')
              //   doesNewQuestionPlaceBefore = true
              // }
              // _dispatch('updateState', { doesNewQuestionPlaceBefore });

              // const rect = target.getBoundingClientRect();
              // const doesNewQuestionPlaceBefore = clientY < rect.height / 2 + rect.top;
            }}
          >
            点击题型 或者 将题型拖入此区域
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditArea);
