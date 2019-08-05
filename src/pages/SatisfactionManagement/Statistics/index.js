import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Tabs, Table, Card } from 'antd';

import styles from './index.less';
import { getValueOfFirstItem } from '@/utils/utils';
import SearchForm from '../TaskManagement/ManualFollowUp/SearchForm';
import OfflineData from '@/pages/Statistics/OfflineData';
import { Bar } from '@/components/Charts';
import Line from './Line';

function InnerTabs() {
  const [state, setState] = useState({
    activeKey: '0',
  });

  const chartData = [];
  for (let i = 0; i < 20; i += 1) {
    chartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 1000,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  const data1 = [['5分', 132], ['4分', 145], ['3分', 65], ['2分', 12], ['1分', 24]].map(
    ([x, y]) => ({ x, y })
  );
  const data3 = [['妇科', 3.9], ['产科', 3], ['胎儿医学', 4], ['生殖医学', 3.9]].map(([x, y]) => ({
    x,
    y,
  }));
  return (
    <Tabs activeKey={state.activeKey} onChange={key => setState({ ...state, activeKey: key })}>
      <Tabs.TabPane tab="问卷分析" key="0">
        <Bar data={data1} height={400} title="科室总分" />
        <Table
          size="small"
          pagination={false}
          columns={['选项', '1分', '2分', '3分', '4分', '5分', '平均分'].map(_ => ({
            title: _,
            key: _,
            dataIndex: _,
          }))}
          dataSource={[
            {
              选项: '比例人数',
              '1分': '6%',
              '2分': '3%',
              '3分': '17%',
              '4分': '38%',
              '5分': '34%',
              平均分: '3.9',
              key: 1,
            },
            {
              选项: '',
              '1分': '24',
              '2分': '12',
              '3分': '65',
              '4分': '145',
              '5分': '132',
              平均分: '',
              key: 2,
            },
          ]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="时间纵比" key="1">
        <Line />
        <Table
          size="small"
          pagination={false}
          columns={['时间', '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'].map(
            _ => ({ title: _, key: _, dataIndex: _ })
          )}
          dataSource={[
            {
              时间: '平均分',
              '1月': '3',
              '2月': '4',
              '3月': '3.5',
              '4月': '5',
              '5月': '4.9',
              '6月': '6',
              '7月': '7',
              '8月': '9',
              '9月': '13',
            },
          ]}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="交叉对比" key="2">
        <Bar data={data3} height={400} title="平均分" />
        <Table
          size="small"
          pagination={false}
          columns={['科室', '妇科', '产科', '胎儿医学', '生殖医学'].map(_ => ({
            title: _,
            key: _,
            dataIndex: _,
          }))}
          dataSource={[{ 科室: '平均分', 妇科: '3.9', 产科: '3', 胎儿医学: '4', 生殖医学: '3.9' }]}
        />
      </Tabs.TabPane>
    </Tabs>
  );
}

const offlineData = [
  {
    name: '全部',
    cvr: 0.82,
  },
  {
    name: '妇科',
    cvr: 0.78,
  },
  {
    name: '产科',
    cvr: 0.45,
  },
  {
    name: '胎儿医学科',
    cvr: 0.3,
  },
  {
    name: '生殖医学科',
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
            title="满意度分析"
            subTitle="平均满意度"
            activeKey={activeKey}
            loading={false}
            offlineData={offlineData}
            // offlineChartData={offlineChartData}
            handleTabChange={this.handleTabChange}
          >
            <Card title="Q1 请从总体上给本科室打分">
              <InnerTabs />
            </Card>
          </OfflineData>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default SearchList;
