import { Checkbox } from 'antd';
import styles from './index.less';

export default React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    return (
      <Checkbox.Group
        onChange={_value => {
          onChange(_value);
        }}
        value={value}
        style={{ display: 'block' }}
      >
        {dataset.map(({ label, id }) => {
          return (
            <Checkbox className={styles.datasetItem} value={id} key={id}>
              {label}
            </Checkbox>
          );
        })}
      </Checkbox.Group>
    );
  })
);
