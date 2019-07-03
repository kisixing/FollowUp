/*
 * @Description: 步骤二 选择对象
 * @Author: zhong jun
 * @Date: 2019-06-20 17:30:45
 */
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, DatePicker, Input, Checkbox, Radio, Button, Upload, Icon } from 'antd';
import moment from 'moment';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Step2.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const levelOptions = [
  { label: '低风险', value: '低风险' },
  { label: '一般风险', value: '一般风险' },
  { label: '较高风险', value: '较高风险' },
  { label: '高风险', value: '高风险' },
  { label: '极高风险', value: '极高风险' },
  { label: '全选', value: '全选' },
];
const genderOptions = [
  { label: '男', value: '男' },
  { label: '女', value: '女' },
  { label: '不限', value: '不限' },
];

@connect(({ loading, global, step2 }) => ({
  global,
  step2,
  submitting: loading.effects['form/submitRegularForm'],
}))
class Step2 extends Component {
  normFile = e => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      router.push('/satisfaction-management/satisfaction-lists/create/step3');
      if (!err) {
        // console.log('handleSubmit', values);
        dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      submitting,
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <Form hideRequiredMark onSubmit={this.handleSubmit} className={styles.step2}>
        <FormItem {...formItemLayout} className={styles.title}>
          <h3>任务名字</h3>
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.task-title" />}>
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'form.title.placeholder' })}
              style={{ width: '350px' }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} className={styles.title}>
          <h3>选定对象范围</h3>
        </FormItem>

        <FormItem {...formItemLayout} className={styles.subTitle}>
          <h4>系统内用户范围：</h4>
        </FormItem>

        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.high-risk-level" />}>
          {getFieldDecorator('level', {
            initValue: ['低风险'],
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(<Checkbox.Group options={levelOptions} />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.diagnose" />}>
          {getFieldDecorator('diagnose', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'form.title.placeholder' })}
              style={{ width: '350px' }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.previous-visitdate" />}>
          {getFieldDecorator('previousVisitDate', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <RangePicker
              ranges={{ 今天: [moment(), moment()] }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.appointment-date" />}>
          {getFieldDecorator('appointmentDate', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <RangePicker
              ranges={{ 今天: [moment(), moment()] }}
              showTime
              format="YYYY/MM/DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.age" />}>
          {getFieldDecorator('age', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <InputGroup compact>
              <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
              <Input
                style={{
                  width: 30,
                  borderLeft: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#fff',
                }}
                placeholder="~"
                disabled
              />
              <Input
                style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
                placeholder="Maximum"
              />
            </InputGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.gestational-weeks" />}>
          {getFieldDecorator('gestationalWeeks', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(
            <InputGroup compact>
              <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
              <Input
                style={{
                  width: 30,
                  borderLeft: 0,
                  pointerEvents: 'none',
                  backgroundColor: '#fff',
                }}
                placeholder="~"
                disabled
              />
              <Input
                style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
                placeholder="Maximum"
              />
            </InputGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<FormattedMessage id="step2.gender" />}>
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(<Radio.Group options={genderOptions} />)}
        </FormItem>
        <FormItem {...formItemLayout} className={styles.subTitle}>
          <h4>外部用户：</h4>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="step2.upload" />}
          extra="支持扩展名：.xls .xlsm .xml .mdb .accdb .mdf..."
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <div style={{ display: 'flex' }}>
              <Upload name="logo" action="/upload.do" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
              <Button style={{ height: '40px' }} type="link">
                模板下载
              </Button>
            </div>
          )}
        </FormItem>
        <FormItem style={{ marginTop: 32, textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            <FormattedMessage id="form.confirm" />
          </Button>
          {/* <Button style={{ marginLeft: 8 }}>
            <FormattedMessage id="form.confirm" />
          </Button> */}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Step2);
