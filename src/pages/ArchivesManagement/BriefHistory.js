/*
 * @Description: 档案简史
 * @Author: Zhong Jun
 * @Date: 2019-07-02 18:06:49
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Timeline, Avatar } from 'antd';

import styles from './style.less';

@connect(({ archivesManagement }) => ({
  history: archivesManagement.briefHistory,
}))
class BriefHistory extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'archivesManagement/fetchBriefHistory',
      payload: {
        id: '201810100089',
      },
    });
  }

  // 区分记录类型
  differentiateType = type => {
    let typeCName = '';
    if (type === 'hospitalization' || type === 'surgery' || type === 'outpatient') {
      typeCName = '诊断';
    }
    if (type === 'followup') {
      typeCName = '随访';
    }
    return typeCName;
  };

  // 颜色区分
  differentiateColor = type => {
    let color = '#73bcff';
    if (type === 'followup') {
      color = '#ff99cc';
    }
    if (type === 'hospitalization') {
      color = '#9999ff';
    }
    if (type === 'surgery') {
      color = '#ff9900';
    }
    return color;
  };

  mapCheckedLists = lists => {
    const map = lists.map(item => {
      const { type, name, prescription } = item;
      let color = '#73bcff';
      if (type === 'pharmacy') {
        color = '#ff99cc';
      }
      if (type === 'assay') {
        color = '#73bcff';
      }
      if (type === 'examine') {
        color = '#008000';
      }
      if (type === 'surgery') {
        color = '#ff9900';
      }
      return (
        <div key={name} className={styles.box} style={{ borderColor: color }}>
          <h3>{name}</h3>
          <div>{prescription.join(',')}</div>
        </div>
      );
    });
    return map;
  };

  render() {
    const { history } = this.props;
    const item = e => {
      const color = this.differentiateColor(e.type);
      return (
        <Timeline.Item
          key={e.date}
          dot={
            <div className={styles.dot}>
              <Avatar size="small" style={{ backgroundColor: color }}>
                {e.marker.slice(0, 1)}
              </Avatar>
              <div className={styles.date}>{e.date}</div>
            </div>
          }
        >
          <div className={styles.dotContent}>
            {e.result ? (
              <div className={styles.left}>
                <div style={{ backgroundColor: color }}>
                  {this.differentiateType(e.type)}:<span className={styles.result}>{e.result}</span>
                </div>
                <span style={{ backgroundColor: color }} />
              </div>
            ) : null}
            <div className={styles.right}>{this.mapCheckedLists(e.program)}</div>
          </div>
        </Timeline.Item>
      );
    };

    const mapTimeline = lists => lists.map(i => item(i));

    return (
      <div className={styles.briefHistory}>
        <Timeline>{mapTimeline(history)}</Timeline>
      </div>
    );
  }
}

export default BriefHistory;
