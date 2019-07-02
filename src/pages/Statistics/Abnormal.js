import React, { Component } from 'react';
import { Card, Radio, Row, Col, Table } from 'antd';
import { Gauge } from '@/components/Charts';

const data = [
  {
    key: 0,
    time: '08：00 - 08:59',
    nums: 21,
  },
  {
    key: 1,
    time: '09：00 - 09:59',
    nums: 23,
  },
  {
    key: 2,
    time: '10：00 - 10:59',
    nums: 33,
  },
  {
    key: 3,
    time: '18：00 - 18:59',
    nums: 43,
  },
  {
    key: 4,
    time: '19：00 - 19:59',
    nums: 121,
  },
  {
    key: 5,
    time: '20：00 - 20:59',
    nums: 18,
  },
];
class Abnormal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'today',
    };
  }

  handleChange = key => this.setState({ key });

  render() {
    const { key } = this.state;

    const columns = [
      {
        dataIndex: 'time',
        render: (value, record) =>
          record.nums > 100 ? (
            <span style={{ color: 'red' }}>{value}条</span>
          ) : (
            <span>{value}条</span>
          ),
      },
      {
        dataIndex: 'nums',
        render: value =>
          value > 100 ? <span style={{ color: 'red' }}>{value}条</span> : <span>{value}条</span>,
      },
    ];

    return (
      <Card
        title="自动随访异常统计"
        extra={
          <Radio.Group value={key} onChange={this.handleChange}>
            <Radio.Button value="today">今日</Radio.Button>
            <Radio.Button value="week">本周</Radio.Button>
            <Radio.Button value="month">本月</Radio.Button>
          </Radio.Group>
        }
      >
        <Row>
          <Col span={12}>
            <Card
              title="短信发送成功率"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="成功率" height={180} percent={87} />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              title="短信发送异常返回信息分析"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Table
                showHeader={false}
                pagination={false}
                size="small"
                columns={columns}
                dataSource={data}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Abnormal;
