/* eslint-disable react/no-array-index-key */

import router from 'umi/router';
import { Button, Row, Col } from 'antd';
import styles from './index.less';
import EditArea from './EditArea';
import { MODEL, dispatchCreator } from '../models';

const types = {
  选择填空: [{ type: '单选题' }, { type: '多选题' }, { type: '填空题' }, { type: '下拉题' }],
  评分题: [{ type: '打分题' }],
  文字说明: [{ type: '段落说明' }],
};

function onDrag(e, questionType, dispatch) {
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
    <Row>
      <Col span={6}>
        {Object.keys(types).map((typeKey, index1) => {
          return (
            <div key={index1}>
              <Title>{typeKey}</Title>
              {types[typeKey].map(({ type }, index2) => {
                return (
                  <Button
                    type="ghost"
                    className={questionBtn}
                    key={index2}
                    draggable
                    onDrag={e => onDrag(e, type, _dispatch)}
                    // onDragEnd={e => onDragEnd(e, dispatch)}
                    onClick={e => onClick(e, type, _dispatch)}
                  >
                    {type}
                  </Button>
                );
              })}
              <br />
              <br />
            </div>
          );
        })}
      </Col>

      <Col span={12}>
        <div>
          <EditArea />
          <Button onClick={() => router.push('/followup-configuration/questionnaire/create/step3')}>
            提交
          </Button>
        </div>
      </Col>

      <Col span={6}>
        <div />
      </Col>
    </Row>
  );
});

function Title({ children }) {
  return <div className={styles.title}>{children}</div>;
}
