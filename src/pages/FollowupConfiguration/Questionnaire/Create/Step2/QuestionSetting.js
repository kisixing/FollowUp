import { Switch, Button, InputNumber } from 'antd';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionSetting.less';
import { isSelectableType } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';
import JumpsSetting from './JumpsSetting';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { clickTargetQuestionId, questionList, dispatch } = props;
  if (!clickTargetQuestionId) return null;
  const _dispatch = dispatchCreator(dispatch);
  const clickTargetQuestionIndex = questionList.findIndex(({ id }) => id === clickTargetQuestionId);
  const target = questionList.find(_ => _.id === clickTargetQuestionId) || {};
  const { type, dataset, score, compulsory } = target;

  const isSelectable = isSelectableType(type);
  const [state, setState] = useState({
    visible: false,
  });

  const { visible } = state;

  const onVisibleChange = _visible => {
    setState({ visible: _visible });
  };
  const updateDateset = (data, datasetId) => {
    _dispatch('updateDateset', { datasetId, questionId: clickTargetQuestionId, data });
  };
  return (
    clickTargetQuestionId && (
      <div className={styles.containner}>
        <div style={{ marginLeft: '20px' }}>
          <div
            style={{
              background: '#495165',
              color: 'white',
              display: 'inline-block',
              padding: '2px 4px',
            }}
          >
            题目{clickTargetQuestionIndex + 1}设置
          </div>
        </div>
        <div className={styles.item}>
          <span>此题必答</span>
          <span>
            <Switch
              checked={compulsory}
              onChange={_compulsory => {
                _dispatch('updateQuestion', { compulsory: _compulsory, id: clickTargetQuestionId });
              }}
            />
          </span>
        </div>
        {isSelectable && (
          <div className={styles.item}>
            <span>跳转逻辑</span>
            <span>
              <Button
                type="link"
                onClick={() => {
                  setState({ visible: true });
                }}
              >
                设置
              </Button>
            </span>
          </div>
        )}

        {isSelectable ? (
          dataset.map(_ => {
            return (
              <div className={styles.item} key={_.id}>
                <span>{_.label}</span>
                <span>
                  <InputNumber
                    placeholder="输入分值"
                    style={{ width: '100px' }}
                    value={_.score}
                    onChange={_score => updateDateset({ score: _score }, _.id)}
                  />
                </span>
              </div>
            );
          })
        ) : (
          <div className={styles.item}>
            <span>分值设置</span>
            <span>
              <InputNumber
                placeholder="输入分值"
                style={{ width: '100px' }}
                value={score}
                onChange={_score =>
                  _dispatch('updateQuestion', { id: clickTargetQuestionId, score: _score })
                }
              />
            </span>
          </div>
        )}

        {isSelectable && (
          <JumpsSetting {...target} visible={visible} onVisibleChange={onVisibleChange} />
        )}
      </div>
    )
  );
});
