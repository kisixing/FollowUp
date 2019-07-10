import { Icon } from 'antd';
import styles from './DatasetItem.less';
import { dispatchCreator } from '../../models/questionnaireModel';
import MyInput from './MyInput';

export default connect(null)(({ onChange, value, dispatch, questionId, datasetId }) => {
  const _dispatch = dispatchCreator(dispatch);
  return (
    <div className={styles.container} style={{ width: '80%' }}>
      <MyInput
        value={value}
        onChange={onChange}
        Left={<Icon type="star" />}
        Right={
          <Icon
            type="minus-circle"
            className={styles.delete}
            onClick={() => {
              _dispatch('removeDatasetItem', { questionId, datasetId });
            }}
          />
        }
      />
    </div>
  );
});
