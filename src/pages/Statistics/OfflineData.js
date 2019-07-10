import React, { memo } from 'react';
import { Card, Tabs, Row, Col } from 'antd';
import styles from './Analysis.less';
import { TimelineChart, Pie } from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';

const CustomTab = ({ data, currentTabKey: currentKey, subTitle = '成功率' }) => (
  <Row gutter={8} style={{ width: 158, margin: '8px 0' }}>
    <Col span={12}>
      <NumberInfo
        title={data.name}
        subTitle={subTitle}
        gap={2}
        total={`${data.cvr * 100}%`}
        theme={currentKey !== data.name && 'light'}
      />
    </Col>
    <Col span={12} style={{ paddingTop: 36, marginLeft: -225, pointerEvents: 'none' }}>
      <Pie
        animate={false}
        color={currentKey !== data.name && '#BDE4FF'}
        inner={0.55}
        tooltip={false}
        margin={[0, 0, 0, 0]}
        percent={data.cvr * 100}
        height={64}
      />
    </Col>
  </Row>
  // <div>
  //   <NumberInfo
  //     title={data.name}
  //     subTitle='成功率'
  //     gap={2}
  //     total={`${data.cvr * 100}%`}
  //     theme={currentKey !== data.name && 'light'}
  //   />
  //   <Pie
  //     animate={false}
  //     color={currentKey !== data.name && '#BDE4FF'}
  //     inner={0.55}
  //     tooltip={false}
  //     margin={[0, 0, 0, 0]}
  //     percent={data.cvr * 100}
  //     height={64}
  //   />
  // </div>
);

const { TabPane } = Tabs;

const OfflineData = memo(
  ({
    title = '人工随访成功率分析',
    activeKey,
    loading,
    offlineData,
    offlineChartData,
    handleTabChange,
    children,
    subTitle,
  }) => {
    const _children = children || (
      <div style={{ padding: '0 24px' }}>
        <TimelineChart
          height={400}
          data={offlineChartData}
          titleMap={{
            y1: '随访量',
            y2: '成功量',
          }}
        />
      </div>
    );
    return (
      <Card
        title={title}
        loading={loading}
        className={styles.offlineCard}
        bordered={false}
        style={{ marginTop: 32 }}
      >
        <Tabs activeKey={activeKey} onChange={handleTabChange}>
          {offlineData.map(shop => (
            <TabPane
              tab={<CustomTab subTitle={subTitle} data={shop} currentTabKey={activeKey} />}
              key={shop.name}
            >
              {_children}
            </TabPane>
          ))}
        </Tabs>
      </Card>
    );
  }
);

export default OfflineData;
