/*
 * @Description: 操作日记
 * @Author: Zhong Jun
 * @Date: 2019-07-03 15:51:08
 */
import React, { Component } from 'react';
import { Table, Form, Select, Input, Button, Tag } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';

import styles from './MonitorLogs.less';

const { Option } = Select;
const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 100,
    align: 'center',
  },
  {
    title: 'IP',
    dataIndex: 'requestIp',
    key: 'requestIp',
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 100,
  },
  {
    title: '方法名称',
    dataIndex: 'method',
    key: 'method',
    width: 150,
    render: text => (
      <Ellipsis length={30} tooltip>
        {text}
      </Ellipsis>
    ),
  },
  {
    title: '参数',
    dataIndex: 'params',
    key: 'params',
    width: 150,
    render: text => (
      <Ellipsis length={30} tooltip>
        {text}
      </Ellipsis>
    ),
  },
  {
    title: '请求耗时',
    dataIndex: 'time',
    key: 'time',
    width: 100,
    render: text => <Tag color="blue">{text} ms</Tag>,
  },
  {
    title: '创建日期',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100,
  },
];

@connect(({ loading, logs }) => ({
  loading: loading.effects['logs/query'],
  dataSource: logs.dataSource,
}))
class MonitorLogs extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'logs/query',
      payload: {},
    });
  }

  paginationChange = (page, pageSize) => {
    // eslint-disable-next-line no-console
    console.log('pagination Change', page, pageSize);
    // 做数据请求
  };

  render() {
    const { loading, dataSource } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <CustomizedForm />
          <Table
            loading={loading}
            rowKey="id"
            size="small"
            scroll={{ x: true }}
            pagination={{
              size: 'small',
              total: 50,
              showTotal: total => `共 ${total} 项`,
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: this.paginationChange,
            }}
            columns={columns}
            dataSource={dataSource}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default MonitorLogs;

// search搜索form
const CustomizedForm = Form.create({
  name: 'keyword',
})(props => {
  const { getFieldDecorator } = props.form;
  const search = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        // console.info('success', values);
        props.handleSearch(values);
      }
    });
  };
  return (
    <Form layout="inline" style={{ marginBottom: '24px' }}>
      <Form.Item>
        {getFieldDecorator('keyword', {
          rules: [{ required: true, message: '请输入关键字搜索!' }],
        })(<Input placeholder="输入关键字搜索" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请选择用户类型!' }],
        })(
          <Select placeholder="类型" style={{ width: 120 }}>
            <Option value="username">用户名</Option>
            <Option value="decs">描述</Option>
            <Option value="email">邮箱</Option>
            <Option value="phone">手机号</Option>
          </Select>
        )}
      </Form.Item>
      <Button type="primary" icon="search" className="green-button" onClick={search}>
        搜索
      </Button>
    </Form>
  );
});
