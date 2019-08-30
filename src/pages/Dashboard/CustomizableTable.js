import Highlighter from 'react-highlight-words';
import {
  Table,
  Button,
  Input,
  Icon,
  InputNumber,
  DatePicker,
  Select,
  Form,
  Popconfirm,
} from 'antd';
import moment from 'moment';
import { useContext } from 'react';

// 需要映射列，结构一样后端传入即可
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

const EditableContext = React.createContext();
const EditableCell = props => {
  const { editing, dataIndex, title, inputType, record, index, children, ...restProps } = props;

  const getInput = () => {
    if (inputType === 'input') {
      return <InputNumber />;
    }
    if (inputType === 'select') {
      return <Select />;
    }
    if (inputType === 'date') {
      return <DatePicker />;
    }
    return <Input />;
  };
  const { getFieldDecorator } = useContext(EditableContext);
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: 0 }}>
          {getFieldDecorator(dataIndex, {
            // rules: [
            //   {
            //     required: true,
            //     message: `Please Input ${title}!`,
            //   },
            // ],
            initialValue: record[dataIndex],
          })(getInput())}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default Form.create()(({ columns, dataSource, scroll, form }) => {
  const [mapData, setmapData] = useState(() => {
    // 需要映射的列
    const mapping = columns.filter(ele => ele.map).map(ele => ele.key);
    // 映射后的列
    return dataSource.map(ele =>
      mapping.reduce((result, key) => ({ ...result, [key]: Mapping[key][result[key]] }), ele)
    );
  });

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
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`查询 ${dataIndex}`}
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
  });

  const [editingKey, seteditingKey] = useState('');
  const isEditing = record => record.key === editingKey;
  const cancel = () => {
    seteditingKey('');
  };
  const save = key => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...mapData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setmapData(newData);
        seteditingKey('');
      } else {
        newData.push(row);
        setmapData(newData);
        seteditingKey('');
      }
    });
  };
  const edit = key => {
    seteditingKey(key);
  };
  const makeActions = actionType => {
    if (actionType === 'edit') {
      return (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.key)}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record.key)}>
            Edit
          </a>
        );
      };
    }
    return null;
  };
  const components = {
    body: {
      cell: EditableCell,
    },
  };

  const makeCols = cols =>
    cols.map(col => {
      const result = {
        title: col.title,
        dataIndex: col.key,
        sorter: col.sort ? sorter(col.sort, col.key) : false,
        width: col.width,
        fixed: col.fixed,
        children: makeCols(col.children),
        render: col.key === 'action' ? makeActions(col.actionType) : null,
        ...getColumnSearchProps(col.key),
      };
      if (!col.editable) {
        return result;
      }
      return {
        ...result,
        onCell: record => ({
          record,
          inputType: col.editable.inputType,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

  return (
    <EditableContext.Provider value={form}>
      <Table
        components={components}
        columns={makeCols(columns)}
        dataSource={mapData}
        scroll={scroll}
        pagination={{
          size: 'small',
          total: dataSource.length,
          // pageSize: 4,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => {
            return `共${total}条`;
          },
        }}
      />
    </EditableContext.Provider>
  );
});
