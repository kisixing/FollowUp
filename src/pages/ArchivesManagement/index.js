/* eslint-disable no-console */
import React, { Component } from 'react';
import { Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Wrapper from './Wrapper';
import Error from './Error';

import styles from './style.less';

const { Search } = Input;

class ArchivesManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResult: true,
      size: 'large',
    };
  }

  render() {
    const { showResult, size } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.search}>
          <Search
            size={size}
            placeholder="请输入就诊卡号或手机号"
            enterButton="搜索"
            onSearch={value => console.log(value)}
            style={{ width: '360px' }}
          />
        </div>
        <div className={styles.wrapper}>{showResult ? <Wrapper /> : <Error />}</div>
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesManagement;
