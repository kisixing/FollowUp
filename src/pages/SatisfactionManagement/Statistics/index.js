import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import { getValueOfFirstItem } from '@/utils/utils';
import SearchForm from '../TaskManagement/ManualFollowUp/SearchForm';
import OfflineData from '@/pages/Statistics/OfflineData';

const offlineData = [
  {
    name: '全部',
    cvr: 0.82,
  },
  {
    name: '妊娠高血压复诊管理',
    cvr: 0.78,
  },
  {
    name: '唐筛+羊穿+无创基因...',
    cvr: 0.45,
  },
  {
    name: 'PAC随访',
    cvr: 0.3,
  },
  {
    name: '产后42天复诊管理',
    cvr: 0.3,
  },
];
@connect()
class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: getValueOfFirstItem(offlineData, 'name', ''),
    };
  }

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

  handleTabChange = key => {
    this.setState({
      activeKey: key,
    });
  };

  render() {
    const { activeKey } = this.state;
    return (
      <PageHeaderWrapper title="搜索列表" content={<SearchForm style={{ border: '0' }} />}>
        <div className={styles.content}>
          <OfflineData
            activeKey={activeKey}
            loading={false}
            offlineData={offlineData}
            // offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          >
            我是图
          </OfflineData>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
