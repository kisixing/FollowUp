import React from 'react';

import Sider from './Sider';
import Content from './Content';

import styles from './style.less';

export default function Wrapper() {
  return (
    <div style={{ height: '100%' }}>
      <div className={styles.sider}>
        <Sider />
      </div>
      <div className={styles.content}>
        <Content />
      </div>
    </div>
  );
}
