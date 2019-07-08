import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

import { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

@connect(({ loading, marketLists }) => ({
  loading: loading.models.marketLists,
  lists: marketLists.lists,
  tabActiveKey: marketLists.tabActiveKey,
}))
class FollowupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, tabActiveKey } = this.props;
    dispatch({
      type: 'marketLists/query',
      payload: {
        status: tabActiveKey,
      },
    });
  }

  handleTabChange = key => {
    console.log(key);
  };

  handleFormSubmit = value => {
    console.log(value);
  };

  onDetailClick = e => {
    router.push(`/followup-management/task-lists/table/${e.id}`);
  };

  onChartClick = e => {
    router.push(`/followup-management/task-lists/chart/${e.id}`);
  };

  // 选择标签
  handleTags = (target, checkedTag) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'marketLists/updateTags',
      payload: {
        target,
        checkedTag,
      },
    });
  };

  handleTagClose = removedTag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'marketLists/removeTag',
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

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a href="#">1、Option1</a>
        </Menu.Item>
        <Menu.Item>
          <a href="#">2、Option2</a>
        </Menu.Item>
        <Menu.Item>
          <a href="h#">3、Option3</a>
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
      <Button type="primary" icon="plus" onClick={() => router.push('#')}>
        新建
      </Button>
    );

    const CardInfo = ({ date, period }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>活动日期</p>
          <p>{date}</p>
        </div>
        <div>
          <p>保留期</p>
          <p>{period}天</p>
        </div>
      </div>
    );

    const { loading, lists, tabActiveKey } = this.props;
    console.log({ loading, lists, tabActiveKey });

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
                bodyStyle={{ padding: 0 }}
                actions={[
                  <Tooltip title="编辑">
                    <Icon type="edit" onClick={() => this.onDetailClick(item)} />
                  </Tooltip>,
                  <Tooltip title="统计">
                    <Icon type="line-chart" onClick={() => this.onChartClick(item)} />
                  </Tooltip>,
                  <Tooltip title="列表">
                    <Icon type="ordered-list" />
                  </Tooltip>,
                  <Dropdown overlay={itemMenu}>
                    <Icon type="ellipsis" />
                  </Dropdown>,
                ]}
                extra={
                  item.state.code === 'running' ? (
                    <p style={{ color: '#0096FA' }}>{item.state.dec}</p>
                  ) : (
                    <p>{item.state.dec}</p>
                  )
                }
                title={item.title}
              >
                <CardInfo date={item.date} period={item.period} />
              </Card>
            </List.Item>
          )}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(FollowupManagement);
