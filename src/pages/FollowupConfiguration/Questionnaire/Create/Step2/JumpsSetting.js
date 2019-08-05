import { Button, Modal, Icon, Select } from 'antd';
import { MODEL, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionSetting.less';
import {
  isSelectableType,
  QUESTION_SYMBOL,
} from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';

const { multiple } = QUESTION_SYMBOL;
const { Option } = Select;

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { type, jumps, dispatch, visible, onVisibleChange, dataset, questionList, id } = props;
  const qList = questionList.map((_, index) => ({ ..._, label: `Q${index}.${_.label}` }));
  const [state, setState] = useState({
    tempJumps: jumps,
  });
  const { tempJumps } = state;

  const isMultiple = type === multiple;
  const _dispatch = dispatchCreator(dispatch);

  const _setState = data => {
    setState({ ...state, ...data });
  };

  useEffect(() => {
    _setState({ tempJumps: jumps });
  }, [jumps]);

  const onCancel = () => {
    onVisibleChange(false);
  };
  const onOk = () => {
    onVisibleChange(false);
    _dispatch('updateQuestion', { jumps: tempJumps, id });
  };

  const isSelectable = isSelectableType(type);

  const addJump = () => {
    _setState({
      tempJumps: tempJumps.concat({
        id: Math.random()
          .toFixed(16)
          .slice(2),
        condition: isMultiple ? [] : '',
        target: null,
      }),
    });
  };
  const rmJump = jumpId => {
    const index = tempJumps.findIndex(_ => _.id === jumpId);
    const newJumps = [...tempJumps];
    newJumps.splice(index, 1);
    _setState({ tempJumps: newJumps });
  };

  const updateJumps = (jumpId, data) => {
    const index = tempJumps.findIndex(_ => _.id === jumpId);
    const newJumps = [...tempJumps];
    newJumps[index] = { ...newJumps[index], ...data };
    _setState({ tempJumps: newJumps });
  };
  return (
    <div className={styles.containner}>
      {isSelectable && (
        <Modal visible={visible} onCancel={onCancel} onOk={onOk} title="跳转逻辑" width={800}>
          <div>
            <span>共有{tempJumps.length}条跳转逻辑</span>
            {tempJumps.length === 0 ? (
              <div>
                <Button icon="plus" onClick={addJump}>
                  添加逻辑
                </Button>
              </div>
            ) : (
              tempJumps.map(({ id: jumpId, condition, target }) => {
                return (
                  <div key={jumpId}>
                    如果本题选中
                    <Select
                      style={{ width: 200 }}
                      value={condition}
                      onChange={value => {
                        updateJumps(jumpId, { condition: value });
                      }}
                    >
                      {dataset.map(({ id: datasetId, label }) => {
                        return (
                          <Option value={datasetId} key={datasetId}>
                            {label}
                          </Option>
                        );
                      })}
                    </Select>
                    ，则跳转到
                    <Select
                      mode={isMultiple ? 'multiple' : ''}
                      style={{ width: 200 }}
                      value={target}
                      onChange={value => {
                        updateJumps(jumpId, { target: value });
                      }}
                    >
                      {qList.map(({ id: qId, title }) => {
                        if (qId === id) return null;
                        return (
                          <Option value={qId} key={qId}>
                            {title}
                          </Option>
                        );
                      })}
                    </Select>
                    <Icon type="plus-circle" className={styles.jumpIcon} onClick={addJump} />
                    <Icon
                      type="minus-circle"
                      className={styles.jumpIcon}
                      onClick={() => rmJump(jumpId)}
                    />
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
