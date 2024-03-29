/* eslint-disable no-console */
/*
 * @Description: 随访任务列表
 * @Author: jun
 * @Date: 2019-06-20 10:37:47
 */

import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

import { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Button, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import { getObjectValues } from '@/utils/utils';

import styles from './index.less';

// const category = ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'];
// const secondaryCategory = [
//   '高危妊娠孕妇复诊管理',
//   '妊娠糖尿病孕妇管理',
//   '产后随访',
//   '无创基因检查随访',
//   'OGTT异常随访',
//   '节日问候',
//   '生日问候',
//   '三伏天通知',
//   '新生儿疾病护理讲座通知',
//   '可是满意度',
//   '投诉建议',
//   '妊娠期体重管理与巨大儿',
//   '妊娠糖尿病产后病情发展',
// ];

@connect(({ global, loading, followupLists }) => ({
  global,
  loading: loading.effects['followupLists/query'],
  selectedTags: followupLists.selectedTags,
  lists: followupLists.lists,
  category: followupLists.category,
  secondaryCategory: followupLists.secondaryCategory,
  tabActiveKey: followupLists.tabActiveKey,
  departments: followupLists.departments,
}))
class FollowupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, selectedTags, tabActiveKey } = this.props;
    dispatch({
      type: 'followupLists/query',
      payload: {
        status: tabActiveKey,
        type: selectedTags.category,
        secondaryType: selectedTags.secondaryCategory,
      },
    });
  }

  handleTabChange = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'followupLists/query',
      payload: {
        status: key,
      },
    });
  };

  handleFormSubmit = value => {
    console.log(value);
  };

  onDetailClick = e => {
    // const { match } = this.props;
    router.push(`/followup-management/task-lists/table/${e.id}`);
  };

  onChartClick = e => {
    router.push(`/followup-management/task-lists/chart/${e.id}`);
  };

  onEdit = () => {
    router.push(`/followup-management/create/step3`);
  };

  // 选择标签
  handleTags = (target, checkedTag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'followupLists/updateTags',
      payload: {
        target,
        checkedTag,
      },
    });
  };

  handleTagClose = removedTag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'followupLists/removeTag',
      payload: removedTag,
    });
  };

  render() {
    const tabList = [
      {
        key: 'all',
        tab: '全部',
      },
      {
        key: 'running',
        tab: '运行中',
      },
      {
        key: 'pause',
        tab: '暂停',
      },
      {
        key: 'drafts',
        tab: '草稿箱',
      },
      {
        key: 'recycled',
        tab: '回收站',
      },
    ];

    const actionsTextMap = {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1、推荐 alipay
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2、推荐 taobao
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3、推荐 tmall
          </a>
        </Menu.Item>
      </Menu>
    );

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const tabBarExtraContent = (
      <Button type="primary" icon="plus" onClick={() => router.push('/followup-management/create')}>
        新建
      </Button>
    );

    const CardInfo = ({ all, today }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>随访患者</p>
          <p>{all}</p>
        </div>
        <div>
          <p>今日随访</p>
          <p>{today}</p>
        </div>
      </div>
    );

    const tagsMap = tags => {
      const tagChild = tags.map(tag => (
        <span key={tag} style={{ display: 'inline-block' }}>
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleTagClose(tag);
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

    const {
      loading,
      selectedTags,
      lists,
      category,
      // secondaryCategory,
      tabActiveKey,
      departments,
    } = this.props;

    return (
      <PageHeaderWrapper
        wrapperClassName={styles.wrapper}
        title="随访任务列表"
        content={mainSearch}
        tabList={tabList}
        tabBarExtraContent={tabBarExtraContent}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.content}>
          <Card>
            <Form layout="inline">
              <StandardFormRow title="已选类目" block style={{ paddingBottom: 11 }}>
                <div style={{ lineHeight: '32px' }}>
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
                    {tagsMap(getObjectValues(selectedTags).filter(e => e !== ''))}
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
                    value={[selectedTags.departments]}
                    onChange={tags => this.handleTags('departments', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(departments)}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
            </Form>
          </Card>
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1 }}
            loading={loading}
            dataSource={lists}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="随访列表">
                      <Icon type="ordered-list" onClick={() => this.onDetailClick(item)} />
                    </Tooltip>,
                    <Tooltip title="图表分析">
                      <Icon type="line-chart" onClick={() => this.onChartClick(item)} />
                    </Tooltip>,
                    <Tooltip title="编辑">
                      <Icon type="edit" onClick={() => this.onEdit(item)} />
                    </Tooltip>,
                    <Dropdown overlay={itemMenu}>
                      <Icon type="ellipsis" />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    style={{ cursor: 'pointer' }}
                    // avatar={<Avatar size="small" src={item.avatar} />}
                    title={
                      <div>
                        {item.title} <span className={styles.status}>{item.status.dec}</span>
                      </div>
                    }
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo all={item.allFollowup} today={item.todayFollowup} />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(FollowupManagement);
