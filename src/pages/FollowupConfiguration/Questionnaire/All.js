import React, { Component } from 'react';

import { Card, Form, List, Tooltip, Icon, Dropdown, Menu, Tag } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import { formatWan } from '@/utils/utils';

import styles from '../Questionnaire.less';

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
    state: '运行中',
    answer: 0,
    date: '19-05-24',
  },
  {
    id: 3,
    tag: '科研项目',
    title: 'GDM孕期体重指数控...',
    state: '运行中',
    answer: 2000,
    date: '18-06-31',
  },
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
    state: '运行中',
    answer: 0,
    date: '19-05-24',
  },
  {
    id: 3,
    tag: '科研项目',
    title: 'GDM孕期体重指数控...',
    state: '运行中',
    answer: 2000,
    date: '18-06-31',
  },
];

const FormItem = Form.Item;

@Form.create()
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
    const {
      form: { getFieldDecorator },
    } = this.props;

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
    };

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

    const category = [
      {
        id: 1,
        title: '全部',
      },
      {
        id: 2,
        title: '随访问卷',
      },
      {
        id: 3,
        title: '满意度调查',
      },
      {
        id: 4,
        title: '报名登记',
      },
      {
        id: 5,
        title: '分数测评',
      },
      {
        id: 6,
        title: '科研项目',
      },
    ];
    const patient = [
      {
        id: 1,
        title: '不限',
      },
      {
        id: 2,
        title: '高危孕产妇',
      },
      {
        id: 3,
        title: 'GDM孕产妇',
      },
      {
        id: 4,
        title: '妊娠高血压孕产妇',
      },
      {
        id: 5,
        title: '双/多胎孕产妇',
      },
    ];

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {category.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="患者分类" block last>
              <FormItem>
                {getFieldDecorator('patient')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {patient.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <List
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
          dataSource={list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Card
                hoverable
                bodyStyle={{ padding: 0 }}
                actions={[
                  <Tooltip title="随访人员统计">
                    <Icon type="ordered-list" />
                  </Tooltip>,
                  <Tooltip title="图表分析">
                    <Icon type="line-chart" />
                  </Tooltip>,
                  <Tooltip title="分享">
                    <Icon type="share-alt" />
                  </Tooltip>,
                  <Dropdown overlay={itemMenu}>
                    <Icon type="ellipsis" />
                  </Dropdown>,
                ]}
                extra={<p style={{ color: '#0096FA' }}>{item.state}</p>}
                title={item.title}
              >
                <CardInfo answer={formatWan(item.answer)} date={item.date} />
                {this.createTag(item.tag)}
              </Card>
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default All;
