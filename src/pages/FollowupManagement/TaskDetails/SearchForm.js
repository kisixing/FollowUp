/**
 * header 搜索表单
 */
import React from 'react';
import { Form, Row, Col, Input, DatePicker, Button } from 'antd';
import styles from './index.less';

const SearchForm = Form.create()(props => {
  const { submitting, form, onSearch = () => {} } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const validate = () => {
    validateFields((err, fieldsValue) => {
      if (err) return;
      // resetFields();
      onSearch(fieldsValue);
    });
  };

  const handleReset = () => {
    resetFields();
  };

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

  const fieldLabels = {
    medicalCardId: { label: '就诊卡号', value: 'medicalCardId' },
    name: { label: '姓名', value: 'name' },
    startTime: { label: '复诊预约开始时间', value: 'startTime' },
    endTime: { label: '复诊预约结束时间', value: 'endTime' },
  };

  return (
    <Form {...formItemLayout} hideRequiredMark>
      <Row gutter={16}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label={fieldLabels.medicalCardId.label}>
            {getFieldDecorator(fieldLabels.medicalCardId.value, {
              rules: [{ required: false, message: '请输入就诊卡号' }],
            })(<Input placeholder="请输入就诊卡号" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label={fieldLabels.name.label}>
            {getFieldDecorator(fieldLabels.name.value, {
              rules: [{ required: false, message: '请输入姓名' }],
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
        </Col>

        <Col lg={8} md={0} sm={0} style={{ height: '64px' }} />

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
        <Col lg={8} md={12} sm={24}>
          <Form.Item className={styles.buttonGroup}>
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" onClick={validate} loading={submitting}>
              开始搜索
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
});

export default SearchForm;
