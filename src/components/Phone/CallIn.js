import React, { Component } from 'react';
import {
  Modal,
  Tabs,
  Form,
  Select,
  Cascader,
  Input,
  Radio,
  Row,
  Col,
  Card,
  Checkbox,
  Button,
  Divider,
  Tag,
  Timeline,
} from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Option } = Select;
const TimelineItem = Timeline.Item;

export function PatientInfo({ name }) {
  return (
    <div>
      <Card className={styles.card}>
        <Row>
          姓名：
          <b>{name}</b>
        </Row>
        <Row>年龄： 28</Row>
        <Row>
          <Col span={8}>标签：</Col>
          <Col span={16}>
            <Tag color="magenta">双胎</Tag>
            <Tag color="volcano">妊娠糖尿病</Tag>
          </Col>
        </Row>
        <Row>孕周： 28+3</Row>
        <Row>高危等级： IV级</Row>
      </Card>
      <Card className={styles.card2}>
        <Timeline className={styles.timeline}>
          <TimelineItem>
            <div>
              12+3周
              <span className={styles.timelineItemDate}>2019.03.12</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              轻度贫血、早期妊娠...
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>
              钙维生素D软胶囊
            </div>
          </TimelineItem>
          <TimelineItem color="red">
            <div>
              23+1周
              <span className={styles.timelineItemDate}>2019.05.15</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              轻度贫血、早期妊娠...
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>
              硫酸亚铁片
            </div>
          </TimelineItem>
          <TimelineItem color="green">
            <div>
              23+1周
              <span className={styles.timelineItemDate}>2019.06.15</span>
            </div>
            <div>
              <Tag color="blue">诊</Tag>
              健康
            </div>
            <div>
              <Tag color="blue">检</Tag>
              <a>血常规</a>
              <a>B超</a>
            </div>
            <div>
              <Tag color="blue">药</Tag>无
            </div>
          </TimelineItem>
        </Timeline>
      </Card>
    </div>
  );
}

