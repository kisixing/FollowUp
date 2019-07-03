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

  render() {
    const { history } = this.props;
    const item = e => {
      return (
        <Timeline.Item
          key={e.date}
          dot={
            <div className={styles.dot}>
              <Avatar size="small" style={{ backgroundColor: '#fde3cf' }}>
                {e.marker}
              </Avatar>
              <div className={styles.date}>{e.date}</div>
            </div>
          }
        >
          <div className={styles.dotContent}>
            <div className={styles.left}>left</div>
            <div className={styles.right}>right</div>
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
