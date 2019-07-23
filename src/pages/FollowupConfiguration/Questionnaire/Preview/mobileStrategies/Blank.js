import TextArea from 'antd/lib/input/TextArea';
import styles from './index.less';

export default React.memo(
  connect(null)(({ value, onChange }) => {
    return (
      <TextArea
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.datasetItem}
      />
    );
  })
);