@Form.create()
class CallIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      onOk,
      onNext,
      onCancel,
      detail,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const options = [
      {
        label: '外科',
        value: '0',
        children: [
          {
            label: '胃肠外科',
            value: '0.0',
          },
          {
            label: '肝胆外科',
            value: '0.1',
            children: [
              {
                label: '曹明溶',
                value: '0.1.0',
              },
              {
                label: '胡友主',
                value: '0.1.1',
              },
              {
                label: '劳学军',
                value: '0.1.2',
              },
              {
                label: '李震东',
                value: '0.1.3',
              },
            ],
          },
          {
            label: '甲状腺外科',
            value: '0.2',
          },
          {
            label: '乳腺外科',
            value: '0.3',
          },
        ],
      },
      {
        label: '内科',
        value: '1',
      },
      {
        label: '妇产科',
        value: '2',
      },
      {
        label: '儿科',
        value: '3',
      },
    ];

    let detailForm;
    switch (detail) {
      case 'callin':
        detailForm = (
          <Form {...formItemLayout} className={styles.form}>
            <FormItem label="咨询类型" className={styles.formItem}>
              {getFieldDecorator('consultType', {
                initialValue: '0',
              })(
                <Select size="small" style={{ width: 120 }}>
                  <Option value="0">医生出诊</Option>
                </Select>
              )}
              <span style={{ float: 'right' }}>
                <span>相关咨询:</span>
                <a> 预约挂号</a>
                <a style={{ marginLeft: 10 }}>专科介绍</a>
              </span>
            </FormItem>
            <FormItem label="医生选择" className={styles.formItem}>
              {getFieldDecorator('doctor')(
                <Cascader
                  size="small"
                  expandTrigger="hover"
                  placeholder="请选择"
                  options={options}
                />
              )}
            </FormItem>
            <FormItem label="出诊时间" className={styles.formItem}>
              <div>周二上午、周二下午、周四下午</div>
            </FormItem>
            <FormItem label="停诊信息" className={styles.formItem}>
              <div>无</div>
            </FormItem>
            <FormItem label="医生介绍" className={styles.formItem}>
              <div>
                外科学副主任医师、硕士研究生导师、医学博士、生物材料博士后。1990年江西省人民医院普外科参加工作，1996年中南大学湘雅医院工作，硕博连读，2001年新加坡国立大学博士后，2005年暨南大学附...
              </div>
            </FormItem>
            <FormItem label="备注" className={styles.formItem}>
              {getFieldDecorator('remark')(<Input.TextArea autosize placeholder="请输入" />)}
            </FormItem>
            <FormItem label="快捷操作" className={styles.formItem}>
              {getFieldDecorator('quick', {
                initialValue: '2',
              })(
                <Radio.Group size="small">
                  <Radio.Button value="0">预约挂号</Radio.Button>
                  <Radio.Button value="1">发送医生介绍</Radio.Button>
                  <Radio.Button value="2">发送医院地址</Radio.Button>
                </Radio.Group>
              )}
            </FormItem>
            <Divider />
            <FormItem label="执行操作" className={styles.formItem}>
              <div>
                <div>预约挂号【2019-07-09 上午 9:00-10:00】 专家号 劳学军</div>
                <div>电话结束后发生短信到咨询者：医院地址</div>
              </div>
            </FormItem>
            <FormItem wrapperCol={{ span: 24 }} className={styles.formItem}>
              <span>接听人：黄思雨</span>
              <Button type="primary" onClick={onOk} style={{ float: 'right', marginLeft: 10 }}>
                提交
              </Button>
              <Button type="primary" style={{ float: 'right' }} onClick={onNext}>
                下一个问题
              </Button>
            </FormItem>
          </Form>
        );
        break;
      case 'callout':
        detailForm = (
          <Form className={styles.form}>
            <FormItem label="电话状态" className={styles.formItem} {...formItemLayout}>
              {getFieldDecorator('status', {
                rules: [{ required: true }],
              })(
                <Radio.Group>
                  <Radio value={0}>成功</Radio>
                  <Radio value={1}>未接听</Radio>
                  <Radio value={2}>电话错误</Radio>
                </Radio.Group>
              )}
            </FormItem>
            <Divider />
            <h2 style={{ textAlign: 'center' }}>高危复诊超时随访记录</h2>
            <FormItem label="1. 复诊超时原因" className={styles.formItem}>
              {getFieldDecorator('reason')(
                <Radio.Group style={{ marginLeft: 20 }}>
                  <Radio value={0}>住院</Radio>
                  <Radio value={1}>转院</Radio>
                  <Radio value={2}>已分娩</Radio>
                  <Radio value={3}>妊娠终止</Radio>
                  <Radio value={4}>
                    其他
                    <Input style={{ marginLeft: 10 }} />
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label="2. 备注" className={styles.formItem}>
              {getFieldDecorator('remark')(
                <Input.TextArea autosize placeholder="请输入" style={{ marginLeft: 20 }} />
              )}
            </FormItem>
            <Divider />
            <FormItem className={styles.formItem}>
              <span>接听人：黄思雨</span>
              <Button type="primary" onClick={onOk} style={{ float: 'right', marginLeft: 10 }}>
                提交
              </Button>
            </FormItem>
          </Form>
        );
        break;
      default:
        detailForm = <div />;
    }
    return (
      <Modal
        visible={visible}
        footer={null}
        width={800}
        onCancel={onCancel}
        style={{ top: 15 }}
        bodyStyle={{ backgroundColor: '#f0f2f5', maxHeight: 685, overflow: 'auto' }}
      >
        <Row gutter={8}>
          <Col span={6}>
            <PatientInfo name="张珊珊" />
            <Card className={styles.card}>
              <p>通话时间：00:04:32</p>
              <p>
                <Checkbox checked>电话录音</Checkbox>
              </p>
              <Row type="flex" justify="space-around">
                <Col>
                  <Button>转接</Button>
                </Col>
                <Col>
                  <Button>挂机</Button>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col span={18}>
            <Tabs
              type="card"
              activeKey="0"
              tabBarExtraContent="2019-06-22 16:48"
              style={{ backgroundColor: 'white' }}
              tabBarStyle={{ backgroundColor: '#f0f2f5' }}
            >
              <TabPane tab="咨询记录" key="0" className={styles.tabPane}>
                {detailForm}
              </TabPane>
              <TabPane tab="历史记录" key="1" className={styles.tabPane} />
              <TabPane tab="知识库" key="2" className={styles.tabPane} />
            </Tabs>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default CallIn;
