import { useState, useEffect } from 'react';
import moment from 'moment';
import { DatePicker, Input, Button, Row, Col, Form, Icon, Select } from 'antd';

const { RangePicker } = DatePicker;

export default Form.create()(
  ({ data, url, onSearch, form: { getFieldDecorator, validateFields, resetFields } }) => {
    const [defaultValue, setdefaultValue] = useState({});
    const [dateFormat] = useState(() =>
      data.reduce((total, current) => {
        if (current.search.type === 'date') {
          return {
            ...total,
            [current.key]: current.search.format,
          };
        }
        return total;
      }, {})
    );
    const convertDateFormat = values =>
      Object.keys(dateFormat).reduce(
        (total, key) => {
          if (key in total) {
            return {
              ...total,
              [key]: total[key].map(ele => moment(ele, dateFormat[key])),
            };
          }
          return total;
        },
        { ...values }
      );
    useEffect(() => {
      import('./data.js').then(myModule => {
        setdefaultValue(convertDateFormat(myModule.defaultValue));
        onSearch(myModule.defaultValue, url);
      });
    }, []);

    const [expandForm, setexpandForm] = useState(false);

    const colSpan = { xl: 8, md: 12, xs: 24 };
    const makeForm = () => {
      let headItems = data.slice(0, 2);
      if (expandForm) {
        headItems = data;
      }
      const result = headItems.map(item => {
        const {
          search: { type, options },
          key,
          title,
        } = item;

        if (type === 'date') {
          return (
            <Col {...colSpan} key={key}>
              <Form.Item label={title}>
                {getFieldDecorator(key, {
                  initialValue: defaultValue[key],
                })(<RangePicker />)}
              </Form.Item>
            </Col>
          );
        }
        if (type === 'input') {
          return (
            <Col {...colSpan} key={key}>
              <Form.Item label={title}>
                {getFieldDecorator(key, {
                  initialValue: defaultValue[key],
                })(<Input />)}
              </Form.Item>
            </Col>
          );
        }
        if (type === 'select') {
          return (
            <Col {...colSpan} key={key}>
              <Form.Item label={title}>
                {getFieldDecorator(key, {
                  initialValue: defaultValue[key],
                })(
                  <Select mode="multiple">
                    {options.map(opt => (
                      <Select.Option key={opt.key}>{opt.title}</Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          );
        }
        return null;
      });
      result.push();
      return result;
    };

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 },
    };

    const handleSubmit = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (err) {
          console.log(err);
        }
        const convertValues = convertDateFormat(values);
        onSearch(convertValues, url);
      });
    };

    return (
      <Form onSubmit={handleSubmit} {...formItemLayout}>
        <Row gutter={{ span: 8 }}>
          {makeForm()}
          <Col {...colSpan}>
            <Row type="flex" justify="center" gutter={16}>
              <Col>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
              </Col>
              <Col>
                <Button
                  type="primary"
                  onClick={() => {
                    resetFields();
                    onSearch(defaultValue, url);
                  }}
                >
                  {' '}
                  重置
                </Button>
              </Col>
              <Col>
                <a style={{ marginLeft: 8 }} onClick={() => setexpandForm(pre => !pre)}>
                  {expandForm ? (
                    <>
                      收起 <Icon type="up" />
                    </>
                  ) : (
                    <>
                      展开 <Icon type="down" />
                    </>
                  )}
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    );
  }
);
