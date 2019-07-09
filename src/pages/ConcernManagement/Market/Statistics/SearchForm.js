/*
 * @Description: 头部搜索表单
 * @Author: zhong jun
 * @Date: 2019-06-19 22:44:43
 */
import React, { PureComponent } from 'react';
import { Button, Form, Col, Row, DatePicker, Select } from 'antd';
import styles from './SearchForm.less';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  date: { label: '时间', value: 'date' },
  status: { label: '发送状态', value: 'status' },
  register: { label: '报名登记', value: 'register' },
};

@Form.create()
class SearchForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        // console.log('search values', values);
        dispatch({
          type: 'form/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  handleReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    return (
      <Form {...formItemLayout} hideRequiredMark>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label={fieldLabels.date.label}>
              {getFieldDecorator(fieldLabels.date.value, {
                rules: [{ required: false, message: '请选择日期' }],
              })(<RangePicker />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={fieldLabels.status.label}>
              {getFieldDecorator(fieldLabels.status.value, {
                initialValue: 'all',
              })(
                <Select placeholder="请选择">
                  <Option value="all">全部</Option>
                  <Option value="success">成功</Option>
                  <Option value="fail">失败</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={fieldLabels.register.label}>
              {getFieldDecorator(fieldLabels.register.value, {
                initialValue: 'all',
              })(
                <Select placeholder="请选择">
                  <Option value="all">全部</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row type="flex" justify="end">
          <Col span={6}>
            <Form.Item className={styles.buttonGroup}>
              <Button onClick={this.handleReset}>重置</Button>
              <Button type="primary" onClick={this.validate} loading={submitting}>
                开始搜索
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchForm;
