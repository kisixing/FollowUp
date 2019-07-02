/*
 * @Description: 档案简史
 * @Author: Zhong Jun
 * @Date: 2019-07-02 18:06:49
 */
import React, { Component } from 'react';
import { Timeline, Icon, Avatar } from 'antd';

import styles from './style.less';

class BriefHistory extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className={styles.briefHistory}>
        <Timeline mode="alternate">
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item color="green">Solve initial network problems 2015-09-01</Timeline.Item>
          <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
            architecto beatae vitae dicta sunt explicabo.
          </Timeline.Item>
          <Timeline.Item color="red">Network problems being solved 2015-09-01</Timeline.Item>
          <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
          <Timeline.Item
            dot={
              <div className={styles.dot}>
                <Avatar size="small" style={{ backgroundColor: '#fde3cf' }}>
                  U
                </Avatar>
                <div className={styles.date}>2018-12-01</div>
              </div>
            }
          >
            Technical testing 2015-09-01
          </Timeline.Item>
        </Timeline>
      </div>
    );
  }
}

export default BriefHistory;
