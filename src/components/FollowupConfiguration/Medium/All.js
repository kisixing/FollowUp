import React from 'react';
import Link from 'umi/link';

import { Table, Switch, Card, Row, Col } from 'antd';

import styles from '../Questionnaire.less';

const data = [
  {
    key: 0,
    task: '高危妊娠复诊随访',
  },
  {
    key: 1,
    task: '妊娠糖尿孕妇随访管理',
  },
  {
    key: 2,
    task: '无创基因检测检后随访',
  },
  {
    key: 3,
    task: 'PAC随访',
  },
  {
    key: 4,
    task: '科室满意度',
  },
];

function All() {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: '随访任务',
      dataIndex: 'task',
    },
    {
      title: '微信渠道',
      render: () => <Switch checkedChildren="开" unCheckedChildren="关" />,
    },
    {
      title: '短信渠道',
      render: () => <Switch checkedChildren="开" unCheckedChildren="关" />,
    },
    {
      title: '邮件渠道',
      render: () => <Switch checkedChildren="开" unCheckedChildren="关" />,
    },
    {
      title: '电话渠道',
      render: () => <Switch checkedChildren="开" unCheckedChildren="关" />,
    },
    {
      title: '人工管理设置',
      render: () => <Link to="">设置 </Link>,
    },
  ];

  return (
    <div className={styles.filterCardList}>
      <Card title="总配置:">
        <Row type="flex" justify="space-around">
          <Col>
            微信渠道:&nbsp;&nbsp;&nbsp;
            <Switch checkedChildren="开" unCheckedChildren="关" />
          </Col>
          <Col>
            短信渠道:&nbsp;&nbsp;&nbsp;
            <Switch checkedChildren="开" unCheckedChildren="关" />
          </Col>
          <Col>
            邮件渠道:&nbsp;&nbsp;&nbsp;
            <Switch checkedChildren="开" unCheckedChildren="关" />
          </Col>
          <Col>
            电话渠道:&nbsp;&nbsp;&nbsp;
            <Switch checkedChildren="开" unCheckedChildren="关" />
          </Col>
        </Row>
      </Card>
      <Table
        className={styles.table}
        style={{ marginTop: 24 }}
        columns={columns}
        dataSource={data}
        pagination={{
          size: 'small',
          total: 54,
          pageSize: 10,
          showSizeChanger: true,
          // onShowSizeChange={ this.onShowSizeChange }
          showQuickJumper: true,
          // onChange: this.onChange,
          showTotal: total => `总记录数${total}/总页数:${Math.ceil(total / 10)}`,
        }}
      />
    </div>
  );
}

export default All;
