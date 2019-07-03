/* eslint-disable no-console */
import React, { Component } from 'react';
import { Input } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Wrapper from './Wrapper';
import Error from './Error';
import CreateForm from './CreateForm';

import styles from './style.less';

const { Search } = Input;

class ArchivesManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResult: false,
      isError: false,
      size: 'large',
    };
  }

  onSearch = value => {
    if (value) {
      this.setState({
        isResult: true,
        isError: false,
      });
    } else {
      this.setState({
        isResult: false,
        isError: true,
      });
    }
  };

  onSubmit = values => {
    console.log('onSubmit', values);
  };

  render() {
    const { isResult, isError, size } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.search}>
          <Search
            size={size}
            placeholder="请输入就诊卡号或手机号"
            enterButton="搜索"
            onSearch={this.onSearch}
            style={{ width: '360px' }}
          />
        </div>
        <div className={styles.wrapper}>
          {isError ? <Error /> : null}
          {isResult ? <Wrapper /> : <CreateForm onSubmit={this.onSubmit} />}
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default ArchivesManagement;
