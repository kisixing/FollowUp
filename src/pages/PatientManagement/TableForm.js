/*
 * @Description: 表格数据展示
 * @Author: zhong jun
 * @Date: 2019-06-19 23:43:14
 */
import React, { PureComponent } from 'react';
import { Table } from 'antd';
import Link from 'umi/link';

const data = [
  {
    key: '1',
    name: '李依依',
    ID: '440104199903245678',
    phone: '15098765432',
    age: 30,
    birth: '1996-04-20',
    createCard: '2019-05-18',
    cardNum: '109992',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: '李依依',
    ID: '440104199903245678',
    phone: '15098765432',
    age: 31,
    birth: '1996-04-20',
    createCard: '2019-05-18',
    cardNum: '109992',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '3',
    name: '李依依',
    ID: '440104199903245678',
    phone: '15098765432',
    age: 32,
    birth: '1996-04-20',
    createCard: '2019-05-18',
    cardNum: '109992',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '4',
    name: '李依依',
    ID: '440104199903245678',
    phone: '15098765432',
    age: 33,
    birth: '1996-04-20',
    createCard: '2019-05-18',
    cardNum: '109992',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '5',
    name: '李依依',
    ID: '440104199903245678',
    phone: '15098765432',
    age: 34,
    birth: '1996-04-20',
    createCard: '2019-05-18',
    cardNum: '109992',
  },
];

class TableForm extends PureComponent {
  columns = [
    {
      title: 'No.',
      dataIndex: 'key',
    },
    {
      title: '患者姓名',
      dataIndex: 'name',
    },
    {
      title: '身份证号',
      dataIndex: 'ID',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '出生日期',
      dataIndex: 'birth',
    },
    {
      title: '建卡日期',
      dataIndex: 'createCard',
    },
    {
      title: '就诊卡号',
      dataIndex: 'cardNum',
    },
    {
      title: '操作',
      render: () => (
        <div>
          <Link to="#">随访记录</Link>
          <Link to="#">档案管理</Link>
        </div>
      ),
    },
  ];

  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  // onShowSizeChange = (current, pageSize) => {
  //   console.log(current, pageSize);
  // };

  render() {
    return (
      <Table
        columns={this.columns}
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
    );
  }
}

export default TableForm;
