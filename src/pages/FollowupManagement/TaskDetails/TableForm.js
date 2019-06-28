/*
 * @Description: 表格数据展示
 * @Author: zhong jun
 * @Date: 2019-06-19 23:43:14
 */
import React, { Component } from 'react';
import { Table, Divider, Modal, Tabs, Form, Select, Cascader, Input, Radio, Row, Col, Card, Checkbox, Button } from 'antd';
import styles from './TableForm.less'


const { TabPane } = Tabs
const FormItem = Form.Item

const data = [
  {
    key: '1',
    name: '李依依',
    cardID: 10032,
    address: 'New York No. 1 Lake Park',
    mobile: '13999988878',
  },
  {
    key: '2',
    name: '李珊珊',
    cardID: 10042,
    address: 'London No. 1 Lake Park',
    mobile: '13999988877',
  },
  {
    key: '3',
    name: '李思思',
    cardID: 10033,
    address: 'Sidney No. 1 Lake Park',
    mobile: '13999988867',
  },
  {
    key: '4',
    name: '赵飞燕',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '5',
    name: '大乔',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '6',
    name: '小乔',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
  {
    key: '99',
    name: '妲己',
    cardID: 10035,
    address: 'London No. 2 Lake Park',
    mobile: '13999988887',
  },
];
@Form.create()
class TableForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }


  columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      width: 59,
      sorter: (a, b) => a.key - b.key,
      sortDirections: ['ascend'],
      defaultSortOrder: 'ascend',
    },
    {
      title: '产妇姓名',
      dataIndex: 'name',
      width: 93,
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: '就诊卡号',
      dataIndex: 'cardID',
      width: 93,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.cardID - b.cardID,
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      width: 101,
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '末次产检时间',
      dataIndex: 'Last_labor_inspection_time',
      width: 101,
      defaultSortOrder: 'descend',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: '复诊预约时间',
      dataIndex: 'Appointment_time_for_followup_visit',
      width: 101,
      defaultSortOrder: 'descend',
    },
    {
      title: '孕周',
      dataIndex: 'estational_weeks',
      width: 45,
      defaultSortOrder: 'descend',
    },
    {
      title: '超时天数',
      dataIndex: 'overtime ',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level ',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '高危等级',
      dataIndex: 'High_risk_level',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '短信回执',
      dataIndex: 'SMS_receipt',
      width: 74,
      defaultSortOrder: 'descend',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 92,
      align: 'center',
      render: () => (
        <span>
          <a onClick={() => this.setState({ visible: true })}>电话</a>
          <Divider type="vertical" />
          <a>短信</a>
        </span>
      ),
    },
  ];

  // onChange = (pagination, filters, sorter) => {
  //   console.log('params', pagination, filters, sorter);
  // };

  showTotal = total => {
    return `共 ${total} 条`;
  };

  // onChange = (page, pageSize) => {

  // };

  render() {
    const { visible } = this.state
    const { form: { getFieldDecorator } } = this.props

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
                value: '0.1.0'
              },
              {
                label: '胡友主',
                value: '0.1.1'
              },
              {
                label: '劳学军',
                value: '0.1.2'
              },
              {
                label: '李震东',
                value: '0.1.3'
              },
            ]
          },
          {
            label: '甲状腺外科',
            value: '0.2',
          },
          {
            label: '乳腺外科',
            value: '0.3',
          }
        ]
      },
      {
        label: '内科',
        value: '1'
      },
      {
        label: '妇产科',
        value: '2'
      },
      {
        label: '儿科',
        value: '3'
      },
    ]

    return (
      <div>
        <Table
          size="middle"
          scroll={{ x: '997px' }}
          columns={this.columns}
          dataSource={data}
          pagination={{
            size: 'small',
            total: 7,
            pageSize: 5,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ['5', '10', '20', '30', '40'],
            showTotal: this.showTotal,
            // onChange: this.onChange,
          }}
        />
        <Modal
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
          okText='提交'
          cancelText='下一个问题'
          width={800}
        >

          <Row>
            <Col span={6}>
              <Card>
                <div>通话时间：00:04:32</div>
                <Checkbox checked>电话录音</Checkbox>
                <Button>转接</Button>
                <Button>挂机</Button>
              </Card>
            </Col>
            <Col span={18}>
              <Tabs type='card' activeKey='0' tabBarExtraContent='2019-06-22 16:48'>
                <TabPane tab='咨询记录' key='0'>
                  <Form {...formItemLayout}>
                    <FormItem label='咨询类型' className={styles.formItem}>
                      {getFieldDecorator('consultType')(
                        <div>
                          <span> 医生出诊</span>
                          <a style={{ marginLeft: 10 }}>更换</a>
                        </div>
                      )}
                    </FormItem>
                    <FormItem label='相关咨询' className={styles.formItem}>
                      {getFieldDecorator('consult')(
                        <div>
                          <a> 预约挂号</a>
                          <a style={{ marginLeft: 10 }}>专科介绍</a>
                        </div>
                      )}
                    </FormItem>
                    <FormItem label='医生选择' className={styles.formItem}>
                      {getFieldDecorator('doctor')(
                        <Cascader
                          placeholder="请选择"
                          options={options}
                        />
                      )}
                    </FormItem>
                    <FormItem label='出诊时间' className={styles.formItem}>
                      {getFieldDecorator('visit')(
                        <div>周二上午、周二下午、周四下午</div>
                      )}
                    </FormItem>
                    <FormItem label='停诊信息' className={styles.formItem}>
                      {getFieldDecorator('stop')(
                        <div>无</div>
                      )}
                    </FormItem>
                    <FormItem label='医生介绍' className={styles.formItem}>
                      {getFieldDecorator('introduction')(
                        <div>
                          外科学副主任医师、硕士研究生导师、医学博士、生物材料博士后。1990年江西省人民医院普外科参加工作，1996年中南大学湘雅医院工作，硕博连读，2001年新加坡国立大学博士后，2005年暨南大学附...
                          </div>
                      )}
                    </FormItem>
                    <FormItem label='备注' className={styles.formItem}>
                      {getFieldDecorator('remark')(
                        <Input placeholder="请输入" />
                      )}
                    </FormItem>
                    <FormItem label='快捷操作' className={styles.formItem}>
                      {getFieldDecorator('quick')(
                        <Radio.Group defaultValue='2'>
                          <Radio.Button value='0'>预约挂号</Radio.Button>
                          <Radio.Button value='1'>发送医生介绍</Radio.Button>
                          <Radio.Button value='2'>发送医院地址</Radio.Button>
                        </Radio.Group>
                      )}
                    </FormItem>
                    <FormItem label='执行操作' className={styles.formItem}>
                      {getFieldDecorator('action')(
                        <div>
                          <p>预约挂号【2019-07-09 上午 9:00-10:00】 专家号  劳学军</p>
                          <p>电话结束后发生短信到咨询者：医院地址</p>
                        </div>
                      )}
                    </FormItem>
                  </Form>
                </TabPane>
                <TabPane tab='历史记录' key='1'>
                </TabPane>
                <TabPane tab='知识库' key='2'>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default TableForm;
