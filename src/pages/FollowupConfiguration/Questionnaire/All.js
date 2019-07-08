import React, { Component } from 'react';
import router from 'umi/router';
import {
  Card,
  Button,
  List,
  Tooltip,
  Icon,
  Dropdown,
  Menu,
  Tag,
  Select,
  Row,
  Col,
  Input,
} from 'antd';
import { formatWan } from '@/utils/utils';
import styles from '../Questionnaire.less';

const SelectOption = Select.Option;

const list = [
  {
    id: 0,
    tag: '随访',
    title: '超时复诊短信回执',
    state: '运行中',
    answer: 16000,
    date: '19-03-24',
  },
  {
    id: 1,
    tag: '报名登记',
    title: '孕妇学校回执',
    state: '运行中',
    answer: 37000,
    date: '19-05-24',
  },
  {
    id: 2,
    tag: '预防',
    title: '无创基因检后随访',
    state: '草稿',
    answer: 0,
    date: '19-05-24',
  },
  {
    id: 3,
    tag: '科研项目',
    title: 'GDM孕期体重指数控...',
    state: '已暂停',
    answer: 2000,
    date: '18-06-31',
  },
  {
    id: 4,
    tag: '随访',
    title: '超时复诊短信回执',
    state: '运行中',
    answer: 16000,
    date: '19-03-24',
  },
  {
    id: 5,
    tag: '报名登记',
    title: '孕妇学校回执',
    state: '运行中',
    answer: 37000,
    date: '19-05-24',
  },
  {
    id: 6,
    tag: '预防',
    title: '无创基因检后随访',
    state: '草稿',
    answer: 0,
    date: '19-05-24',
  },
  {
    id: 7,
    tag: '科研项目',
    title: 'GDM孕期体重指数控...',
    state: '已暂停',
    answer: 2000,
    date: '18-06-31',
  },
];

class All extends Component {
  createTag = tag => {
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

  render() {
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

    return (
      <div className={styles.filterCardList}>
        <Card>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              问卷标题 ： <Input placeholder="请输入" style={{ width: '60%' }} />
            </Col>
            <Col md={8} sm={24}>
              分类选择 ：
              <Select placeholder="请选择" style={{ width: '60%' }}>
                <SelectOption value={0}>产科</SelectOption>
                <SelectOption value={1}>妇科</SelectOption>
                <SelectOption value={2}>急诊</SelectOption>
              </Select>
            </Col>
            <Col md={8} sm={24}>
              运行状态 ：
              <Select placeholder="请选择" style={{ width: '60%' }}>
                <SelectOption value={0}>运行中</SelectOption>
                <SelectOption value={1}>草稿</SelectOption>
                <SelectOption value={2}>已暂停</SelectOption>
              </Select>
            </Col>
          </Row>
        </Card>

        <List
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.id} style={{ height: '202px' }}>
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
                  extra={
                    item.state === '运行中' ? (
                      <p style={{ color: '#0096FA' }}>{item.state}</p>
                    ) : (
                      <p>{item.state}</p>
                    )
                  }
                  title={item.title}
                >
                  <CardInfo answer={formatWan(item.answer)} date={item.date} />
                  {this.createTag(item.tag)}
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button
                  type="dashed"
                  style={{
                    width: '100%',
                    height: 200,
                    fontSize: 20,
                  }}
                  onClick={() => router.push('/followup-configuration/questionnaire/create')}
                >
                  <Icon type="plus" /> 新建
                </Button>
              </List.Item>
            )
          }
        />
      </div>
    );
  }
}

export default connect()(All);
