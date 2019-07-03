import { Icon } from 'antd';
import styles from './DatasetItem.less';
import { dispatchCreator } from '../../models/questionnaireModel';

export default connect(null)(({ onChange, value, dispatch, questionId, datasetId }) => {
  const _dispatch = dispatchCreator(dispatch);
  return (
    <div className={styles.container}>
      <Icon type="star" />
      <input value={value} onChange={onChange} />
      <Icon
        type="minus-circle"
        className={styles.delete}
        onClick={() => {
          _dispatch('removeDatasetItem', { questionId, datasetId });
        }}
      />
    </div>
  );
});
