/* eslint-disable no-console */
/*
 * @Description: 电子病历
 * @Author: Zhong Jun
 * @Date: 2019-07-02 10:36:17
 */
import React from 'react';
import { Table } from 'antd';

const TABLE_DATA = [
  {
    id: '00001',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
  },
  {
    id: '00002',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
  },
  {
    id: '00003',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
  },
  {
    id: '00004',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
  },
  {
    id: '00005',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
  },
  {
    id: '00006',
    date: '2018-12-10',
    doctor: '李医生',
    department: '产科',
    diagnose: '',
    advice: '',
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
      title: '医生',
      dataIndex: 'doctor',
      width: 93,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.doctor.indexOf(value) === 0,
      sorter: (a, b) => a.doctor.length - b.doctor.length,
      // sortDirections: ['descend'],
    },
    {
      title: '科室',
      dataIndex: 'department',
      width: 93,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.department - b.department,
    },
    {
      title: '诊断',
      dataIndex: 'diagnose',
      width: 150,
      defaultSortOrder: 'descend',
    },
    {
      title: '医嘱',
      dataIndex: 'advice',
      width: 150,
      defaultSortOrder: 'descend',
    },
  ];

  const onPaginationChange = (page, pageSize) => {
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
        total: 6,
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
        showTotal: total => `共 ${total} 条`,
        onChange: onPaginationChange,
      }}
    />
  );
}
