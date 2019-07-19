import Icon from '@/components/IconFont';
import styles from './DatasetItem.less';
import { dispatchCreator } from '../../models/questionnaireModel';
import MyInput from './MyInput';
import { QUESTION_SYMBOL, QUESTION_DATASET_SYMBOL } from './types';

const { other } = QUESTION_DATASET_SYMBOL;
const { single, multiple, dropdown } = QUESTION_SYMBOL;
const iconNames = {
  [single]: 'icon-radio',
  [multiple]: 'icon-checkbox',
  [dropdown]: 'icon-down',
};
export default connect(null)(
  ({ onChange, value, dispatch, questionId, datasetId, type, datasetType }) => {
    const _dispatch = dispatchCreator(dispatch);
    return (
      // 其他
      datasetType === other ? (
        <div className={styles.container}>
          <MyInput
            value={value}
            onChange={onChange}
            Left={<Icon type={iconNames[type]} style={{ margin: '0 5px' }} />}
            Right={<input style={{ float: 'right' }} readOnly />}
          />
          <Icon
            style={{ margin: '0 5px' }}
            type="icon-minus-circle"
            className={styles.delete}
            onClick={() => {
              _dispatch('removeDatasetItem', { questionId, datasetId });
            }}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <MyInput
            value={value}
            onChange={onChange}
            Left={<Icon type={iconNames[type]} style={{ margin: '0 5px' }} />}
          />
          <Icon
            style={{ margin: '0 5px' }}
            type="icon-minus-circle"
            className={styles.delete}
            onClick={() => {
              _dispatch('removeDatasetItem', { questionId, datasetId });
            }}
          />
        </div>
      )
    );
  }
);
