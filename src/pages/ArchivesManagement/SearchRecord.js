/*
 * @Description: 咨询记录
 * @Author: Zhong Jun
 * @Date: 2019-07-02 11:17:37
 */
import React from 'react';
import { Table } from 'antd';

const TABLE_DATA = [
  {
    id: '00001',
    date: '2018-12-10',
    listener: '李医生',
    type: '医生出诊',
    way: '电话',
    notes: '',
  },
  {
    id: '00002',
    date: '2018-12-10',
    listener: '李医生',
    type: '医生出诊',
    way: '电话',
    notes: '',
  },
  {
    id: '00003',
    date: '2018-12-10',
    listener: '李医生',
    type: '预约门诊',
    way: '微信s',
    notes: '',
  },
];

export default function EMR() {
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 101,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: '咨询类型',
      dataIndex: 'type',
      width: 100,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: '咨询途径',
      dataIndex: 'way',
      width: 100,
      defaultSortOrder: 'descend',
    },
    {
      title: '接听人',
      dataIndex: 'listener',
      width: 93,
      onFilter: (value, record) => record.listener.indexOf(value) === 0,
      sorter: (a, b) => a.listener.length - b.listener.length,
    },
    {
      title: '备注',
      dataIndex: 'notes',
      width: 150,
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 92,
      align: 'center',
      // eslint-disable-next-line no-script-url
      render: () => <a href="javascript:;">详情</a>,
    },
  ];

  const onPaginationChange = (page, pageSize) => {
    // eslint-disable-next-line no-console
    console.log('onPaginationChange', page, pageSize);
  };

  return (
    <Table
      size="small"
      rowKey="id"
      columns={columns}
      dataSource={TABLE_DATA}
      pagination={{
        size: 'small',
        total: 3,
        pageSize: 5,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
        showTotal: total => `共 ${total} 条`,
        onChange: onPaginationChange,
      }}
    />
  );
}
