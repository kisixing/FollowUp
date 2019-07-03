/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Modal, Table, Button, Input, Select, Popconfirm, Radio } from 'antd';
import moment from 'moment';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import request from '@/utils/request';
import styles from './User.less';

const { Search } = Input;
const { Option } = Select;

@connect(({ loading, userManagement }) => ({
  loading: loading.effects['userManagement/query'],
  dataSource: userManagement.dataSource,
}))
class UserManagemant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'add',
      visible: false,
      selectedUser: {},
    };
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        width: 80,
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 120,
      },
      {
        title: '部门/岗位',
        dataIndex: 'groups',
        key: 'groups',
        width: 120,
        render: (text, record) => (
          <span>
            {record.department}/{record.position}
          </span>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 80,
        render: text =>
          text ? (
            <Button size="small" type="primary" ghost>
              激活
            </Button>
          ) : (
            <Button size="small" type="danger" ghost>
              锁定
            </Button>
          ),
      },
      {
        title: '创建日期',
        dataIndex: 'createdDate',
        key: 'createdDate',
        width: 140,
        render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm') : ''),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 120,
        render: (text, record) => (
          <span>
            <Button
              icon="edit"
              size="small"
              type="primary"
              onClick={() => this.showModal('update', record)}
            />
            <Popconfirm title="确定删除此项?" onConfirm={() => this.handleDelete(record.login)}>
              <Button icon="delete" size="small" type="danger" className="red-button" />
            </Popconfirm>
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManagement/query',
    });
  }

  handleSearch = values => {
    console.log('onSearch', values);
  };

  showModal = (type, user) => {
    this.setState({
      visible: true,
      modalType: type,
      selectedUser: user || {},
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleDelete = loginName => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userManagement/delete',
      payload: loginName,
    });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    const { selectedUser, modalType } = this.state;
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      const groups = values.groups.map(e => ({ id: e.key }));
      const params = { ...values, groups };
      if (modalType === 'add') {
        // 新建
        dispatch({
          type: 'userManagement/add',
          payload: {
            ...params,
            firstName: '',
            lastName: '',
          },
        });
      } else {
        // 更新(需要带user id)
        dispatch({
          type: 'userManagement/update',
          payload: {
            ...params,
            id: selectedUser.id,
          },
        });
      }

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  paginationChange = (page, pageSize) => {
    // eslint-disable-next-line no-console
    console.log('pagination Change', page, pageSize);
    // 做数据请求
  };

  render() {
    const { dispatch, loading, dataSource, ...rest } = this.props;
    const { visible, modalType } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Search
              placeholder="输入部门名称搜索..."
              onSearch={value => console.log(value)}
              enterButton
            />
          </div>
          <div className={styles.right}>
            <div className={styles.searchBar}>
              <CustomizedForm
                handleSearch={this.handleSearch}
                handleAdd={() => this.showModal('add')}
                onRearch={this.onSearch}
              />
            </div>
            <Table
              rowKey="id"
              size="small"
              loading={loading}
              columns={this.columns}
              dataSource={dataSource}
              scroll={{ x: true }}
              pagination={{
                size: 'small',
                total: 50,
                showTotal: total => `共 ${total} 项`,
                showSizeChanger: true,
                showQuickJumper: true,
                onChange: this.paginationChange,
              }}
            />
            <CollectionCreateForm
              wrappedComponentRef={this.saveFormRef}
              type={modalType}
              visible={visible}
              dataSource={[]}
              onCancel={this.handleCancel}
              onCreate={this.handleCreate}
              {...rest}
            />
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default UserManagemant;

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
    <Form layout="inline" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Item>
        {getFieldDecorator('keyword', {
          rules: [{ required: true, message: '请输入关键字!' }],
        })(<Input placeholder="输入关键字搜索" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: '请选择用户类型!' }],
        })(
          <Select placeholder="类型" style={{ width: 120 }}>
            <Option value="username">用户名</Option>
            <Option value="email">邮箱</Option>
            <Option value="phone">手机号</Option>
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('status', {
          rules: [{ required: true, message: '请选择状态!' }],
        })(
          <Select placeholder="状态" style={{ width: 120 }}>
            <Option value="active">激活</Option>
            <Option value="locked">锁定</Option>
          </Select>
        )}
      </Form.Item>
      <Button type="primary" icon="search" className="green-button" onClick={search}>
        搜索
      </Button>
      <Button type="primary" icon="plus" onClick={props.handleAdd}>
        新增
      </Button>
      <Button type="primary" icon="download" className="yellow-button" onClick={search}>
        导出
      </Button>
    </Form>
  );
});

// modal模态窗口form（新增，修改功能）
const CollectionCreateForm = Form.create({
  name: 'form_in_modal',
  mapPropsToFields(props) {
    const lists = {};
    const data = props.dataSource;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (key === 'groups') {
        const groups = data[key].map(e => ({ key: e.id.toString(), label: e.nickname }));
        lists[key] = Form.createFormField({ value: groups });
      } else if (key === 'createdDate') {
        lists[key] = Form.createFormField({ value: moment(data[key]) });
      } else {
        lists[key] = Form.createFormField({ value: data[key] });
      }
    }
    return lists;
  },
})(
  // eslint-disable-next-line
  class extends React.Component {
    state = {
      groups: [],
    };

    queryOptions = () => {
      request('/api/groups')
        .then(res => {
          this.setState({ groups: res });
        })
        .catch(err => {
          console.log(err);
        });
    };

    selectOptionChildren = (data = []) => {
      const children = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.length; i++) {
        const value = data[i].id;
        const label = data[i].nickname;
        children.push(
          <Option key={value.toString()} value={value.toString()}>
            {label}
          </Option>
        );
      }
      return children;
    };

    render() {
      const { visible, onCancel, onCreate, form, type } = this.props;
      const { getFieldDecorator } = form;
      const { groups } = this.state;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return (
        <Modal
          destroyOnClose
          visible={visible}
          title={`${type === 'add' ? '新增' : '修改'}用户`}
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="用户名">
              {getFieldDecorator('login', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="电话">
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '请输入电话号码!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="邮箱">
              {getFieldDecorator('email', {
                rules: [{ required: true, message: '请输入邮箱地址!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="状态" className="collection-create-form_last-form-item">
              {getFieldDecorator('activated', {
                initialValue: true,
                rules: [{ required: true, message: '请选择状态信息!' }],
              })(
                <Radio.Group>
                  <Radio value>激活</Radio>
                  <Radio value={false}>锁定</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="角色选择">
              {getFieldDecorator('groups', {
                rules: [{ required: true, message: '请输入邮箱地址!' }],
              })(
                <Select
                  showArrow
                  labelInValue
                  mode="multiple"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                  onFocus={this.queryOptions}
                >
                  {this.selectOptionChildren(groups)}
                </Select>
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
