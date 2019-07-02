/* eslint-disable no-console */
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import SearchForm from './SearchForm';
import TableForm from './TableForm';
import styles from './index.less';

class FollowupPatientLists extends React.PureComponent {
  onSearch = fieldsValue => {
    console.log('on search', fieldsValue);
  };

  render() {
    return (
      <PageHeaderWrapper title="随访任务列表" content={<SearchForm onSearch={this.onSearch} />}>
        <div className={styles.tableForm}>
          <TableForm />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FollowupPatientLists;
