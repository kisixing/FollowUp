import { Button, Modal, Dropdown, Menu, Icon } from 'antd';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionSetting.less';
import { isSelectableType } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { type, jumps, dispatch, visible, onVisibleChange, dataset } = props;
  const [state, setState] = useState({
    tempJumps: jumps,
  });

  const _dispatch = dispatchCreator(dispatch);

  const _setState = data => {
    setState({ ...state, ...data });
  };

  const onCancel = () => {
    onVisibleChange(false);
  };
  const onOk = () => {
    onVisibleChange(false);
    _dispatch();
  };
  const itemMenu = (
    <Menu>
      {dataset.map(({ label, id: _id }) => (
        <Menu.Item key={_id}>{label}</Menu.Item>
      ))}
    </Menu>
  );
  const isSelectable = isSelectableType(type);

  const { tempJumps } = state;

  const addJump = () => {
    _setState({
      tempJumps: tempJumps.concat({
        id: Math.random()
          .toFixed(16)
          .slice(2),
        condition: [],
        target: null,
      }),
    });
  };

  return (
    <div className={styles.containner}>
      {isSelectable && (
        <Modal visible={visible} onCancel={onCancel} onOk={onOk} title="跳转逻辑">
          <div>
            <span>共有{tempJumps.length}条跳转逻辑</span>
            {tempJumps.length === 0 ? (
              <div>
                <Button icon="plus" onClick={addJump}>
                  添加逻辑
                </Button>
              </div>
            ) : (
              tempJumps.map(({ id: _id }) => {
                return (
                  <div key={_id}>
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
                    <Icon type="plus-circle" className={styles.jumpIcon} />
                    <Icon type="minus-circle" className={styles.jumpIcon} />
                  </div>
                );
              })
            )}
          </div>
        </Modal>
      )}
    </div>
  );
});
