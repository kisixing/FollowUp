import React, { Component } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from './SearchForm';
import TableForm from './TableForm';
import styles from './index.less';

class FollowupPatientLists extends Component {
  render() {
    return (
      <PageHeaderWrapper
        title="随访任务列表"
        // eslint-disable-next-line no-return-assign
        content={<SearchForm wrappedComponentRef={form => (this.searchForm = form)} />}
      >
        <div className={styles.tableForm}>
          <TableForm />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FollowupPatientLists;
