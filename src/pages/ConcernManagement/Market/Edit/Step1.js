import { Card, Row, Col, Button, Cascader, Icon, Tree, Input, Divider, message } from 'antd';
import router from 'umi/router';
import { first, second } from './FakeData';
import MyTree from './MyTree';

const { TreeNode } = Tree;

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      firstSelect: '',
      dataList: [],
      filterList: null,
      fileName: '',
      data: [
        {
          key: 0,
          value: [''],
        },
      ],
    };
  }

  componentDidMount() {
    const dataList = [];
    const getDataList = (data, result = '') => {
      if (data.children) {
        data.children.map(item => getDataList(item, `${result}${data.value}/`));
      } else {
        dataList.push(`${result}${data.value}/`);
      }
    };
    first.map(item => getDataList(item));
    this.setState({ dataList });
  }

  handleChange = (type, val) => {
    const { firstSelect, results } = this.state;
    if (type === 'first') {
      const { value } = val.target;
      const { dataList } = this.state;

      this.setState({
        fileName: value,
        filterList: value
          ? dataList.filter(v => v.includes(value)).map(v => ({ value: v.slice(0, -1) }))
          : null, // 查询 & 构造树节点
        firstSelect: '',
      });
    } else if (type === 'second') {
      // 添加备选项 & 去掉最后‘/‘
      results.push(
        firstSelect
          .split('/')
          .slice(-2, -1)
          .concat(val)
          .join('/')
      );
      this.setState({
        results: results.filter((v, i, arr) => {
          if (arr.indexOf(v) === i) {
            return true;
          }
          message.error('选项已存在');
          return false;
        }), // 去重
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
    const checked = checkedKeys.pop();
    this.setState({
      firstSelect: checked,
      fileName: checked,
    });
  };

  nextStep = () => {
    const { data } = this.state;
    const json = this.makeJSON(data, 0);
    // eslint-disable-next-line no-console
    console.log(json, data);
    router.push('/concern-management/market/Edit/Step2/123');
  };

  makeJSON = (data, pos) => {
    const { value, children } = this.keyToNode(data, pos);
    const json = { value };
    if (children) json.children = children.map(p => this.makeJSON(data, p));
    return json;
  };

  keyToNode = (data, pos) => {
    const { value, children } = data
      .filter((val, index, arr) => {
        if (val.key === pos) {
          arr.splice(index, 1);
          return true;
        }
        return false;
      })
      .pop();
    return { value, children };
  };

  render() {
    const { firstSelect, results, fileName, filterList, data } = this.state;

    let checked = null;
    if (firstSelect) {
      checked = firstSelect.split('/');
      checked = checked[checked.length - 2];
    }

    return (
      <div>
        <Row style={{ height: 500, marginBottom: 20 }} gutter={8}>
          <Col span={12} style={{ height: '100%' }}>
            <Card style={{ height: '100%' }}>
              <h2>事项</h2>
              档案名称：
              <br />
              <Input
                style={{ margin: 10, width: '100%' }}
                value={fileName}
                onChange={val => this.handleChange('first', val)}
              />
              <br />
              <Tree
                checkable
                checkedKeys={firstSelect ? [firstSelect] : []}
                defaultExpandAll
                onCheck={checkedKeys => this.handleChecked(checkedKeys)}
              >
                {this.makeTree(filterList !== null ? filterList : first)}
              </Tree>
            </Card>
          </Col>

          <Col span={12} style={{ height: '100%' }}>
            <Card style={{ height: '100%' }}>
              <Row style={{ height: '30%' }}>
                数据：
                <br />
                <Cascader
                  style={{ margin: 10, width: '100%' }}
                  options={second[checked]}
                  onChange={val => this.handleChange('second', val)}
                  allowClear={false}
                />
                <Divider />
              </Row>
              <Row gutter={8} style={{ height: '70%' }}>
                <h2>备选项： </h2>
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
                <MyTree results={results} data={data} />
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Button type="primary" onClick={this.nextStep}>
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
