import React, { Component } from 'react';
import { Tabs } from 'antd';

// tab 组建
import BriefHistory from './BriefHistory';
import EMR from './EMR';
import SearchRecord from './SearchRecord';
import FollowupRecords from './FollowupRecords';
import TreatmentRecord from './TreatmentRecord';
import styles from './style.less';

const { TabPane } = Tabs;
// tabs数据
const TABS_DATA = [
  {
    key: 'brief-history',
    title: '档案简史',
    component: <BriefHistory />,
  },
  {
    key: 'EMR',
    title: '电子病历',
    component: <EMR />,
  },
  {
    key: 'search-record',
    title: '咨询记录',
    component: <SearchRecord />,
  },
  {
    key: 'followup-records',
    title: '随访记录',
    component: <FollowupRecords />,
  },
  {
    key: 'treatment-record',
    title: '疗程治疗记录',
    component: <TreatmentRecord />,
  },
];

class Content extends Component {
  componentDidMount() {}

  render() {
    const mapTabChildren = array => {
      return array.map(item => (
        <TabPane tab={item.title} key={item.key} style={{ padding: '0 16px' }}>
          {item.component}
        </TabPane>
      ));
    };

    return (
      <Tabs className={styles.tabs} defaultActiveKey="brief-history">
        {mapTabChildren(TABS_DATA)}
      </Tabs>
    );
  }
}

export default Content;
