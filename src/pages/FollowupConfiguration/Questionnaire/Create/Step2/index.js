/* eslint-disable react/no-array-index-key */

import router from 'umi/router';
import { Button, Row, Col, Icon } from 'antd';
import styles from './index.less';
import EditArea from './EditArea';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import QuestionSetting from './QuestionSetting';
import { windowSrcoll as onDrag } from './dragUtils';
import { QUESTION_SYMBOL, getLabel } from './types';

const { single, multiple, dropdown, blank, score, remark } = QUESTION_SYMBOL;

const types = {
  选择填空: [single, multiple, dropdown, blank],
  评分题: [score],
  文字说明: [remark],
};

function onDragStart(e, questionType, dispatch) {
  dispatch('updateState', { questionType });
}
function onClick(e, questionType, dispatch) {
  dispatch('updateState', { questionType });
  dispatch('addNewQuestion');
}
// function onDragEnd(e, dispatch) {
//   // dispatch({
//   //   type: `${MODEL}/updateState`,
//   //   payload: {
//   //     hoverTargetQuestionId: '',
//   //   },
//   // });
// }

const { questionBtn } = styles;
function mapStateToProps(rootState) {
  return { [MODEL]: rootState[MODEL] };
}

export default connect(mapStateToProps)(props => {
  // const [state, setState] = useState({});
  const { dispatch } = props;
  const _dispatch = dispatchCreator(dispatch);
  // const { } = state;
  return (
    <Row gutter={6}>
      <Col span={6}>
        <div style={{ width: '15%', position: 'fixed' }}>
          {Object.keys(types).map((typeKey, index1) => {
            return (
              <div key={index1}>
                <Title>{typeKey}</Title>
                {types[typeKey].map((type, index2) => {
                  return (
                    <Button
                      type="ghost"
                      className={questionBtn}
                      key={index2}
                      draggable
                      onDragEnd={() => {
                        _dispatch('updateState', { hoverTargetQuestionId: '' });
                      }}
                      onDrag={onDrag}
                      onDragStart={e => onDragStart(e, type, _dispatch)}
                      // onDragEnd={e => onDragEnd(e, dispatch)}
                      onClick={e => onClick(e, type, _dispatch)}
                    >
                      {getLabel(type)}
                    </Button>
                  );
                })}
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </Col>

      <Col span={12}>
        <div>
          <EditArea />
          <div className={styles.submit}>
            <p style={{ textAlign: 'center' }}>完成时显示</p>
            <Icon type="setting" style={{ float: 'right' }} />
            <p>（当 0≤ 分数 ≤ 59时显示）</p>
            <p contentEditable={false}>测试结束，你的得分是[Score]分. 您需要加强饮食管理：</p>
            <p>（当 60≤ 分数 ≤ 99时显示）</p>
            <p contentEditable={false}>
              {' '}
              测试结束，你的得分是[Score]分. 您很注重饮食管理，如果再做到以下.{' '}
            </p>
            <Button
              onClick={() => {
                // router.push('/followup-configuration/Questionnaire')
                // console.log(props[MODEL].questionList);
              }}
            >
              确定
            </Button>
            <Button
              onClick={() => {
                _dispatch('fetchPreviewData', {});
                router.push('../preview');
              }}
            >
              预览
            </Button>
          </div>
        </div>
      </Col>

      <Col span={6}>
        <div style={{ width: '17%', position: 'fixed' }}>
          <QuestionSetting />
        </div>
      </Col>
    </Row>
  );
});

function Title({ children }) {
  return <div className={styles.title}>{children}</div>;
}
