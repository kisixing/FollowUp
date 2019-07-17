import { List, Tooltip, Icon, Card, Menu, Dropdown, Tag } from 'antd';
import { router } from 'umi';
import { formatWan } from '@/utils/utils';
import styles from '../Questionnaire.less';

const tagMaps = ['随访', '报名登记', '预防', '科研项目'];
const statusMaps = ['运行中', '草稿', '已暂停'];

const itemMenu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        3d menu item
      </a>
    </Menu.Item>
  </Menu>
);

const CardInfo = ({ answer, date }) => (
  <div className={styles.cardInfo}>
    <div>
      <p>答卷</p>
      <p>{answer}</p>
    </div>
    <p className={styles.date}>{date}</p>
  </div>
);

const createTag = value => {
  const tag = tagMaps[value];
  switch (tag) {
    case '随访':
      return (
        <Tag className={styles.tag} color="magenta">
          {tag}
        </Tag>
      );
    case '报名登记':
      return (
        <Tag className={styles.tag} color="volcano">
          {tag}
        </Tag>
      );
    case '预防':
      return (
        <Tag className={styles.tag} color="magenta">
          {tag}
        </Tag>
      );
    case '科研项目':
      return (
        <Tag className={styles.tag} color="green">
          {tag}
        </Tag>
      );
    default:
      return '';
  }
};

const { Item } = List;
export default ({ id, status, title, answer, date, tag }) => {
  return (
    <Item key={id} style={{ height: '202px' }}>
      <Card
        hoverable
        bodyStyle={{ padding: 0 }}
        actions={[
          <Tooltip title="编辑问卷">
            <Icon
              type="ordered-list"
              onClick={() =>
                router.push({
                  pathname: '/followup-configuration/questionnaire/create/step2',
                  query: {
                    edit: true,
                  },
                })
              }
            />
          </Tooltip>,
          <Tooltip title="图表分析">
            <Icon
              type="line-chart"
              onClick={() =>
                router.push('/followup-management/task-lists/chart/330000197902212175')
              }
            />
          </Tooltip>,
          <Tooltip title="分享">
            <Icon type="share-alt" />
          </Tooltip>,
          <Dropdown overlay={itemMenu}>
            <Icon type="ellipsis" />
          </Dropdown>,
        ]}
        extra={<p style={{ color: status === 0 && '#0096FA' }}>{statusMaps[status]}</p>}
        title={title}
      >
        <CardInfo answer={formatWan(answer)} date={date} />
        {createTag(tag)}
      </Card>
    </Item>
  );
};
