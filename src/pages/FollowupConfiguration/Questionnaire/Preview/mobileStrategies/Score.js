import { Rate } from 'antd';
import styles from './index.less';

export default React.memo(
  connect(null)(({ value, onChange }) => {
    return <Rate value={value} onChange={onChange} className={styles.datasetItem} />;
  })
);
