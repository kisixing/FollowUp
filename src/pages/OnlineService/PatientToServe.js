/*
 * @Description: 表格数据展示
 * @Author: zhong jun
 * @Date: 2019-06-19 23:43:14
 */
import React, { PureComponent } from 'react';
import { Table, Button } from 'antd';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // eslint-disable-next-line no-console
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const data = [
  {
    key: '1',
    name: '李依依',
    cardID: 10032,
    address: 'New York No. 1 Lake Park',
    mobile: '13999988878',
  },
  {
    key: '2',
    name: '李珊珊',
    cardID: 10042,
    address: 'London No. 1 Lake Park',
    mobile: '13999988877',
  },
  {
    key: '3',
    name: '李思思',
    cardID: 10033,
    address: 'Sidney No. 1 Lake Park',
    mobile: '13999988867',
  },
  {
    key: '4',
    name: '赵飞燕',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '5',
    name: '大乔',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '6',
    name: '小乔',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '99',
    name: '妲己',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
];

function mapStateToProps({ onlineService_model }) {
  return { onlineService_model };
}

@connect(mapStateToProps)
class TableForm extends PureComponent {
  columns = [
    // {
    //     title: 'No.',
    //     dataIndex: 'key',
    //     width: 59,
    //     sorter: (a, b) => a.key - b.key,
    //     sortDirections: ['ascend'],
    //     defaultSortOrder: 'ascend',
    // },
    {
      title: '产妇姓名',
      dataIndex: 'name',
      width: 93,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '就诊卡号',
      dataIndex: 'cardID',
      width: 93,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.cardID - b.cardID,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      width: 101,
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '末次产检时间',
      dataIndex: 'Last_labor_inspection_time',
      width: 101,
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '复诊预约时间',
      dataIndex: 'Appointment_time_for_followup_visit',
      width: 101,
      defaultSortOrder: 'descend',
    },
    {
      title: '孕周',
      dataIndex: 'estational_weeks',
      width: 45,
      defaultSortOrder: 'descend',
    },
    {
      title: '超时天数',
      dataIndex: 'overtime ',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level ',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '短信回执',
      dataIndex: 'SMS_receipt',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 92,
      align: 'center',
      render: () => (
        <span onClick={() => this.serve()}>
          <a href="#">接入</a>
        </span>
      ),
    },
  ];

  constructor() {
    super();
    this.state = {};
  }

  showTotal = total => {
    return `共 ${total} 条`;
  };

  serve() {
    const { props } = this;
    props.dispatch({
      type: 'onlineService_model/setState',
      payload: {
        activeKey: '1',
      },
    });
  }
  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  // onChange = (page, pageSize) => {

  // };

  render() {
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          size="middle"
          scroll={{ x: '997px' }}
          columns={this.columns}
          dataSource={data}
          pagination={{
            size: 'small',
            total: 7,
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['5', '10', '20', '30', '40'],
            showTotal: this.showTotal,
            // onChange: this.onChange,
          }}
        />
        <Button type="primary" onClick={() => this.serve()}>
          接入
        </Button>
      </div>
    );
  }
}

export default TableForm;
