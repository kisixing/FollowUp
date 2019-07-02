/* eslint-disable no-console */
import React, { Component } from 'react';
import { Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

const { Search } = Input;

class ArchivesManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.search}>
          <Search
            placeholder="请输入就诊卡号或手机号"
            enterButton="搜索"
            onSearch={value => console.log(value)}
            style={{ width: '360px' }}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.side} />
          <div className={styles.main} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesManagement;
