/* eslint-disable guard-for-in */
/* eslint-disable no-console */
import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Table, Card, Tree, Radio, Button, Input, Modal } from 'antd';

import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Ellipsis from '@/components/Ellipsis';

import styles from './Role.less';

const { TreeNode } = Tree;
const { TextArea } = Input;

@connect(({ menu, loading, roleManagemant }) => ({
  loading: loading.effects['roleManagemant/query'],
  menuData: menu.menuData,
  dataSource: roleManagemant.dataSource,
}))
class RoleManagemant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '菜单分配',
      visible: false,
      modalType: 'add',
      selectedUser: {},
    };
    this.columns = [
      {
        title: '名称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 80,
      },
      {
        title: '数据权限',
        dataIndex: 'authority',
        key: 'authority',
        width: 80,
      },
      {
        title: '角色级别',
        dataIndex: 'grade',
        key: 'grade',
        width: 80,
      },
      {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc',
        width: 180,
        render: text => (
          <Ellipsis length={20} tooltip>
            {text}
          </Ellipsis>
        ),
      },
      {
        title: '创建日期',
        dataIndex: 'createdTime',
        key: 'createdTime',
        width: 120,
        render: text => (text ? moment(text).format('YYYY-MM-DD HH:mm') : ''),
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <span className={styles.actionButton}>
            <Button
              icon="edit"
              size="small"
              type="primary"
              onClick={() => this.showModal('update', record)}
            />
            <Button icon="delete" size="small" type="danger" onClick={() => {}} />
          </span>
        ),
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'roleManagemant/query',
      payload: {},
    });
  }

  onSearch = () => {};

  add = () => {};

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

  handleSizeChange = e => {
    this.setState({ value: e.target.value });
  };

  handleCreate = () => {
    const { dispatch } = this.props;
    const { selectedUser, modalType } = this.state;
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      if (modalType === 'add') {
        // 新建
        dispatch({
          type: 'roleManagement/add',
          payload: {
            ...values,
          },
        });
      } else {
        // 更新(需要带user id)
        dispatch({
          type: 'roleManagement/update',
          payload: {
            ...selectedUser,
            ...values,
          },
        });
      }

      form.resetFields();
      this.setState({ visible: false });
    });
  };

  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.name} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={item.name} />;
    });

  paginationChange = (page, pageSize) => {
    // page 第几页 pageSize 每页多少列
    console.log('pagination Change', page, pageSize);
    // 做数据请求
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { value, visible, modalType } = this.state;
    const { menuData, dataSource, loading, ...rest } = this.props;
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <Input
              placeholder="输入部门名称搜索..."
              allowClear
              style={{ width: '240px' }}
              // eslint-disable-next-line no-shadow
              onClick={value => console.log(value)}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" icon="search" className="green-button" onClick={this.onSearch}>
              搜索
            </Button>
            <Button type="primary" icon="plus" onClick={() => this.showModal('add')}>
              新增
            </Button>
            <span className={styles.tips}>tips： 新建角色 --&gt; 分配菜单 --&gt; 分配权限</span>
          </div>
          <div className={styles.main}>
            <div className={styles.left}>
              <Card
                title="角色列表"
                extra={
                  <Radio.Group
                    size="small"
                    buttonStyle="solid"
                    value={value}
                    onChange={this.handleSizeChange}
                  >
                    <Radio.Button value="菜单分配">菜单分配</Radio.Button>
                    <Radio.Button value="权限分配">权限分配</Radio.Button>
                  </Radio.Group>
                }
              >
                <Table
                  size="small"
                  loading={loading}
                  rowKey="id"
                  columns={this.columns}
                  dataSource={dataSource}
                  pagination={{
                    hideOnSinglePage: true,
                    size: 'small',
                    total: 3,
                    showTotal: total => `共 ${total} 项`,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange: this.paginationChange,
                  }}
                />
              </Card>
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
            <div className={styles.right}>
              <Card
                title={value}
                extra={
                  <Button size="small" type="primary">
                    保存
                  </Button>
                }
              >
                <Tree checkable>{this.renderTreeNodes(menuData)}</Tree>
              </Card>
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default RoleManagemant;

// modal模态窗口form（新增，修改功能）
const CollectionCreateForm = Form.create({
  name: 'form_in_modal',
  mapPropsToFields(props) {
    const lists = {};
    const data = props.dataSource;
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      lists[key] = Form.createFormField({ value: data[key] });
    }
    return lists;
  },
})(
  // eslint-disable-next-line
  class extends React.Component {
    state = {};

    render() {
      const { visible, onCancel, onCreate, form, type } = this.props;
      const { getFieldDecorator } = form;
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
          title={`${type === 'add' ? '新增' : '修改'}角色`}
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form {...formItemLayout}>
            <Form.Item label="角色名称">
              {getFieldDecorator('nickname', {
                rules: [{ required: true, message: '请输入角色名称!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="描述信息">
              {getFieldDecorator('groups', {
                rules: [{ required: true, message: '请输入角色名称!' }],
              })(<TextArea rows={4} />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);
