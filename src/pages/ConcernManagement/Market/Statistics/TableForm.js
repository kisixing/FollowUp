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
    cardNum: '109992',
    phone: '15098765432',
    date: '2019-02-05',
    state: '成功',
  },
  {
    key: '2',
    name: '李依依',
    cardNum: '109992',
    phone: '15098765432',
    date: '2019-02-05',
    state: '成功',
  },
  {
    key: '3',
    name: '李依依',
    cardNum: '109992',
    phone: '15098765432',
    date: '2019-02-05',
    state: '失败',
  },
  {
    key: '4',
    name: '李依依',
    cardNum: '109992',
    phone: '15098765432',
    date: '2019-02-05',
    state: '成功',
  },
  {
    key: '5',
    name: '李依依',
    cardNum: '109992',
    phone: '15098765432',
    date: '2019-02-05',
    state: '成功',
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
      title: '就诊卡号',
      dataIndex: 'cardNum',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '发送日期',
      dataIndex: 'date',
    },
    {
      title: '发送状态',
      dataIndex: 'state',
    },
    {
      title: '报名登记',
      dataIndex: 'register',
    },
    {
      title: '操作',
      render: () => (
        <div>
          <Link to="/archives-management?who=1">短信</Link>
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

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={data}
        rowSelection={this.rowSelection}
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
