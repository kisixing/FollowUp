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

      data: [
        // {
        //   path: [0],
        //   title: ['and'],
        //   children: [
        //     {
        //       path: [0, 0],
        //       title: ['age', 'moreEqual', 5],
        //     },
        //     {
        //       path: [0, 1],
        //       title: ['or'],
        //       children: [
        //         {
        //           path: [0, 1, 0],
        //           title: ['diagnosis', 'contain', 'myopia'],
        //         },
        //         {
        //           path: [0, 1, 1],
        //           title: ['diagnosis', 'contain', 'refractive'],
        //         },
        //         {
        //           path: [0, 1, 2],
        //           title: ['diagnosis', 'contain', 'strabismus'],
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { options } = this.state;
    options['事项'] = nextProps.results;
    this.setState({ options });
  }

  // handleAdd = () => {
  //   const { data } = this.state
  // }

  makeTreeNode = (title, path) => {
    const { options } = this.state;

    const treeNode = [
      <Select
        key={path}
        value={title && title[0]}
        onChange={val => this.handleChange('select', val, path)}
        style={{ minWidth: 50 }}
      >
        <OptGroup label="逻辑关系">
          <Option value="and">并且</Option>
          <Option value="or">或者</Option>
          <Option value="non">非</Option>
        </OptGroup>
        <OptGroup label="事项">
          {options.map(item => (
            <Option value={item}>{item.join('/')}</Option>
          ))}
        </OptGroup>
      </Select>,
    ];
    if (title[0].includes('诊断')) {
      treeNode.push(
        <Select key={1} value={title[1]} style={{ minWidth: 50, marginLeft: 10 }}>
          <Option value="contain">包含</Option>
          <Option value="notContain">不包含</Option>
        </Select>,
        <Select key={2} value={title[2]} style={{ minWidth: 50, marginLeft: 10 }}>
          <Option value="myopia">近视</Option>
          <Option value="refractive">屈光不正</Option>
          <Option value="strabismus">斜视</Option>
        </Select>
      );
    } else {
      treeNode.push(
        <Select key={1} value={title[1]} style={{ minWidth: 50, marginLeft: 10 }}>
          <Option value="less">&lt;</Option>
          <Option value="lessEqual">&le;</Option>
          <Option value="more">&gt;</Option>
          <Option value="moreEqual">&ge;</Option>
          <Option value="equal">=</Option>
          <Option value="notEqual">≠</Option>
        </Select>,
        <InputNumber key={2} value={title[2]} style={{ marginLeft: 10 }} />
      );
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
        <TreeNode key={path} style={treeNodeStyle} title={this.makeTreeNode(title, path)}>
          {['and', 'or', 'non'].includes(title[0]) &&
            children &&
            children.map(item => this.makeTree(item))}
        </TreeNode>
      );
    }

    return <TreeNode title={<Icon type="plus-circle" onClick={this.handleAdd} />} />;
  };

  handleChange = (type, val, path) => {
    if (type === 'select') {
      const { data } = this.state;
      const treeNode = path.reduce(
        (total, index) => (Array.isArray(total) ? total[index] : total.children[index]),
        data
      );
      treeNode.title = [val, undefined, undefined];
      if (!['and', 'or', 'non'].includes(val)) {
        treeNode.children = [];
      }
      this.setState({ data });
    }
  };

  render() {
    // const { data } = this.state;

    return (
      <Tree defaultExpandAll showLine>
        {/* {this.makeTree(data)} */}
      </Tree>
    );
  }
}

export default MyTree;
