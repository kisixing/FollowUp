/* eslint-disable no-console */

import router from 'umi/router';

import { List, Card, Tooltip, Menu, Dropdown, Icon, Avatar, Tag } from 'antd';
import styles from './index.less';
import { category2 } from '.';

const { Item } = List;

export default item => {
  const onChartClick = () => {
    router.push(`statistics`);
  };

  const itemMenu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
          1、推荐 alipay
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
          2、推荐 taobao
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
          3、推荐 tmall
        </a>
      </Menu.Item>
    </Menu>
  );

  const CardInfo = ({ all, today }) => (
    <div className={styles.cardInfo}>
      <div>
        <p>下次节日日期</p>
        <p>{all}</p>
      </div>
      <div>
        <p>倒计时</p>
        <p>{today}</p>
      </div>
    </div>
  );

  return (
    <Item key={item.id}>
      <Card
        hoverable
        bodyStyle={{ paddingBottom: 20 }}
        actions={[
          <Tooltip title="暂停">
            <Icon type="pause" />
          </Tooltip>,
          <Tooltip title="编辑">
            <Icon
              type="edit"
              onClick={() => router.push('/concern-management/festival-concern/create/step2')}
            />
          </Tooltip>,
          <Tooltip title="统计">
            <Icon type="ordered-list" onClick={() => onChartClick(item)} />
          </Tooltip>,
          <Dropdown overlay={itemMenu}>
            <Icon type="ellipsis" />
          </Dropdown>,
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
          <CardInfo all={item.nextDate} today={item.countdown} />
          <Tag style={{ position: 'absolute', top: '-5px', right: '0' }} color="magenta">
            {category2[item.type]}
          </Tag>
        </div>
      </Card>
    </Item>
  );
};
