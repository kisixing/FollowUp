import { Radio } from 'antd';
import styles from './index.less';

export default React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    return (
      <Radio.Group
        onChange={e => {
          onChange(e.target.value);
        }}
        value={value}
        style={{ display: 'block' }}
      >
        {dataset.map(({ label, id }) => {
          return (
            <Radio className={styles.datasetItem} value={id} key={id}>
              {label}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  })
);
