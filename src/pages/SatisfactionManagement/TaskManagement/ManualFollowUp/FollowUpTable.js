import React, { Component } from 'react';
import { Card, Table } from 'antd';
import Call from '@/components/Phone/Call';

import styles from './ManualFollowUp.less';

const data = [
  {
    key: 1,
    name: '李依',
    card: 109992,
    phone: 15098765432,
    date: '2019-04-20',
    department: '产科',
    score: 40,
  },
  {
    key: 2,
    name: '李珊珊',
    card: 347812,
    phone: 15098765432,
    date: '2019-05-12',
    department: '妇科',
    score: 30,
  },
  {
    key: 3,
    name: '李思思',
    card: 308761,
    phone: 15098765432,
    date: '2019-04-22',
    department: '产科',
    score: 30,
  },
  {
    key: 4,
    name: '李海红',
    card: 239871,
    phone: 15098765432,
    date: '2019-05-10',
    department: '产科',
    score: 40,
  },
  {
    key: 5,
    name: '张凤娥',
    card: 224561,
    phone: 15098765432,
    date: '2019-05-13',
    department: '胎儿医学科',
    score: 40,
  },
];

class FollowUpTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleOk = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
      },
      {
        title: '患者姓名',
        dataIndex: 'name',
      },
      {
        title: '就诊卡',
        dataIndex: 'card',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '问卷提交时间',
        dataIndex: 'date',
      },
      {
        title: '科室',
        dataIndex: 'department',
      },
      {
        title: '总评分',
        dataIndex: 'score',
      },
      {
        title: '操作',
        render: () => (
          <div className={styles.actions}>
            <span>问卷详情</span>
            <span onClick={() => this.setState({ visible: true })}>电话</span>
          </div>
        ),
      },
    ];

    return (
      <Card style={{ marginTop: 20 }}>
        <Table
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
        <Call
          visible={visible}
          onOk={this.handlOk}
          onCancel={() => this.setState({ visible: false })}
          detail="manual"
        />
      </Card>
    );
  }
}

export default FollowUpTable;
