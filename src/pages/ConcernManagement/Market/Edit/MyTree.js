import { Tree, InputNumber, Select, Icon } from 'antd';

const { TreeNode } = Tree;
const { Option, OptGroup } = Select;

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        逻辑关系: ['并且', '或者', '非'],
      },

      data: { title: [''] },
      // {
      //   title: ['并且'],
      //   children: [
      //     {
      //       path: [0],
      //       title: [['年龄'], '大于等于', 5],
      //     },
      //     {
      //       path: [1],
      //       title: ['或者'],
      //       children: [
      //         {
      //           path: [1, 0],
      //           title: [['诊断'], '包含', '近视'],
      //         },
      //         {
      //           path: [1, 1],
      //           title: [['诊断'], '包含', '屈光不正'],
      //         },
      //         {
      //           path: [1, 2],
      //           title: [['诊断'], '包含', '斜视'],
      //         },
      //       ],
      //     },
      //   ],
      // },
    };
  }

  componentWillReceiveProps(nextProps) {
    const { options } = this.state;
    options['事项'] = nextProps.results;
    this.setState({ options });
  }

  makeTreeNode = (title, path) => {
    const itemStyle = {
      width: 200,
    };
    const { options } = this.state;
    // console.log(options)

    const treeNode = [
      <Select
        key={path || -1}
        value={title[0]}
        onChange={val => this.handleChange('select', val, path)}
        style={itemStyle}
      >
        <OptGroup label="逻辑关系">
          <Option value="并且">并且</Option>
          <Option value="或者">或者</Option>
          <Option value="非">非</Option>
        </OptGroup>
        <OptGroup label="事项">
          {options['事项'] &&
            options['事项'].map(item => <Option value={item.join('/')}>{item.join('/')}</Option>)}
        </OptGroup>
      </Select>,
    ];
    if (title[0] !== '并且' && title[0] !== '或者' && title[0] !== '非' && title[0]) {
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
    treeNode.push(<Icon type="plus-circle" onClick={() => this.handleAdd(path)} />);
    return treeNode;
  };

  makeTree = data => {
    const treeNodeStyle = {
      margin: '10px 0',
    };

    if (data) {
      const { path, title, children } = data;
      return (
        <TreeNode key={path || -1} style={treeNodeStyle} title={this.makeTreeNode(title, path)}>
          {children && children.map(item => this.makeTree(item))}
        </TreeNode>
      );
    }

    return <TreeNode title={<Icon type="plus-circle" onClick={this.handleAdd} />} />;
  };

  handleChange = (type, val, path) => {
    const { data } = this.state;
    const treeNode = path
      ? path.reduce(
          (total, index) => (Array.isArray(total) ? total[index] : total.children[index]),
          data
        )
      : data;

    if (type === 'select') {
      treeNode.title = [val];
      if (['并且', '或者'].includes(val)) {
        treeNode.children = [
          {
            path: path ? [...path, 0] : [0],
            title: [''],
          },
          {
            path: path ? [...path, 1] : [1],
            title: [''],
          },
        ];
      } else if (val === '非') {
        treeNode.children = [
          {
            path: path ? [...path, 0] : [0],
            title: [''],
          },
        ];
      } else {
        delete treeNode.children;
      }
      this.setState(
        { data }
        // () => console.log(this.state)
      );
    }

    // if (type === 'input') {
    //   console.log(val)

    // }
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
