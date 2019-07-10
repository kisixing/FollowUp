import {
  Form,
  Radio,
  Select,
  InputNumber,
  TimePicker,
  Card,
  DatePicker,
  Input,
  Checkbox,
  Row,
  Col,
  Button,
} from 'antd';

import { router } from 'umi';
import styles from './steps.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const SelectOption = Select.Option;

@Form.create()
class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      timing: true,
    };
  }

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { time, timing } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Card>
        <Form {...formItemLayout}>
          <h2>时间&媒介</h2>
          <FormItem label="通知推送时间">
            {getFieldDecorator('time')(
              <RadioGroup onChange={e => this.setState({ time: e.target.value })}>
                <Radio value="0" className={styles.timeRadio}>
                  即时发送
                </Radio>
                <Radio value="1" className={styles.timeRadio}>
                  定时发送
                  {time === '1' && (
                    <span className={styles.timing}>
                      节日
                      <Select
                        className={styles.itemSelect}
                        onChange={val => this.setState({ timing: val === 'today' })}
                      >
                        <SelectOption value="today">当天</SelectOption>
                        <SelectOption value="before">之前</SelectOption>
                      </Select>
                      <InputNumber className={styles.item} disabled={timing} />天
                      <TimePicker className={styles.item} />
                    </span>
                  )}
                </Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="选择媒介">
            {getFieldDecorator('medium')(
              <RadioGroup>
                <RadioButton value="wechat">微信</RadioButton>
                <RadioButton value="sms">短信</RadioButton>
                <RadioButton value="phone">电话</RadioButton>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="活动日期">{getFieldDecorator('date')(<DatePicker />)}</FormItem>
          <FormItem label="保留期">
            {getFieldDecorator('retention')(
              <div>
                活动后
                <InputNumber className={styles.item} />天
              </div>
            )}
          </FormItem>
          <br />
          <h2>编辑消息</h2>
          <FormItem label="提示文字">
            {getFieldDecorator('Prompt')(
              <Row type="flex" align="bottom" gutter={16}>
                <Col span={20}>
                  <Input.TextArea />
                </Col>
                <Col span={4}>
                  <a herf="#">导入模板</a>
                </Col>
              </Row>
            )}
          </FormItem>
          <FormItem label=" " colon={false}>
            {getFieldDecorator('register')(<Checkbox>报名登记</Checkbox>)}
          </FormItem>
          <FormItem>
            <Row type="flex" justify="center" gutter={16}>
              <Col>
                <Button>预览</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={() => router.push('/concern-management/market')}>
                  确定
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

export default Step2;
