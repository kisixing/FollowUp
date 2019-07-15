import { Card, Row, Col, Button, Cascader, Icon, Tree, Input } from 'antd';
import router from 'umi/router';
import { first, second } from './FakeData';
import MyTree from './MyTree';

const { TreeNode } = Tree;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      firstSelect: [],
      // dataList: []
    };
  }

  // componentDidMount() {
  //   const dataList = []
  //   const getDataList = data => {
  //     if (data.children) {
  //       data.children.map(item => getDataList(item))
  //     }
  //     dataList.push(data.value)
  //   }
  //   first.map(item => getDataList(item))
  //   this.setState({ dataList })
  // }

  handleChange = (type, val) => {
    if (type === 'first') {
      console.log(val.target.value);

      this.setState({ firstSelect: val.target.value });
    } else if (type === 'second') {
      const { firstSelect, results } = this.state;
      // 添加备选项
      results.push(
        firstSelect[0]
          .split('/')
          .slice(-2, -1)
          .concat(val)
          .join('/')
      );
      this.setState({
        results: results.filter((v, i, arr) => arr.indexOf(v) === i), // 去重
      });
    }
  };

  handleDelete = index => {
    const { results } = this.state;
    results.splice(index, 1);
    this.setState({ results });
  };

  makeTree = (data, path = '') =>
    data.map(item => (
      <TreeNode
        title={item.value}
        key={`${path}${item.value}/`}
        checkable={!item.children}
        disabled={!!item.children}
      >
        {item.children && this.makeTree(item.children, `${path}${item.value}/`)}
      </TreeNode>
    ));

  handleChecked = checkedKeys => {
    this.setState({
      firstSelect: checkedKeys.slice(-1),
    });
  };

  render() {
    const { firstSelect, results } = this.state;

    let checked = null;
    if (firstSelect[0]) {
      checked = firstSelect[0].split('/');
      checked = checked[checked.length - 2];
    }

    return (
      <div>
        <Row style={{ height: 500, marginBottom: 20 }} gutter={8}>
          <Col span={12} style={{ height: '100%' }}>
            <Row style={{ height: '50%', paddingBottom: 10 }}>
              <Card style={{ height: '100%' }}>
                <h2>事项</h2>
                档案名称：
                <br />
                {/* <Cascader
                  style={{ margin: 10, width: '100%' }}
                  options={first}
                  onChange={val => this.handleCascader('first', val)}
                /> */}
                <Input
                  style={{ margin: 10, width: '100%' }}
                  value={firstSelect}
                  onChange={val => this.handleChange('first', val)}
                />
                <br />
                数据：
                <br />
                <Cascader
                  style={{ margin: 10, width: '100%' }}
                  options={second[checked]}
                  onChange={val => this.handleChange('second', val)}
                />
              </Card>
            </Row>

            <Row style={{ height: '50%' }}>
              <Card style={{ height: '100%' }}>
                <h2>备选项</h2>
                <Row gutter={8}>
                  {results.map((item, index) => (
                    <Col span={12} key={item}>
                      {index + 1}. {item}
                      <Icon
                        style={{ marginLeft: 10 }}
                        type="close-circle"
                        onClick={() => this.handleDelete(index)}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>
            </Row>
          </Col>

          <Col span={12} style={{ height: '100%' }}>
            <Card style={{ height: '100%' }}>
              <Tree
                checkable
                checkedKeys={firstSelect}
                defaultExpandAll
                onCheck={this.handleChecked}
              >
                {this.makeTree(first)}
              </Tree>
            </Card>
          </Col>
        </Row>

        <Row>
          <Card>
            <Row>
              <h2>选定对象范围</h2>
              <Col offset={2}>
                <h3>系统内用户范围：</h3>
              </Col>
              <Col offset={2}>
                <MyTree results={results} />
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Button
                type="primary"
                onClick={() => router.push('/concern-management/market/Edit/Step2/123')}
              >
                下一步
              </Button>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default Step1;
