import { Button, Table } from 'antd';

const columns = [
  { title: '患者姓名', dataIndex: 'name' },
  { title: '就诊卡号', dataIndex: 'card' },
  { title: '手机号码', dataIndex: 'phone' },
  { title: '发送日期', dataIndex: 'date' },
  { title: '发送状态', dataIndex: 'status' },
  { title: '操作', dataIndex: '', render: () => <Button type="link">短信</Button> },
];

const dataSource = [
  {
    name: '李依伊',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
  {
    name: '李思思',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
  {
    name: '张丹丹',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
  {
    name: '陈甜甜',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
  {
    name: '黄海峰',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
  {
    name: '郭子仪',
    card: Math.random()
      .toString()
      .slice(10),
    phone: `130${Math.random()
      .toString()
      .slice(10)}`,
    date: new Date().toLocaleDateString(),
    status: '成功',
  },
];
export default () => {
  const [state, setState] = useState({
    selectedRowKeys: [],
  });
  const onChange = _selectedRowKeys => setState({ ...state, selectedRowKeys: _selectedRowKeys });
  const rowSelection = {
    selectedRowKeys: state.selectedRowKeys,
    onChange,
  };
  const propsData = {
    columns,
    dataSource,
    rowSelection,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      total: 50,
    },
  };
  return (
    <div style={{ background: '#fff' }}>
      <Button type="primary" style={{ marginBottom: 16 }}>
        发送短信
      </Button>
      <Table {...propsData} />
    </div>
  );
};
