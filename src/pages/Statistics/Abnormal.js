import React, { Component } from 'react';
import { Card, Radio, Row, Col } from 'antd';
import { Gauge } from '@/components/Charts'


class Abnormal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'today'
    }
  }

  handleChange = (key) => this.setState({ key })

  render() {
    const { key } = this.state

    return (
      <Card
        title="自动随访异常统计"
        extra={
          <Radio.Group value={key} onChange={this.handleChange}>
            <Radio.Button value='today'>
              今日
            </Radio.Button>
            <Radio.Button value='week'>
              本周
            </Radio.Button>
            <Radio.Button value='month'>
              本月
            </Radio.Button>
          </Radio.Group>
        }
      >
        <Row>
          <Col>
            <Card
              title='短信发送成功率'
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge
                title='成功率'
                height={180}
                percent={87}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Abnormal