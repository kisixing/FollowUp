/*
 * @Description: 步骤二 选择对象
 * @Author: zhong jun
 * @Date: 2019-06-20 17:30:45
 */
import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, Input, Radio, Button, TreeSelect, Checkbox } from 'antd';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';
import styles from './Step2.less';

const { SHOW_PARENT } = TreeSelect;

const FormItem = Form.Item;
const InputGroup = Input.Group;
const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-0',
        key: '0-0-0',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Child Node3',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'Child Node4',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'Child Node5',
        value: '0-1-2',
        key: '0-1-2',
      },
    ],
  },
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
      router.push('/concern-management/festival-concern/create/step3');
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
    const tProps = {
      treeData,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Please select',
      style: {
        width: 300,
      },
    };

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
      <Form
        hideRequiredMark
        onSubmit={this.handleSubmit}
        className={styles.step2}
        {...formItemLayout}
      >
        <FormItem className={styles.title}>
          <h3>任务名字</h3>
        </FormItem>
        <FormItem label={<FormattedMessage id="step2.task-title" />}>
          {getFieldDecorator('title', {
            initialValue: '全科诊后满意度调查',
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
        <FormItem className={styles.title}>
          <h3>选定对象范围</h3>
        </FormItem>

        <FormItem className={styles.subTitle}>
          <h4>系统内用户范围：</h4>
        </FormItem>

        <FormItem label="科室">{getFieldDecorator('office')(<TreeSelect {...tProps} />)}</FormItem>

        <FormItem label={<FormattedMessage id="step2.age" />}>
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

        <FormItem label={<FormattedMessage id="step2.gender" />}>
          {getFieldDecorator('gender', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'validation.title.required' }),
              },
            ],
          })(<Radio.Group options={genderOptions} />)}
        </FormItem>
        <FormItem className={styles.subTitle}>
          <h4>外部用户：</h4>
        </FormItem>
        <FormItem label="外部用户">
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(<Checkbox>生成二维码</Checkbox>)}
        </FormItem>
        <FormItem style={{ marginTop: 32, textAlign: 'center' }} wrapperCol={{ md: 24 }}>
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
