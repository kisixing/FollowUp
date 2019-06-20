/*
 * @Description: 表格数据展示
 * @Author: zhong jun
 * @Date: 2019-06-19 23:43:14
 */
import React, { PureComponent } from 'react';
import { Table, Divider } from 'antd';

const data = [
  {
    key: '1',
    name: '李依依',
    cardID: 10032,
    address: 'New York No. 1 Lake Park',
    mobile: '13999988878'
  },
  {
    key: '2',
    name: '李珊珊',
    cardID: 10042,
    address: 'London No. 1 Lake Park',
    mobile: '13999988877'
  },
  {
    key: '3',
    name: '李思思',
    cardID: 10033,
    address: 'Sidney No. 1 Lake Park',
    mobile: '13999988867'
  },
  {
    key: '4',
    name: '赵飞燕',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887'
  },
];

class TableForm extends PureComponent {
  columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: '产妇姓名',
      dataIndex: 'name',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '就诊卡号',
      dataIndex: 'cardID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.cardID - b.cardID,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '末次产检时间',
      dataIndex: 'Last_labor_inspection_time',
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '复诊预约时间',
      dataIndex: 'Appointment_time_for_followup_visit',
      defaultSortOrder: 'descend',
    },
    {
      title: '孕周',
      dataIndex: 'estational_weeks',
      defaultSortOrder: 'descend',
    },
    {
      title: '超时天数',
      dataIndex: 'overtime ',
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level ',
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level',
      defaultSortOrder: 'descend',
    },
    {
      title: '短信回执',
      dataIndex: 'SMS_receipt',
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
          <a href="javascript:;">电话</a>
          <Divider type="vertical" />
          <a href="javascript:;">短信</a>
        </span>
      ),
    },
  ];

  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  showTotal = total => {
    return `共${total}条`;
  };

  render() {
    return (
      <Table
        size="small"
        columns={this.columns}
        dataSource={data}
        pagination={{
          size: 'small',
          total: 50,
          pageSize: 10,
          showTotal: this.showTotal,
          // onChange: this.onChange,
        }}
      />
    );
  }
}

export default TableForm;
