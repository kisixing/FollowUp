/*
 * @Description:
 * @Author: Zhong Jun
 * @Date: 2019-07-03 14:12:50
 */
import React from 'react';
import { Form, Row, Col, Input, Select, DatePicker, Button } from 'antd';
import styles from './style.less';

function CreateForm(props) {
  const { submitting, form, onSubmit = () => {} } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const validate = () => {
    validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmit(fieldsValue);
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

  return (
    <Form {...formItemLayout} hideRequiredMark className={styles.createForm}>
      <Row>
        <Col className={styles.title}>建册</Col>
      </Row>
      <Row gutter={24} style={{ padding: '0 24px' }}>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入姓名' }],
            })(<Input placeholder="请输入姓名" />)}
          </Form.Item>
        </Col>
        <Col md={16} sm={24} style={{ height: '64px' }} />
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="联系电话">
            {getFieldDecorator('phone', {
              rules: [{ required: false, message: '请输入联系电话' }],
            })(
              <div style={{ position: 'relative' }}>
                <Input placeholder="请输入联系电话" />
                <Button style={{ position: 'absolute', top: '4px', right: '-158px', zIndex: '99' }}>
                  填入通话中的号码
                </Button>
              </div>
            )}
          </Form.Item>
        </Col>
        <Col md={16} sm={24} style={{ height: '64px' }} />
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="证件类型">
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入证件类型' }],
            })(
              <Select placeholder="请输入证件类型">
                <Select.Option value="身份证">身份证</Select.Option>
                <Select.Option value="驾驶证">驾驶证</Select.Option>
                <Select.Option value="护照">护照</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="证件号码">
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入证件号码' }],
            })(<Input placeholder="请输入证件号码" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="出生日期">
            {getFieldDecorator('birth', {
              rules: [{ required: false, message: '请选择出生日期' }],
            })(<DatePicker placeholder="出生日期" style={{ width: '100%' }} />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="国籍">
            {getFieldDecorator('nationality', {
              rules: [{ required: false, message: '请输入国籍' }],
            })(<Input placeholder="请输入国籍" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="籍贯">
            {getFieldDecorator('native', {
              rules: [{ required: false, message: '请输入籍贯' }],
            })(<Input placeholder="请输入籍贯" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="民族">
            {getFieldDecorator('nation', {
              rules: [{ required: false, message: '请输入民族' }],
            })(<Input placeholder="请输入民族" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="职业">
            {getFieldDecorator('profession', {
              rules: [{ required: false, message: '请输入职业' }],
            })(<Input placeholder="请输入职业" />)}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="工作单位">
            {getFieldDecorator('workplace', {
              rules: [{ required: false, message: '请输入工作单位' }],
            })(<Input placeholder="请输入工作单位" />)}
          </Form.Item>
        </Col>
        <Col md={8} sm={24} style={{ height: '64px' }} />
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="婚姻状态">
            {getFieldDecorator('name', {
              rules: [{ required: false, message: '请输入婚姻状态' }],
            })(
              <Select placeholder="请输入婚姻状态">
                <Select.Option value="已婚">已婚</Select.Option>
                <Select.Option value="未婚">未婚</Select.Option>
                <Select.Option value="丧偶">丧偶</Select.Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="居住地址">
            {getFieldDecorator('residential', {
              rules: [{ required: false, message: '请输入居住地址' }],
            })(<Input placeholder="请输入居住地址" />)}
          </Form.Item>
        </Col>
        <Col md={8} sm={24} style={{ height: '64px' }} />
        <Col lg={8} md={12} sm={24}>
          <Form.Item label="药物过敏">
            {getFieldDecorator('allergy', {
              rules: [{ required: false, message: '请输入药物过敏' }],
            })(<Input placeholder="请输入药物过敏" />)}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col className={styles.buttonCol}>
          <Button onClick={handleReset}>重置</Button>
          <Button type="primary" loading={submitting} onClick={validate}>
            提交
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create()(CreateForm);
