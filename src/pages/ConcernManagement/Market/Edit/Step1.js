import { Card, Row, Col, Input, Button } from 'antd';
import router from 'umi/router';
import MyTree from './MyTree';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Card>
        <Row>
          <h2>活动名字</h2>
          <Col offset={2} span={2}>
            活动标题：
          </Col>
          <Col span={8}>
            <Input />
          </Col>
        </Row>
        <br />
        <Row>
          <h2>选定对象范围</h2>
          <Col offset={2}>
            <h3>系统内用户范围：</h3>
          </Col>
          <Col offset={2}>
            <MyTree />
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
    );
  }
}

export default Step1;
