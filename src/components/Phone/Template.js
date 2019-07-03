import {
  Form,
  Select,
  Cascader,
  Input,
  Radio,
  Button,
  Divider,
  Card,
  Checkbox,
  Row,
  Col,
} from 'antd';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

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

export const CallinDetailForm = Form.create()(props => {
  const {
    form: { getFieldDecorator },
    onOk,
    onNext,
  } = props;
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
  return (
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
          <Cascader size="small" expandTrigger="hover" placeholder="请选择" options={options} />
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
});

export const CalloutDetailForm = Form.create()(props => {
  const {
    form: { getFieldDecorator },
    onOk,
  } = props;
  return (
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
});

export const ManualDetailForm = Form.create()(props => {
  const {
    form: { getFieldDecorator },
    onOk,
  } = props;
  return (
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
      <h3 style={{ textAlign: 'center' }}>答卷详情</h3>
      <FormItem label="1. 请从总体上给本科室打分" className={styles.formItem}>
        <div className={styles.scores}>选项2: 2分</div>
      </FormItem>
      <FormItem label="2. 您认为这次的就诊流程顺畅吗？" className={styles.formItem}>
        <div className={styles.scores}>选项4: 4分</div>
      </FormItem>
      <FormItem label="3. 请您给分诊的护士打分" className={styles.formItem}>
        <div className={styles.scores}>选项4: 4分</div>
      </FormItem>
      <Divider />
      <FormItem label="1. 问题记录" className={styles.formItem}>
        {getFieldDecorator('remark')(<Input.TextArea autosize placeholder="请输入" />)}
      </FormItem>
      <FormItem label="2. 问题转交" className={styles.formItem}>
        {getFieldDecorator('transfer')(
          <Select>
            <Option value="0">产科</Option>
            <Option value="1">妇科</Option>
          </Select>
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
});

export const CallinCard = () => {
  return (
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
  );
};

export const CalloutCard = () => {
  return (
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
  );
};
