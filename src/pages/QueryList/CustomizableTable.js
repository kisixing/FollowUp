import Highlighter from 'react-highlight-words';
import { Table, Button, Input, Icon, Form, Alert } from 'antd';
import moment from 'moment';

// 需要映射列
const Mapping = {
  highRiskLevel: {
    0: '良好',
    1: '正常',
    2: '轻微',
    3: '高危',
  },
};

// 实现列排序功能
const sorter = (type, key) => {
  if (type === 'number') {
    return (a, b) => a[key] - b[key];
  }
  if (type === 'date') {
    return (a, b) =>
      moment(a[key], 'YYYY-MM-DD HH:mm:ss').format('x') -
      moment(b[key], 'YYYYMMDD HH:mm:ss').format('x');
  }
  return false;
};

export default Form.create()(props => {
  const {
    columns,
    dataSource: { dataSource, total },
    scroll,
    pagination,
    onSearch,
  } = props;

  const [mapData, setmapData] = useState();
  useEffect(() => {
    // 需要映射的列
    const mapping = columns.filter(ele => ele.map).map(ele => ele.key);
    // 映射后的列
    const mData =
      dataSource &&
      dataSource.map(ele =>
        mapping.reduce((result, key) => ({ ...result, [key]: Mapping[key][result[key]] }), ele)
      );
    setmapData(mData);
  }, [dataSource]);

  // 以下为实现列搜索功能
  // 列搜索输入框输入的内容
  const [searchText, setsearchText] = useState({});
  // 列搜索输入框引用，目的：点开搜索时自动获得焦点
  const searchInput = useRef(null);
  // 列的搜索
  const handleSearch = (dataIndex, selectedKeys, confirm) => {
    confirm();
    setsearchText(pre => ({ ...pre, [dataIndex]: selectedKeys }));
  };
  // 列的搜索重置
  const handleReset = (dataIndex, clearFilters) => {
    clearFilters();
    const newSearchText = { ...searchText };
    delete newSearchText[dataIndex];
    setsearchText(newSearchText);
  };
  // 使列有搜索功能
  const getColumnSearchProps = (filter, dataIndex, title) => {
    if (!filter) {
      return null;
    }
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              searchInput.current = node;
            }}
            placeholder={`查询 ${title}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(dataIndex, selectedKeys[0], confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(dataIndex, selectedKeys[0], confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            查询
          </Button>
          <Button
            onClick={() => handleReset(dataIndex, clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </div>
      ),
      filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => searchInput.current.focus());
        }
      },
      render: text => (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText[dataIndex]]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ),
    };
  };

  const makeCols = cols =>
    cols.map(col => ({
      title: col.title,
      dataIndex: col.key,
      sorter: col.sort ? sorter(col.sort, col.key) : false,
      width: col.width,
      fixed: col.fixed,
      children: col.children && makeCols(col.children),
      ...getColumnSearchProps(col.filter, col.key, col.title),
    }));

  // 多选功能
  const [selectedRowsKeys, setselectedRowsKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys: selectedRowsKeys,
    onChange: rowsKeys => setselectedRowsKeys(rowsKeys),
  };
  // 批量删除
  const handleRemove = () => {
    const a = mapData.filter(item => !selectedRowsKeys.includes(item.key));
    setmapData(a);
  };

  return (
    <>
      <Button type="primary" onClick={() => handleRemove()}>
        删除
      </Button>
      <Alert
        message={
          <>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowsKeys.length}</a> 项&nbsp;&nbsp;
            <a onClick={() => setselectedRowsKeys([])} style={{ marginLeft: 24 }}>
              清空
            </a>
          </>
        }
        type="info"
        showIcon
      />
      <Table
        rowSelection={rowSelection}
        columns={makeCols(columns)}
        dataSource={mapData}
        scroll={scroll}
        pagination={{
          size: 'small',
          total,
          pageSize: pagination,
          showSizeChanger: !pagination,
          showQuickJumper: true,
          showTotal: t => {
            return `共${t}条`;
          },
          onChange: page => pagination && onSearch(page),
        }}
      />
    </>
  );
});
