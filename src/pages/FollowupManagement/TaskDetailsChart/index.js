/*
 * @Description: chart统计分析
 * @Author: zhong jun
 * @Date: 2019-06-22 01:19:49
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Pie } from '@/components/Charts';
import TableForm from '../TaskDetails/TableForm';
import styles from './index.less';

@connect(({ global, chart }) => ({
  global,
  chart,
}))
class FollowupPatientChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chart } = this.props;
    const formatLayout = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };
    return (
      <PageHeaderWrapper>
        <Row gutter={24} type="flex" style={{ marginBottom: '24px' }}>
          <Col {...formatLayout}>
            <div style={{ background: '#fff' }}>
              <h4 className={styles.pieTitle}>超时复诊跟踪结果</h4>
              <Pie
                hasLegend
                data={chart.PieData1}
                valueFormat={value => `${value} 人`}
                height={200}
                lineWidth={2}
                style={{ padding: '8px 0' }}
              />
            </div>
          </Col>
          <Col {...formatLayout}>
            <div style={{ background: '#fff' }}>
              <h4 className={styles.pieTitle}>准时 / 超时分布</h4>
              <Pie
                hasLegend
                data={chart.PieData2}
                valueFormat={value => `${value} 人`}
                height={200}
                lineWidth={2}
                style={{ padding: '8px 0' }}
              />
            </div>
          </Col>
        </Row>
        <div className={styles.table}>
          <div className={styles.header}>
            <h4>高位复诊随访</h4>
            <Button type="link">下载excel</Button>
          </div>
          <TableForm />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default FollowupPatientChart;
