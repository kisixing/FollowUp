import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Form, Modal, List, Card, Input, Icon, Avatar, Button, Tag, Timeline } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';

import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import WechatCard from '@/components/WechatCard';
import { getObjectValues } from '@/utils/utils';

import styles from './Step1.less';

/**
 * 预览弹窗modal
 */
const PreviewModal = props => {
  const { dataSource, modalVisible, handleSelect, handleModalVisible } = props;
  return (
    <Modal
      centered
      destroyOnClose
      title="模板预览"
      width={780}
      className={styles.modal}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
      visible={modalVisible}
      onOk={() => handleSelect(dataSource)}
      okText="使用该模板"
      onCancel={() => handleModalVisible()}
    >
      <Timeline style={{ paddingLeft: '24px' }}>
        <Timeline.Item color="green">
          <p>预约日期 之后 1天 发送微信</p>
          <WechatCard />
          <div>
            点击转链接:
            <Button type="link" style={{ fontSize: '12px' }}>
              预约挂号页面
            </Button>
          </div>
        </Timeline.Item>
        <Timeline.Item color="green">
          <p>预约日期 之后 5天 发送短信</p>
          <div className={styles.sms}>
            【暨南大学第一附属医院】
            张女士，您好！距离约定的产检时间已经过去4天了，为了您与宝宝的健康，请尽快来院产检，并点击t.cn/Aj9IqeTy填写回执，谢谢！
          </div>
          <div>
            点击转链接:
            <Button type="link" style={{ fontSize: '12px' }}>
              复诊超时回执问卷
            </Button>
          </div>
        </Timeline.Item>
        <Timeline.Item color="red">
          <p>预约日期之后 7天</p>
          <div>进入人工管理模式，可通过电话随访并记录随访内容</div>
        </Timeline.Item>
        <Timeline.Item>
          <p>随访统计</p>
        </Timeline.Item>
      </Timeline>
    </Modal>
  );
};

/**
 * 主页面内容
 */
@connect(({ global, step1 }) => ({
  global,
  selectedTags: step1.selectedTags,
  lists: step1.lists,
  category: step1.category,
  secondaryCategory: step1.secondaryCategory,
  templateList: step1.templateList,
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
    const { dispatch } = this.props;
    dispatch({
      type: 'step1/query',
    });
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
    router.push('/satisfaction-management/satisfaction-lists/create/step2');
  };

  render() {
    const { currentTemplate, modalVisible, showTemplate } = this.state;
    const { loading, selectedTags, lists, templateList, category, secondaryCategory } = this.props;

    const actionsTextMap = {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    };

    /**
     * map 已选择的tags标签
     * @param {array} tags 已选择的tag标签
     */
    const selectedTagsMap = tags => {
      const tagChild = tags.map(tag => (
        <span key={tag} style={{ display: 'inline-block' }}>
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleTagRemove(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      ));
      return tagChild;
    };

    const tagOptionsMap = options => {
      const tagChild = options.map(tag => (
        <TagSelect.Option key={tag} value={tag}>
          {tag}
        </TagSelect.Option>
      ));
      return tagChild;
    };

    return (
      <div className={styles.step1}>
        {!showTemplate ? (
          // 选择随访任务类型
          <>
            <Form layout="inline">
              <Form.Item className={styles.searchItem}>
                <Input.Search
                  placeholder="请输入..."
                  enterButton="搜索"
                  style={{ width: 400 }}
                  onSearch={this.onSearch}
                />
              </Form.Item>
              <StandardFormRow title="已选类目" block style={{ paddingBottom: 11 }}>
                <div style={{ lineHeight: '32px', marginLeft: '-8px' }}>
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: 'from',
                      duration: 100,
                      onComplete: e => {
                        e.target.style = '';
                      },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                  >
                    {selectedTagsMap(getObjectValues(selectedTags).filter(e => e !== ''))}
                  </TweenOneGroup>
                </div>
              </StandardFormRow>
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  <TagSelect
                    radio
                    expandable
                    hideCheckAll
                    value={[selectedTags.category]}
                    onChange={tags => this.handleTags('category', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(category.map(e => e.name))}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
              <StandardFormRow title="二级类目" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  <TagSelect
                    radio
                    expandable
                    hideCheckAll
                    value={[selectedTags.secondaryCategory]}
                    onChange={tags => this.handleTags('secondaryCategory', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(secondaryCategory)}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
            </Form>

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
                        description={item.hospital}
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
