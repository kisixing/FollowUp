import { Tree, InputNumber, Select } from 'antd';

const { TreeNode } = Tree;
const { Option, OptGroup } = Select;

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          path: [0],
          title: ['and'],
          children: [
            {
              path: [0, 0],
              title: ['age', 'moreEqual', 5],
            },
            {
              path: [0, 1],
              title: ['or'],
              children: [
                {
                  path: [0, 1, 0],
                  title: ['diagnosis', 'contain', 'myopia'],
                },
                {
                  path: [0, 1, 1],
                  title: ['diagnosis', 'contain', 'refractive'],
                },
                {
                  path: [0, 1, 2],
                  title: ['diagnosis', 'contain', 'strabismus'],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  // handleAdd = () => {
  //   const { data } = this.state
  // }

  makeTreeNode = (title, path) => {
    const treeNode = [
      <Select
        key={0}
        defaultValue={title[0]}
        onChange={val => this.handleChange('select', val, path)}
        style={{ minWidth: 50 }}
      >
        <OptGroup label="逻辑关系">
          <Option value="and">并且</Option>
          <Option value="or">或者</Option>
          <Option value="non">非</Option>
        </OptGroup>
        <OptGroup label="事项">
          <Option value="age">年龄</Option>
          <Option value="diagnosis">诊断</Option>
        </OptGroup>
      </Select>,
    ];
    if (title[0] === 'age') {
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
    if (title[0] === 'diagnosis') {
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
    }
    return treeNode;
  };

  makeTree = data => {
    // const { cascader } = this.props

    const treeNodeStyle = {
      margin: '10px 0',
    };

    const { path, title, children } = data;
    return (
      <TreeNode key={path} style={treeNodeStyle} title={this.makeTreeNode(title, path)}>
        {['and', 'or', 'non'].includes(title[0]) &&
          children &&
          children.map(item => this.makeTree(item))}
      </TreeNode>
    );

    // const lastPath = data[data.length - 1].path.slice()
    // lastPath.splice(lastPath.length - 1, 1, lastPath)
    // treeList.push(
    //   <TreeNode
    //     key={lastPath}
    //     title={<Icon type="plus-circle" />}
    //     onClick={this.handleAdd}
    //   />
    // );
    // return treeList;

    // return (
    //   <TreeNode
    //     title={<Icon type="plus-circle" onClick={this.handleAdd} />}
    //   />
    // );
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
    const { data } = this.state;

    return (
      <Tree defaultExpandAll showLine>
        {data.map(item => this.makeTree(item))}
      </Tree>
    );
  }
}

export default MyTree;
