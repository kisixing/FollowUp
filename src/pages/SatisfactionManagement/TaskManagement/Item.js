/* eslint-disable no-console */

import router from 'umi/router';

import { List, Card, Tooltip, Dropdown, Icon } from 'antd';

import styles from './index.less';

export default item => {
  const onDetailClick = () => {
    // const { match } = props;
    router.push(`manual-followup`);
  };

  const onChartClick = () => {
    router.push(`/satisfaction-management/satisfaction-lists/statistics`);
  };

  const CardInfo = ({ all, today }) => (
    <div className={styles.cardInfo}>
      <div>
        <p>调查患者</p>
        <p>{all}</p>
      </div>
      <div>
        <p>今日完成</p>
        <p>{today}</p>
      </div>
    </div>
  );

  return (
    <List.Item key={item.id}>
      <Card
        hoverable
        bodyStyle={{ paddingBottom: 20 }}
        actions={[
          <Tooltip title="随访人员统计">
            <Icon type="ordered-list" onClick={() => onDetailClick(item)} />
          </Tooltip>,
          <Tooltip title="图表分析">
            <Icon type="line-chart" onClick={() => onChartClick(item)} />
          </Tooltip>,
          <Tooltip title="编辑">
            <Icon
              type="edit"
              onClick={() =>
                router.push('/satisfaction-management/satisfaction-lists/create/step2')
              }
            />
          </Tooltip>,
          <Dropdown overlay={<div />}>
            <Icon type="ellipsis" />
          </Dropdown>,
        ]}
      >
        <Card.Meta
          style={{ cursor: 'pointer' }}
          // avatar={<Avatar size="small" src={item.avatar} />}
          title={
            <div>
              {item.title} <span className={styles.status}>{item.status.dec}</span>
            </div>
          }
        />
        <div className={styles.cardItemContent}>
          <CardInfo all={item.all} today={item.today} />
        </div>
      </Card>
    </List.Item>
  );
};
