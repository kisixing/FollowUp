import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';

import SearchForm from './SearchForm';
import TableForm from './TableForm';

@connect()
class SearchList extends Component {
  handleTabChange = key => {
    const { match } = this.props;
    switch (key) {
      case 'articles':
        router.push(`${match.url}/articles`);
        break;
      case 'applications':
        router.push(`${match.url}/applications`);
        break;
      case 'projects':
        router.push(`${match.url}/projects`);
        break;
      default:
        break;
    }
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  render() {
    const { dispatch } = this.props;
    const searchFormProps = {
      dispatch,
    };
    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={<SearchForm
          {...searchFormProps}
          wrappedComponentRef={form => {
          this.form = form
        }}
        />}
      >
        <div className={styles.content}>
          <TableForm />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
