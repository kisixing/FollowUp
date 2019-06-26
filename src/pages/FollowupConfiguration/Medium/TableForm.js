import { Table, Divider } from 'antd';

const data = [
  {
    key: '1',
    name: '健康宣教',
    cardID: ' 妊娠糖尿病饮食建议',
    address: '2019-06-22',
    mobile: '13999988878',
  },
  {
    key: '2',
    name: '活动通知',
    cardID: '无痛分娩讲座通知',
    address: '2019-06-22',
    mobile: '13999988877',
  },
  {
    key: '3',
    name: '孕妇学校',
    cardID: '胎动计数',
    address: '2019-06-22',
    mobile: '13999988867',
  },
  {
    key: '4',
    name: '孕妇学校',
    cardID: ' 妊娠期体重控制',
    address: '2019-06-22',
    mobile: '13999988887',
  },
  {
    key: '5',
    name: '孕妇学校',
    cardID: '呼吸法课程',
    address: '2019-06-22',
    mobile: '13999988887',
  },
].map(_ => ({ ..._, task: '任务' }));

class TableForm extends React.PureComponent {
  columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: 59,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: '素材类型',
      dataIndex: 'name',
      width: 93,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '素材名称',
      dataIndex: 'cardID',
      width: 93,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.cardID - b.cardID,
    },
    {
      title: '更新时间',
      dataIndex: 'address',
      width: 101,
    },
    {
      title: '绑定任务数',
      dataIndex: 'mobile',
      width: 101,
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '绑定的任务',
      dataIndex: 'task',
      width: 101,
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 92,
      align: 'center',
      render: () => (
        <span>
          <a href="#">电话</a>
          <Divider type="vertical" />
          <a href="#">短信</a>
        </span>
      ),
    },
  ];

  constructor() {
    super();
    this.state = {};
  }

  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  // onChange = (page, pageSize) => {

  // };

  render() {
    return (
      <div style={{ background: 'white', padding: '10px', marginTop: '10px' }}>
        <Table
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
      </div>
    );
  }
}

export default TableForm;
