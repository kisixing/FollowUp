import { Menu, Dropdown, Icon } from 'antd';
import styles from './index.less';

export default React.memo(
  connect(null)(({ dataset, value, onChange }) => {
    const target = dataset.find(_ => _.id === value);
    const label = target && target.label;
    const menu = (
      <Menu
        onClick={({ key }) => {
          onChange(key);
        }}
      >
        {dataset.map(({ label: _label, id }) => {
          return <Menu.Item key={id}>{_label}</Menu.Item>;
        })}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <div className={styles.datasetItem}>
          <div style={{ overflow: 'hidden' }}>
            {label}

            <Icon type="down" style={{ float: 'right', paddingTop: '6px' }} />
          </div>
        </div>
      </Dropdown>
    );
  })
);
