import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, Modal, List, Card, Icon, Avatar, Button } from 'antd';

import styles from './Step1.less';

/**
 * 预览弹窗modal
 */

const lists = [
  {
    title: '中国传统节日',
    description: '根据农历日期自动调整时间',
    avatar: '',
    id: Math.random(),
  },
  {
    title: '24节气',
    description: '根据历法自动调整时间',
    avatar: '',
    id: Math.random(),
  },
  {
    title: '公众/国际节日',
    description: '可选择每年重复推送',
    avatar: '',
    id: Math.random(),
  },
];
const templateList = [
  {
    title: '春节',
    description: '华侨医院',
    avatar: '',
    id: Math.random(),
  },
  {
    title: '元宵',
    description: '华侨医院',
    avatar: '',
    id: Math.random(),
  },
  {
    title: '圣诞节',
    description: '华侨医院',
    avatar: '',
    id: Math.random(),
  },
];
export const PreviewModal = props => {
  const { dataSource, modalVisible, handleSelect, handleModalVisible, okText } = props;
  return (
    <Modal
      centered
      destroyOnClose
      title="模板预览"
      width={780}
      className={styles.modal}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      visible={modalVisible}
      onOk={() => (handleSelect && handleSelect(dataSource)) || handleModalVisible()}
      okText={okText}
      onCancel={() => handleModalVisible()}
    >
      <Form layout="horizontal" labelCol={{ xs: 4 }} wrapperCol={{ xs: 20 }}>
        <Form.Item label="传统假日">
          <u>春节</u>
        </Form.Item>
        <Form.Item label="关怀推送时间">
          节日<u>当天</u>
        </Form.Item>
        <Form.Item label="是否重复">
          <u>仅一次，不重复发送</u>
        </Form.Item>
        <Form.Item label="提示文字">
          <u>祝您节日快乐</u>
        </Form.Item>
        <Form.Item label="发送媒介">
          <u>微信</u>
        </Form.Item>
      </Form>
    </Modal>
  );
};

/**
 * 主页面内容
 */
@connect(({ global, step1 }) => ({
  global,
  selectedTags: step1.selectedTags,
  secondaryCategory: step1.secondaryCategory,
}))
class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTemplate: false,
      modalVisible: false,
      currentTemplate: {},
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'step1/query',
    // });
  }

  // 选择标签
  handleTags = (target, checkedTag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'step1/updateTags',
      payload: {
        target,
        checkedTag,
      },
    });
  };

  onSearch = () => {
    // console.log('onSearch', value);
  };

  // 选择模板事件
  onClick = value => {
    this.setState({
      showTemplate: true,
      currentTemplate: value,
    });
    // console.log('card onClick', value)
  };

  onTemplateClick = () => {
    this.handleModalVisible(true);
  };

  // 移除tag标签
  handleTagRemove = removedTag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'step1/removeTag',
      payload: removedTag,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleSelect = () => {
    this.handleModalVisible();
    // console.log('template handleSelect', currentTemplate);
    router.push('/concern-management/festival-concern/create/step2');
  };

  render() {
    const { currentTemplate, modalVisible, showTemplate } = this.state;
    const { loading } = this.props;

    return (
      <div className={styles.step1}>
        {!showTemplate ? (
          // 选择随访任务类型
          <>
            <List
              rowKey="id"
              style={{ marginTop: 24 }}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              loading={loading}
              dataSource={lists}
              renderItem={item => (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    bodyStyle={{ paddingBottom: 20 }}
                    onClick={() => this.onClick(item)}
                  >
                    <Card.Meta
                      style={{ cursor: 'pointer' }}
                      avatar={<Avatar size="small" src={item.avatar} />}
                      title={item.title}
                      description={item.description}
                    />
                  </Card>
                </List.Item>
              )}
            />
          </>
        ) : (
          // 选择随访任务模板
          <>
            <h3>推荐模板</h3>
            <List
              rowKey="id"
              style={{ marginTop: 24 }}
              grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
              loading={loading}
              dataSource={['', ...templateList]}
              renderItem={item =>
                item ? (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      bodyStyle={{ paddingBottom: 20 }}
                      onClick={() => this.onTemplateClick(item)}
                    >
                      <Card.Meta
                        style={{ cursor: 'pointer' }}
                        avatar={<Avatar size="small" src={item.avatar} />}
                        title={item.title}
                        description={item.description}
                      />
                    </Card>
                  </List.Item>
                ) : (
                  <List.Item>
                    <Button
                      type="dashed"
                      className={styles.newButton}
                      onClick={() => this.handleSelect()}
                    >
                      <Icon type="plus" /> 新建模板
                    </Button>
                  </List.Item>
                )
              }
            />
            <PreviewModal
              okText="使用该模板"
              modalVisible={modalVisible}
              dataSource={currentTemplate}
              handleSelect={this.handleSelect}
              handleModalVisible={this.handleModalVisible}
            />
          </>
        )}
      </div>
    );
  }
}

export default Form.create()(Step1);
