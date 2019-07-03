import React, { Component } from 'react';

import { Form, DatePicker, Checkbox, Card, Row, Col, Button } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

@Form.create()
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: false,
      checkAll: false,
    };
  }

  handleCheckbox = value => {
    this.setState({
      checkedList: value,
      indeterminate: value.length !== 0 && value.length !== 4,
      checkAll: value.length === 4,
    });
  };

  handleCheckAll = e => {
    const {
      form: { resetFields },
    } = this.props;

    this.setState({
      checkedList: e.target.checked ? ['1', '2', '3', '4'] : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
    resetFields(['Department']);
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { checkedList, checkAll, indeterminate } = this.state;

    const formItemLayout1 = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };
    const formItemLayout2 = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

    return (
      <Card>
        <Form>
          <Row>
            <FormItem label="时间" {...formItemLayout1}>
              {getFieldDecorator('time')(<RangePicker />)}
            </FormItem>
          </Row>
          <Row>
            <Col span={18}>
              <FormItem label="科室" {...formItemLayout2}>
                <Checkbox
                  onChange={this.handleCheckAll}
                  checked={checkAll}
                  indeterminate={indeterminate}
                >
                  全选
                </Checkbox>
                {getFieldDecorator('Department', {
                  initialValue: checkedList,
                })(
                  <Checkbox.Group onChange={this.handleCheckbox}>
                    <Checkbox value="1">妇科</Checkbox>
                    <Checkbox value="2">产科</Checkbox>
                    <Checkbox value="3">胎儿医学科</Checkbox>
                    <Checkbox value="4">生殖医学科</Checkbox>
                  </Checkbox.Group>
                )}
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem>
                <Button>重置</Button>
                <Button type="primary" style={{ marginLeft: 20 }}>
                  开始搜索
                </Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}

export default SearchForm;
