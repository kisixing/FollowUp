/*
 * @Description: 头部搜索表单
 * @Author: zhong jun
 * @Date: 2019-06-19 22:44:43
 */
import React, { PureComponent } from 'react';
import { Button, Form, Col, Row, DatePicker, Input, Select } from 'antd';
import styles from './SearchForm.less';

const { Option } = Select;

const fieldLabels = {
  startTime: { label: '建卡开始时间', value: 'startTime' },
  endTime: { label: '建卡结束时间', value: 'endTime' },
  ageMin: { label: '年龄段', value: 'ageMin' },
  ageMax: { label: '年龄段', value: 'ageMax' },
  type: { label: '类型', value: 'type' },
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
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form {...formItemLayout} hideRequiredMark>
        <Row gutter={16}>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label={fieldLabels.startTime.label}>
              {getFieldDecorator(fieldLabels.startTime.value, {
                rules: [{ required: false, message: '请选择开始日期' }],
              })(<DatePicker placeholder="开始日期" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label={fieldLabels.endTime.label}>
              {getFieldDecorator(fieldLabels.endTime.value, {
                rules: [{ required: false, message: '请选择结束日期' }],
              })(<DatePicker placeholder="结束日期" style={{ width: '100%' }} />)}
            </Form.Item>
          </Col>
          <Col lg={8} md={0} sm={0} style={{ height: '64px' }} />
          <Col lg={8} md={12} sm={24}>
            <Form.Item label={fieldLabels.ageMin.label}>
              <Form.Item style={{ display: 'inline-block', width: '45%' }}>
                {getFieldDecorator(fieldLabels.ageMin.value, {
                  rules: [{ required: false, message: '请选择年龄段' }],
                })(<Input style={{ textAlign: 'center' }} placeholder="Minimum" />)}
              </Form.Item>
              <span> ~ </span>
              <Form.Item style={{ display: 'inline-block', width: '45%' }}>
                {getFieldDecorator(fieldLabels.ageMax.value)(
                  <Input style={{ textAlign: 'center' }} placeholder="Maximum" />
                )}
              </Form.Item>
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <Form.Item label={fieldLabels.type.label}>
              {getFieldDecorator(fieldLabels.type.value, {
                rules: [{ required: false, message: '请选择患者类型' }],
              })(
                <Select placeholder="选择患者类型">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col lg={8} md={12} sm={24}>
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
