/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import Link from 'umi/link';

import { Table, Switch, Checkbox, Card, Row, Col } from 'antd';

import styles from '../Questionnaire.less';

class All extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          key: 0,
          task: '高危妊娠复诊随访',
          wechat: true,
          sms: true,
          email: false,
          phone: true,
        },
        {
          key: 1,
          task: '妊娠糖尿孕妇随访管理',
          wechat: true,
          sms: true,
          email: false,
          phone: true,
        },
        {
          key: 2,
          task: '无创基因检测检后随访',
          wechat: true,
          sms: true,
          email: false,
          phone: true,
        },
        {
          key: 3,
          task: 'PAC随访',
          wechat: true,
          sms: true,
          email: false,
          phone: true,
        },
        {
          key: 4,
          task: '科室满意度',
          wechat: true,
          sms: true,
          email: false,
          phone: true,
        },
      ]
    }
  }

  handleSwitch = (e, dataIndex, index) => {
    const { data } = this.state
    if (index || index === 0) {
      data[index][dataIndex] = e
    } else {
      Object.key(data).forEach(i => {
        data[i][dataIndex] = e.target.checked
      })
    }

    this.setState(data)
  }

  calMainSwitch = () => {
    const { data } = this.state
    const initialValue = {
      wechat: 0,
      sms: 0,
      email: 0,
      phone: 0,
    }

    const numsSwitch = data.reduce((total, currentValue) => {
      const { key, task, ...channels } = currentValue
      for (const channel in channels) {
        total[channel] = channels[channel] ? ++total[channel] : total[channel]
      }
      return total
    }, initialValue
    )

    const mainSwitch = initialValue
    const { length } = data
    for (const channel in numsSwitch) {
      if (numsSwitch[channel] === length) {
        mainSwitch[channel] = 1
      } else if (numsSwitch[channel] === 0) {
        mainSwitch[channel] = 0
      } else {
        mainSwitch[channel] = -1
      }
    }

    return mainSwitch
  }

  render() {
    const { data } = this.state

    const mainSwitch = this.calMainSwitch()

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
      },
      {
        title: '随访任务',
        dataIndex: 'task',
      },
      {
        title: '微信渠道',
        dataIndex: 'wechat',
        render: (text, record, index) =>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={text}
            onClick={checked => this.handleSwitch(checked, 'wechat', index)}
          />,
      },
      {
        title: '短信渠道',
        dataIndex: 'sms',
        render: (text, record, index) =>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={text}
            onClick={checked => this.handleSwitch(checked, 'sms', index)}
          />,
      },
      {
        title: '邮件渠道',
        dataIndex: 'email',
        render: (text, record, index) =>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={text}
            onClick={checked => this.handleSwitch(checked, 'email', index)}
          />,
      },
      {
        title: '电话渠道',
        dataIndex: 'phone',
        render: (text, record, index) =>
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            checked={text}
            onClick={checked => this.handleSwitch(checked, 'phone', index)}
          />,
      },
      {
        title: '人工管理设置',
        // dataIndex: 'key',
        render: () => <Link to="#">设置 </Link>,
      },
    ];

    return (
      <div className={styles.filterCardList}>
        <Card title="总配置:">
          <Row type="flex" justify="space-around">
            <Col>
              微信渠道:&nbsp;&nbsp;&nbsp;
              <Checkbox
                indeterminate={mainSwitch.wechat !== 1 && mainSwitch.wechat !== 0}
                checked={mainSwitch.wechat === 1}
                onChange={checked => this.handleSwitch(checked, 'wechat')}
              />
            </Col>
            <Col>
              短信渠道:&nbsp;&nbsp;&nbsp;
              <Checkbox
                indeterminate={mainSwitch.sms !== 1 && mainSwitch.sms !== 0}
                checked={mainSwitch.sms === 1}
                onChange={checked => this.handleSwitch(checked, 'sms')}
              />
            </Col>
            <Col>
              邮件渠道:&nbsp;&nbsp;&nbsp;
              <Checkbox
                indeterminate={mainSwitch.email !== 1 && mainSwitch.email !== 0}
                checked={mainSwitch.email === 1}
                onChange={checked => this.handleSwitch(checked, 'email')}
              />
            </Col>
            <Col>
              电话渠道:&nbsp;&nbsp;&nbsp;
              <Checkbox
                indeterminate={mainSwitch.phone !== 1 && mainSwitch.phone !== 0}
                checked={mainSwitch.phone === 1}
                onChange={checked => this.handleSwitch(checked, 'wecphonehat')}
              />
            </Col>
          </Row>
        </Card>
        <Table
          className={styles.table}
          style={{ marginTop: 24 }}
          columns={columns}
          dataSource={data}
          pagination={{
            size: 'small',
            total: 54,
            pageSize: 10,
            showSizeChanger: true,
            // onShowSizeChange={ this.onShowSizeChange }
            showQuickJumper: true,
            // onChange: this.onChange,
            showTotal: total => `总记录数${total}/总页数:${Math.ceil(total / 10)}`,
          }}
        />
      </div>
    );
  }
}

export default All;
