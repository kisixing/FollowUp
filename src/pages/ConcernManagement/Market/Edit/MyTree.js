import { Tree, InputNumber, Select, Icon } from 'antd';

const { TreeNode } = Tree;
const { Option, OptGroup } = Select;

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        逻辑关系: [['并且'], ['或者'], ['非']],
      },
      data: {
        path: [-1],
        title: [''],
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { options } = this.state;
    options['事项'] = nextProps.results;
    this.setState({ options });
  }

  // 判断数组包含关系
  isIncludes = (arr, val) => {
    return arr.reduce((total, item) => {
      if (total) {
        return total;
      }
      return item === val;
    }, false);
  };

  makeTreeNode = (title, path) => {
    const itemStyle = {
      width: 200,
    };

    const { options } = this.state;

    const treeNode = [
      <Select
        key={0}
        value={title[0]}
        onChange={val => this.handleChange('select', val, path)}
        style={itemStyle}
      >
        {Object.entries(options).map(item => (
          <OptGroup label={item[0]} key={item[0]}>
            {item[1] &&
              item[1].map(item2 => (
                <Option key={item2.join('/')} value={item2.join('/')}>
                  {item2.join('/')}
                </Option>
              ))}
          </OptGroup>
        ))}
      </Select>,
    ];

    if (title[0] && this.isIncludes(options['逻辑关系'], title[0])) {
      if (title[0].includes('诊断')) {
        treeNode.push(
          <Select
            key={1}
            // value={title[1]}
            style={{ minWidth: 50, marginLeft: 10 }}
            // onChange={(val) => this.handleChange('input', val, path, 1)}
          >
            <Option value="包含">包含</Option>
            <Option value="不包含">不包含</Option>
          </Select>,
          <Select
            key={2}
            // value={title[2]}
            style={{ minWidth: 50, marginLeft: 10 }}
            // onChange={(val) => this.handleChange('input', val, path, 2)}
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
            // value={title[1]}
            style={{ minWidth: 50, marginLeft: 10 }}
            // onChange={(val) => this.handleChange('input', val, path, 1)}
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
            // value={title[2]}
            style={{ marginLeft: 10 }}
            // onChange={(val) => this.handleChange('input', val, path, 2)}
          />
        );
      }
    }
    path[0] !== -1 &&
      treeNode.push(<Icon key={3} type="plus-circle" onClick={() => this.handleAdd(path)} />);
    return treeNode;
  };

  makeTree = data => {
    const treeNodeStyle = {
      margin: '10px 0',
    };

    const { path, title, children } = data;
    return (
      <TreeNode key={path} style={treeNodeStyle} title={this.makeTreeNode(title, path)}>
        {children && children.map(item => this.makeTree(item))}
      </TreeNode>
    );
  };

  handleChange = (type, val, path) => {
    const { data } = this.state;
    const treeNode = this.pathToTreeNode(path);

    if (type === 'select') {
      treeNode.title = [val];
      if (['并且', '或者'].includes(val)) {
        treeNode.children = [
          {
            path: path[0] !== -1 ? [...path, 0] : [0],
            title: [''],
          },
          {
            path: path[0] !== -1 ? [...path, 1] : [1],
            title: [''],
          },
        ];
      } else if (val === '非') {
        treeNode.children = [
          {
            path: [-1],
            title: [''],
          },
        ];
      } else {
        delete treeNode.children;
      }

      this.setState({ data });
    }

    // if (type === 'input') {
    //   console.log(val)

    // }
  };

  pathToTreeNode = path => {
    const { data } = this.state;
    return path.reduce((total, index) => (index === -1 ? data : total.children[index]), data);
  };

  handleAdd(path) {
    const { data } = this.state;
    if (path) {
      const pos = path[path.length - 1];
      const treeNode = path
        .slice(0, -1)
        .reduce(
          (total, index) => (Array.isArray(total) ? total[index] : total.children[index]),
          data
        );
      const newNode = { title: [''] };
      treeNode.children.splice(pos + 1, 0, newNode);
      this.setState({ data });
    }
  }

  render() {
    const { data } = this.state;

    return (
      <Tree defaultExpandAll showLine>
        {this.makeTree(data)}
      </Tree>
    );
  }
}

export default MyTree;
