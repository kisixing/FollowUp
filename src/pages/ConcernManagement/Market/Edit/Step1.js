import { Card, Row, Col, Button, Cascader, Icon } from 'antd';
import router from 'umi/router';
import { first, second } from './FakeData';
import MyTree from './MyTree';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      current: [],
    };
  }

  handleCascader = (type, val) => {
    if (type === 'first') {
      this.setState({ current: [val[val.length - 1]] });
    } else if (type === 'second') {
      const { current, results } = this.state;
      results.push(current.concat(val));
      this.setState({
        results,
      });
    }
  };

  handleDelete = index => {
    const { results } = this.state;
    results.splice(index, 1);
    this.setState({ results });
  };

  render() {
    const { current, results } = this.state;

    return (
      <div>
        <Card>
          <h2>事项</h2>
          <Row type="flex" justify="space-around">
            <Col span={8}>
              <Cascader
                style={{ width: '100%' }}
                options={first}
                onChange={val => this.handleCascader('first', val)}
              />
            </Col>
            <Col span={8}>
              <Cascader
                style={{ width: '100%' }}
                options={second[current[0]]}
                onChange={val => this.handleCascader('second', val)}
              />
            </Col>
          </Row>
        </Card>
        <br />

        <Card>
          <h2>备选项</h2>
          <Row gutter={8}>
            {results.map((item, index) => (
              <Col span={6} key={item.join('/')}>
                {index + 1}.{item.join('/')}
                <Icon
                  style={{ marginLeft: 10 }}
                  type="close-circle"
                  onClick={() => this.handleDelete(index)}
                />
              </Col>
            ))}
          </Row>
        </Card>
        <br />

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
      </div>
    );
  }
}

export default Step1;
