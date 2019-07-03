import React, { Component } from 'react';
import Link from 'umi/link';

import { Card, Form, Table } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';

import StandardFormRow from '@/components/StandardFormRow';
import TagSelect from '@/components/TagSelect';
import Material from './Material';
import Preview from './Preview';

import styles from '../Questionnaire.less';

const data = [
  {
    key: 1,
    type: '健康宣教',
    name: '妊娠糖尿病饮食建议',
    time: '2019-06-22',
    nums: 2,
    task: '妊娠糖尿病随访管理',
  },
  {
    key: 2,
    type: '活动通知',
    name: '无痛分娩讲座通知',
    time: '2019-06-22',
    nums: 0,
    task: '-',
  },
  {
    key: 3,
    type: '孕妇学校',
    name: '胎动计数',
    time: '2019-06-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 4,
    type: '孕妇学校',
    name: ' 妊娠期体重控制',
    time: '2019-05-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 5,
    type: '孕妇学校',
    name: ' 呼吸法课程',
    time: '2019-04-09',
    nums: 2,
    task: '孕妇学校通知、晚期孕期...',
  },
  {
    key: 6,
    type: '健康宣教',
    name: '妊娠糖尿病饮食建议',
    time: '2019-06-22',
    nums: 2,
    task: '妊娠糖尿病随访管理',
  },
  {
    key: 7,
    type: '活动通知',
    name: '无痛分娩讲座通知',
    time: '2019-06-22',
    nums: 0,
    task: '-',
  },
  {
    key: 8,
    type: '孕妇学校',
    name: '胎动计数',
    time: '2019-06-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 9,
    type: '孕妇学校',
    name: ' 妊娠期体重控制',
    time: '2019-05-13',
    nums: 1,
    task: '孕妇学校通知',
  },
  {
    key: 10,
    type: '孕妇学校',
    name: ' 呼吸法课程',
    time: '2019-04-09',
    nums: 2,
    task: '孕妇学校通知、晚期孕期...',
  },
];

const FormItem = Form.Item;

@Form.create()
class MissionCareComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
    };
  }

  handleOk = e => {
    e.preventDefault();
    this.setState({ visible: false });
  };

  handleCancel = type => {
    switch (type) {
      case 'material':
        this.setState({ visible: false });
        break;
      case 'preview':
        this.setState({ previewVisible: false });
        break;
      default:
    }
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, previewVisible, type, name } = this.state;

    const actionsTextMap = {
      expandText: <FormattedMessage id="component.tagSelect.expand" defaultMessage="Expand" />,
      collapseText: (
        <FormattedMessage id="component.tagSelect.collapse" defaultMessage="Collapse" />
      ),
      selectAllText: <FormattedMessage id="component.tagSelect.all" defaultMessage="All" />,
    };

    const category = [
      {
        id: 2,
        title: '健康宣教',
      },
      {
        id: 3,
        title: '高危宣教',
      },
      {
        id: 4,
        title: '活动通知',
      },
      {
        id: 5,
        title: '孕妇学校',
      },
      {
        id: 6,
        title: '临时宣教',
      },
    ];
    const secondary = [
      {
        id: 2,
        title: '已绑定任务',
      },
      {
        id: 3,
        title: '未绑定任务',
      },
    ];

    const columns = [
      {
        title: 'No.',
        dataIndex: 'key',
      },
      {
        title: '素材类型',
        dataIndex: 'type',
      },
      {
        title: '素材名称',
        dataIndex: 'name',
      },
      {
        title: '更新时间',
        dataIndex: 'time',
      },
      {
        title: '绑定任务数',
        dataIndex: 'nums',
        // sorter: (a, b) => a.age - b.age,
      },
      {
        title: '绑定的任务',
        dataIndex: 'task',
      },
      {
        title: '操作',
        render: (text, record) => (
          <div className={styles.actions}>
            <span
              onClick={() =>
                this.setState({
                  visible: true,
                  type: record.type,
                  name: record.name,
                })
              }
            >
              编辑
            </span>
            <span onClick={() => this.setState({ previewVisible: true })}>预览 </span>
            <Link to="#">推送测试 </Link>
            <Link to="#" className={styles.cancel}>
              删除
            </Link>
          </div>
        ),
      },
    ];

    return (
      <div className={styles.filterCardList}>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {category.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="二级分类" block last>
              <FormItem>
                {getFieldDecorator('secondary')(
                  <TagSelect expandable actionsText={actionsTextMap}>
                    {secondary.map(item => (
                      <TagSelect.Option key={item.id} value={item.id}>
                        {item.title}
                      </TagSelect.Option>
                    ))}
                  </TagSelect>
                )}
              </FormItem>
            </StandardFormRow>
          </Form>
        </Card>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={data}
          pagination={{
            size: 'small',
            total: 54,
            pageSize: 10,
            showSizeChanger: true,
            // onShowSizeChange={ this.onShowSizeChange }
            showQuickJumper: true,
            // onChange: this.onChange,
            showTotal: total => `总记录数${total}/总页数:${Math.ceil(total / 10)}`,
          }}
        />
        <Material
          visible={visible}
          handleCancel={() => this.handleCancel('material')}
          handleOk={this.handleOk}
          type={type}
          name={name}
        />
        <Preview visible={previewVisible} handleCancel={() => this.handleCancel('preview')} />
      </div>
    );
  }
}

export default MissionCareComponent;
