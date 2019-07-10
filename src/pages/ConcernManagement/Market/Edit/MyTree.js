import { Tree, InputNumber, Icon, Select } from 'antd';
import styles from './steps.less';

const { TreeNode } = Tree;
const { Option, OptGroup } = Select;

class MyTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: 0,
          title: ['and'],
          children: [
            {
              key: 0,
              title: ['age', 'moreEqual', 5],
            },
            {
              key: 1,
              title: ['or'],
              children: [
                {
                  key: 0,
                  title: ['diagnosis', 'contain', 'myopia'],
                },
                {
                  key: 1,
                  title: ['diagnosis', 'contain', 'refractive'],
                },
                {
                  key: 2,
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

  makeTree = data => {
    const makeTreeNode = title => {
      if (title[0] === 'age') {
        return [
          <Select key={title[1]} defaultValue={title[1]} style={{ minWidth: 50, marginLeft: 10 }}>
            <Option value="more">&lt;</Option>
            <Option value="moreEqual">&le;</Option>
            <Option value="less">&gt;</Option>
            <Option value="lessEqual">&ge;</Option>
            <Option value="equal">=</Option>
            <Option value="notEqual">≠</Option>
          </Select>,
          <InputNumber key={title[2]} defaultValue={title[2]} style={{ marginLeft: 10 }} />,
        ];
      }
      if (title[0] === 'diagnosis') {
        return [
          <Select key={title[1]} defaultValue={title[1]} style={{ minWidth: 50, marginLeft: 10 }}>
            <Option value="contain">包含</Option>
            <Option value="notContain">不包含</Option>
          </Select>,
          <Select key={title[2]} defaultValue={title[2]} style={{ minWidth: 50, marginLeft: 10 }}>
            <Option value="myopia">近视</Option>
            <Option value="refractive">屈光不正</Option>
            <Option value="strabismus">斜视</Option>
          </Select>,
        ];
      }
      return null;
    };

    if (data) {
      const treeList = data.map(item => {
        const { title, children } = item;
        return (
          <TreeNode
            key={item.key}
            className={styles.treeNode}
            title={
              <div>
                <Select
                  defaultValue={title[0]}
                  onChange={this.handleSelect}
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
                </Select>
                {makeTreeNode(title)}
              </div>
            }
          >
            {['and', 'or', 'non'].includes(title[0]) && children && this.makeTree(children)}
          </TreeNode>
        );
      });

      treeList.push(
        <TreeNode
          key={data.length}
          className={styles.treeNode}
          title={<Icon type="plus-circle" />}
          onClick={this.handleAdd}
        />
      );
      return treeList;
    }

    return (
      <TreeNode
        className={styles.treeNode}
        title={<Icon type="plus-circle" onClick={this.handleAdd} />}
      />
    );
  };

  // handleSelect = (val) => {
  //   if (val === 'age') {
  //     this.setState({
  //       SelectContent: null
  //     })
  //   } else if (val === 'diagnosis') {
  //     this.setState({
  //       SelectContent: (
  //         <div>
  //           <Select style={{ width: 70 }}>
  //             <Option value='more'>包含</Option>
  //             <Option value='moreEqual'>不包含</Option>
  //           </Select>
  //           <InputNumber decimalSeparator='0' />
  //         </div>
  //       )
  //     })
  //   }
  // }

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
