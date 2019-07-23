import { Tree, InputNumber, Select, Icon } from 'antd';

const { TreeNode } = Tree;
const { Option, OptGroup } = Select;

class MyTree extends React.Component {
  constructor(props) {
    super(props);

    const { data } = props;
    const nums = data.length;

    this.state = {
      options: {
        逻辑关系: ['并且', '或者', '非'],
      },
      expandedList: [],
      data,
      nums,
    };
  }

  makeTree = data => {
    const treeNodeStyle = {
      margin: '10px 0',
    };

    const { key, value, children, parent, autoFocus } = data;
    return (
      <TreeNode
        key={key}
        style={treeNodeStyle}
        title={this.makeTreeNode(value, key, parent, autoFocus)}
      >
        {children && children.map(v => this.keyToNode(v)).map(item => this.makeTree(item))}
      </TreeNode>
    );
  };

  makeTreeNode = (value, key, parent, autoFocus) => {
    const zeroStyle = {
      width: 200,
    };
    const firstStyle = {
      width: 100,
      marginLeft: 10,
    };
    const thirdStyle = {
      marginLeft: 10,
    };

    const { options } = this.state;
    const { results } = this.props;
    options['事项'] = results;

    const treeNode = [
      <Select
        key={0}
        value={value[0]}
        onChange={val => this.handleChange(val, key, 0)}
        style={zeroStyle}
        autoFocus={autoFocus}
      >
        {Object.entries(options).map(item => (
          <OptGroup label={item[0]} key={item[0]}>
            {item[1] &&
              item[1].map(item2 => (
                <Option key={item2} value={item2}>
                  {item2}
                </Option>
              ))}
          </OptGroup>
        ))}
      </Select>,
    ];

    if (value[0] && !options['逻辑关系'].includes(value[0])) {
      if (value[0].includes('诊断')) {
        treeNode.push(
          <Select
            key={1}
            value={value[1]}
            style={firstStyle}
            onChange={val => this.handleChange(val, key, 1)}
          >
            <Option value="包含">包含</Option>
            <Option value="不包含">不包含</Option>
          </Select>,
          <Select
            key={2}
            value={value[2]}
            style={firstStyle}
            onChange={val => this.handleChange(val, key, 2)}
          >
            <Option value="近视">近视</Option>
            <Option value="屈光不正">屈光不正</Option>
            <Option value="斜视">斜视</Option>
          </Select>
        );
      } else {
        treeNode.push(
          <Select
            key={1}
            value={value[1]}
            style={firstStyle}
            onChange={val => this.handleChange(val, key, 1)}
          >
            <Option value="小于">&lt;</Option>
            <Option value="小于等于">&le;</Option>
            <Option value="大于">&gt;</Option>
            <Option value="大于等于">&ge;</Option>
            <Option value="等于">=</Option>
            <Option value="不等于">≠</Option>
          </Select>,
          <InputNumber
            key={2}
            style={firstStyle}
            value={value[2]}
            onChange={val => this.handleChange(val, key, 2)}
          />
        );
      }
    }
    const parentNode = parent !== undefined && this.keyToNode(parent);
    // 添加增加按钮
    if (parent !== undefined && parentNode.value[0] !== '非') {
      treeNode.push(
        <Icon
          key={3}
          style={thirdStyle}
          type="plus-circle"
          onClick={() => this.handleAdd(key, parent)}
        />
      );
    }
    // 添加删除按钮
    if (
      parent !== undefined &&
      !(['并且', '或者'].includes(parentNode.value[0]) && parentNode.children.length === 2) &&
      parentNode.children.length !== 1
    ) {
      treeNode.push(
        <Icon
          key={4}
          style={thirdStyle}
          type="close-circle"
          onClick={() => this.handleDelete(key, parent)}
        />
      );
    }
    return treeNode;
  };

  handleChange = (val, key, pos) => {
    const { data, nums, expandedList } = this.state;
    const treeNode = this.keyToNode(key);

    if (pos === 0) {
      if (['并且', '或者'].includes(val)) {
        if (['并且', '或者'].includes(treeNode.value[pos])) {
          treeNode.value[pos] = val;
        } else {
          treeNode.value[pos] = val;
          treeNode.children &&
            treeNode.children.forEach(v => {
              const index = this.keyToIndex(v);
              if (index) {
                data.splice(index, 1);
              }
            });
          treeNode.children = [nums, nums + 1];
          data.push(
            {
              key: nums,
              parent: key,
              value: [''],
            },
            {
              key: nums + 1,
              parent: key,
              value: [''],
            }
          );
          this.setState({
            data,
            expandedList: [...expandedList, key.toString()],
            nums: nums + 2,
          });
        }
      } else if (val === '非') {
        treeNode.value[pos] = val;
        treeNode.children &&
          treeNode.children.forEach(v => {
            const index = this.keyToIndex(v);
            if (index) {
              data.splice(index, 1);
            }
          });
        treeNode.children = [nums];
        data.push({
          key: nums,
          parent: key,
          value: [''],
        });
        this.setState({
          expandedList: [...expandedList, key.toString()],
          data,
          nums: nums + 1,
        });
      } else {
        treeNode.value[pos] = val;
        treeNode.children &&
          treeNode.children.forEach(v => {
            const index = this.keyToIndex(v);
            if (index) {
              data.splice(index, 1);
            }
          });
        delete treeNode.children;
      }
    } else {
      treeNode.value[pos] = val;
    }

    this.setState({ data });
  };

  keyToNode = key => {
    const { data } = this.state;
    return data.filter(value => value.key === key).pop();
  };

  keyToIndex = key => {
    const { data } = this.state;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].key === key) return i;
    }
    return null;
  };

  handleDelete(key, parent) {
    const { data } = this.state;
    // 抹掉父节点中自己的标记
    const parentNode = this.keyToNode(parent);
    const { children } = parentNode;
    children.splice(children.indexOf(key), 1);
    // 递归删掉子节点
    const { chl } = this.keyToNode(key);
    chl && chl.map(k => this.handleDelete(k, key));
    // 删掉自己
    data.splice(this.keyToIndex(key), 1);

    this.setState({ data });
  }

  handleAdd(key, parent) {
    const { data, nums } = this.state;
    data.push({
      key: nums,
      parent,
      value: [''],
      autoFocus: true,
    });
    const parentNode = this.keyToNode(parent);
    const { children } = parentNode;
    children.splice(children.indexOf(key) + 1, 0, nums);

    this.setState({
      nums: nums + 1,
      data,
    });
  }

  render() {
    const { data, expandedList } = this.state;

    return (
      <Tree
        expandedKeys={expandedList}
        showLine
        onExpand={expandedKey => this.setState({ expandedList: expandedKey })}
      >
        {this.makeTree(data[0])}
      </Tree>
    );
  }
}

export default MyTree;
