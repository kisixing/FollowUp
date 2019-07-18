/* eslint-disable no-console */

import router from 'umi/router';

import { List, Card, Avatar, Statistic, Tooltip, Icon } from 'antd';

import styles from './index.less';

export default item => {
  const CardInfo = ({ all }) => (
    <div className={styles.cardInfo}>
      <Statistic title="今日跟踪任务" value={all} />
    </div>
  );
  return (
    <List.Item key={item.id}>
      <Card
        hoverable
        bodyStyle={{ paddingBottom: 20 }}
        // onClick={() => router.push('/appointment-tracking/edit')}
        actions={[
          <Tooltip title="详情">
            <Icon type="ordered-list" onClick={() => router.push('detail')} />
          </Tooltip>,
          <Tooltip title="编辑">
            <Icon type="edit" onClick={() => router.push('edit')} />
          </Tooltip>,
        ]}
      >
        <Card.Meta
          style={{ cursor: 'pointer' }}
          avatar={<Avatar size="small" src={item.avatar} />}
          title={
            <div>
              {item.title} <span className={styles.status}>{item.status.dec}</span>
            </div>
          }
        />
        <div className={styles.cardItemContent}>
          <CardInfo all={item.all} today={item.todayFollowup} />
        </div>
      </Card>
    </List.Item>
  );
};
