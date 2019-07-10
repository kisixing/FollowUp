import { Card, Row, Col, Button, Cascader } from 'antd';
import router from 'umi/router';
import MyTree from './MyTree';

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cascader: [],
    };
  }

  render() {
    const { cascader } = this.state;

    const options = [
      {
        label: '入院记录',
        value: '入院记录',
        children: [
          {
            label: '血压',
            value: '血压',
            children: [
              {
                label: '收缩压',
                value: '收缩压',
              },
              {
                value: '舒张压',
                label: '舒张压',
              },
              {
                value: '测量时间',
                label: '测量时间',
              },
            ],
          },
          {
            label: '体重',
            value: '体重',
            children: [
              {
                value: '体重',
                label: '体重',
              },
            ],
          },
          {
            label: '年龄',
            value: '年龄',
            children: [
              {
                value: '0年龄',
                label: '年龄',
              },
            ],
          },
        ],
      },
      {
        label: '出院小结',
        value: '出院小结',
        children: [
          {
            label: '血压',
            value: '血压',
            children: [
              {
                label: '收缩压',
                value: '收缩压',
              },
              {
                value: '舒张压',
                label: '舒张压',
              },
              {
                value: '测量时间',
                label: '测量时间',
              },
            ],
          },
          {
            label: '体重',
            value: '体重',
            children: [
              {
                value: '体重',
                label: '体重',
              },
            ],
          },
          {
            label: '年龄',
            value: '年龄',
            children: [
              {
                value: '0年龄',
                label: '年龄',
              },
            ],
          },
        ],
      },
      {
        label: '门诊病例',
        value: '门诊病例',
        children: [
          {
            label: '血压',
            value: '血压',
            children: [
              {
                label: '收缩压',
                value: '收缩压',
              },
              {
                value: '舒张压',
                label: '舒张压',
              },
              {
                value: '测量时间',
                label: '测量时间',
              },
            ],
          },
          {
            label: '体重',
            value: '体重',
            children: [
              {
                value: '体重',
                label: '体重',
              },
            ],
          },
          {
            label: '年龄',
            value: '年龄',
            children: [
              {
                value: '0年龄',
                label: '年龄',
              },
            ],
          },
        ],
      },
    ];

    return (
      <Card>
        <Row>
          <h2>事项</h2>
          <Col offset={2}>档案名称 =&gt; 数据项 =&gt; 数据值</Col>
          <Col offset={2}>
            <Cascader options={options} onChange={val => this.setState({ cascader: val })} />
          </Col>
        </Row>
        <br />
        <Row>
          <h2>选定对象范围</h2>
          <Col offset={2}>
            <h3>系统内用户范围：</h3>
          </Col>
          <Col offset={2}>
            <MyTree cascader={cascader} />
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
