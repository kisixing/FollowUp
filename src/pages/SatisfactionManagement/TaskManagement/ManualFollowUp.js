import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from './ManualFollowUp/SearchForm';
import FollowUpTable from './ManualFollowUp/FollowUpTable';

class ManualFollowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <PageHeaderWrapper title="搜索列表">
        <SearchForm />
        <FollowUpTable />
      </PageHeaderWrapper>
    );
  }
}

export default ManualFollowUp;
