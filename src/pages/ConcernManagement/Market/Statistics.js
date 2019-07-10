import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Button } from 'antd';
import styles from './Statistics.less';

import SearchForm from './Statistics/SearchForm';
import TableForm from './Statistics/TableForm';

class Statistics extends Component {
  render() {
    const { dispatch } = this.props;
    const searchFormProps = {
      dispatch,
    };
    return (
      <PageHeaderWrapper title="搜索列表">
        <Card>
          <SearchForm
            {...searchFormProps}
            wrappedComponentRef={form => {
              this.form = form;
            }}
          />
        </Card>
        <div className={styles.content}>
          <TableForm />
          <Button className={styles.msg}>发送信息</Button>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Statistics;
