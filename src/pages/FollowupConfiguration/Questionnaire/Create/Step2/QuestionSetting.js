import { Switch, Button, Modal, Dropdown, Menu, Icon, InputNumber } from 'antd';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionSetting.less';
import { isSelectableType, isSingleType } from './types';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}
const itemMenu = (
  <Menu>
    <Menu.Item>选项1</Menu.Item>
    <Menu.Item>选项2</Menu.Item>
  </Menu>
);

export default connect(mapStateToProps)(props => {
  const { clickTargetQuestionId, questionList } = props;
  if (!clickTargetQuestionId) return null;
  const { dispatch } = props;
  const _dispatch = dispatchCreator(dispatch);
  const clickTargetQuestionIndex = questionList.findIndex(({ id }) => id === clickTargetQuestionId);

  const target = questionList.find(_ => _.id === clickTargetQuestionId) || {};

  const { type, dataset, score, compulsory, jumps } = target;
  const isSelectable = isSelectableType(type);
  const isSingle = isSingleType(type);
  const [state, setState] = useState({ visible: false });
  const { visible } = state;
  const onCancel = () => {
    setState({ visible: false });
    _dispatch();
  };
  const onOk = () => {
    setState({ visible: false });
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

        {isSingle && (
          <Modal visible={visible} onCancel={onCancel} onOk={onOk} title="跳转逻辑">
            <div>
              <span>共有{jumps.length}条跳转逻辑</span>
              <div>
                如果本题选中
                <Dropdown overlay={itemMenu}>
                  <Button size="small">
                    选项1
                    <Icon type="down" />
                  </Button>
                </Dropdown>
                ，则跳转到
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item>题目1</Menu.Item>
                      <Menu.Item>题目2</Menu.Item>
                    </Menu>
                  }
                >
                  <Button size="small">
                    题目1
                    <Icon type="down" />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </Modal>
        )}
      </div>
    )
  );
});
