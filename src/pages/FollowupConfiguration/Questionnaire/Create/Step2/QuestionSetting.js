import { Switch, Button, Modal, Dropdown, Menu, Icon } from 'antd';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionSetting.less';

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
  const { dispatch } = props;
  const _dispatch = dispatchCreator(dispatch);
  const { clickTargetQuestionIndex, clickTargetQuestionId } = props;
  const [state, setState] = useState({ visible: false });
  const { visible } = state;
  const onCancel = () => {
    setState({ visible: false });
    _dispatch();
  };
  const onOk = () => {
    setState({ visible: false });
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
            <Switch />
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
        <Modal visible={visible} onCancel={onCancel} onOk={onOk} title="跳转逻辑">
          <div>
            <span>共有1条跳转逻辑</span>
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
      </div>
    )
  );
});
