
import { connect } from 'dva';
import { Row, Col, Button, Table, Divider, Form, Dropdown, Menu, DatePicker, Icon } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Pie } from '@/components/Charts';
import { getValueOfFirstItem } from "@/utils/utils";
import styles from './detail.less';

const mapStateToProps = ({ global, chart }) => ({
  global,
  chart,
})




function SearchForm(props) {
  const [state, setState] = useState({})

  function getDropDown(type, typeList) {
    function getMenu(arr, handleMenuClick) {
      return (
        <Menu onClick={handleMenuClick}>
          {arr.map(({ value, label }) => (
            <Menu.Item key={value}>{label}</Menu.Item>
          ))}
        </Menu>
      );
    }
    return (
      <Dropdown
        overlay={getMenu(typeList, ({ key }) => {
          _setFormData({ [type]: key });
        })}
      >
        <Button>
          {getValueOfFirstItem(a, F_LABEL, '请选择')} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }

  return (
    <Form layout="inline" style={{ margin: '10px 0' }}>
      <Form.Item label="复诊预约开始时间">
        <DatePicker />
      </Form.Item>
      <Form.Item label="复诊预约结束时间">
        <DatePicker />
      </Form.Item>

      <div style={{ lineHeight: '40px',paddingTop:'10px' }}>
        <Form.Item label="准时复诊">
          <Dropdown overlay={(
            <Menu>
              <Menu.Item>是</Menu.Item>
              <Menu.Item>否</Menu.Item>
            </Menu>
          )}
          >
            <Button>
              请选择 <Icon type="down" />
            </Button>
          </Dropdown>
        </Form.Item>
        <div style={{float:'right'}}>
          <Button style={{marginRight:'10px'}}>重置</Button>
          <Button type="primary">开始搜索</Button>
        </div>
      </div>
    </Form>
  )
}


const FollowupPatientChart = connect(mapStateToProps)(props => {


  const { chart } = props;
  const formatLayout = { xs: 24, sm: 24, md: 24, lg: 12, xl: 12 };
  return (
    <PageHeaderWrapper
      title="列表搜索"
      content={(
        <SearchForm />
      )}
    >
      <Row gutter={24} type="flex" style={{ marginBottom: '24px' }}>
        <Col {...formatLayout}>
          <div style={{ background: '#fff' }}>
            <h4 className={styles.pieTitle}>超时复诊跟踪结果</h4>
            <Pie
              hasLegend
              data={chart.PieData1}
              valueFormat={value => `${value} 人`}
              height={200}
              lineWidth={2}
              style={{ padding: '8px 0' }}
            />
          </div>
        </Col>
        <Col {...formatLayout}>
          <div style={{ background: '#fff' }}>
            <h4 className={styles.pieTitle}>准时 / 超时分布</h4>
            <Pie
              hasLegend
              data={chart.PieData2}
              valueFormat={value => `${value} 人`}
              height={200}
              lineWidth={2}
              style={{ padding: '8px 0' }}
            />
          </div>
        </Col>
        {/* <Col>
          <div>
            123
        </div>
        </Col> */}
      </Row>
      <div className={styles.table}>
        <div className={styles.header}>
          <h4>高位复诊随访</h4>
          <Button type="link">下载excel</Button>
        </div>
        <TableForm />
      </div>
    </PageHeaderWrapper>
  );
})



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

function TableForm() {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: 59,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
    },
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
        <span>
          <a href="#">电话</a>
          <Divider type="vertical" />
          <a href="#">短信</a>
        </span>
      ),
    },
  ];



  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  const showTotal = total => {
    return `共 ${total} 条`;
  };

  // onChange = (page, pageSize) => {

  // };

  return (
    <Table
      size="middle"
      scroll={{ x: '997px' }}
      columns={columns}
      dataSource={data}
      pagination={{
        size: 'small',
        total: 7,
        pageSize: 5,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '20', '30', '40'],
        showTotal,
        // onChange: this.onChange,
      }}
    />
  );
}


export default FollowupPatientChart;
