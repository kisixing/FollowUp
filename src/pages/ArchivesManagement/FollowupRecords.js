/*
 * @Description: 随访记录
 * @Author: Zhong Jun
 * @Date: 2019-07-02 11:35:34
 */
import React from 'react';
import { Table } from 'antd';

const TABLE_DATA = [
  {
    id: '00001',
    date: '2018-12-10',
    listener: '李医生',
    title: '孕妇学校',
    type: '关怀类/活动通知',
    way: '微信',
    status: '成功',
    receipt: '问卷',
  },
  {
    id: '00002',
    date: '2018-12-12',
    listener: '李医生',
    title: '高危复诊管理',
    type: '科室随访/高危妊娠',
    way: '电话',
    status: '-',
    receipt: '回执',
  },
  {
    id: '00003',
    date: '2018-12-16',
    listener: '李医生',
    title: '高危复诊管理',
    type: '科室随访/高危妊娠',
    way: '微信',
    status: '成功',
    receipt: '问卷',
  },
];

export default function EMR() {
  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      width: 80,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.date - b.date,
    },
    {
      title: '随访类型',
      dataIndex: 'type',
      width: 120,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: '随访名称',
      dataIndex: 'title',
      width: 100,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.title - b.title,
    },
    {
      title: '随访途径',
      dataIndex: 'way',
      width: 100,
      defaultSortOrder: 'descend',
    },
    {
      title: '电话状态',
      dataIndex: 'status',
      width: 68,
      sorter: (a, b) => a.status > b.status,
    },
    {
      title: '问卷回执',
      dataIndex: 'receipt',
      width: 68,
      // eslint-disable-next-line no-script-url
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 60,
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
