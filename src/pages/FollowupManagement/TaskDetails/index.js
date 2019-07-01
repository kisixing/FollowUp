/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from './SearchForm';
import TableForm from './TableForm';
import styles from './index.less';

class FollowupPatientLists extends Component {
  // onSearch = fieldsValue => {
  //   console.log('on search', fieldsValue);
  // };

  render() {
    return (
      <PageHeaderWrapper
        title="随访任务列表"
        content={
          <SearchForm />
        }
      >
        <div className={styles.tableForm}>
          <TableForm />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FollowupPatientLists;
