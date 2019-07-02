/* eslint-disable no-console */
/*
 * @Description: 疗程治疗记录
 * @Author: Zhong Jun
 * @Date: 2019-07-02 14:07:39
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Card } from 'antd';

import styles from './style.less';

const columns = [
  {
    title: 'NO.',
    dataIndex: 'number',
    align: 'center',
    width: 80,
  },
  {
    title: '日期',
    dataIndex: 'date',
    align: 'center',
    width: 120,
  },
  {
    title: '治疗师',
    dataIndex: 'therapist',
    align: 'center',
    width: 120,
  },
];

@connect(({ loading, archivesManagement }) => ({
  loading: loading.effects['archivesManagement/fetchTreatmentRecord'],
  record: archivesManagement.treatmentRecord,
}))
class TreatmentRecord extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'archivesManagement/fetchTreatmentRecord',
      payload: {
        id: '201810100089',
      },
    });
  }

  render() {
    const { loading, record } = this.props;

    return (
      <div className={styles.treatmentRecord}>
        {record.map(item => (
          <Card loading={loading}>
            <div className={styles.card}>
              <div className={styles.left}>
                <h3>{item.title}</h3>
                <p>医嘱时间：{item.date}</p>
                <p>疗程：{item.course}</p>
                <p>剩余疗程：{item.surplus}</p>
                <p>建议周期：{item.period}</p>
              </div>
              <div className={styles.right}>
                <Table
                  size="small"
                  pagination={false}
                  scroll={{ y: 190 }}
                  rowKey="date"
                  columns={columns}
                  dataSource={item.record}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}

export default TreatmentRecord;
