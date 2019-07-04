/* eslint-disable no-console */

import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

import { Form, List, Card, Input, Avatar, Statistic } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './index.less';

@connect(({ global }) => ({
  global,
}))
class FollowupManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'all',
      lists: ['预约挂号跟踪', '住院预约跟踪', 'B超预约跟踪', '住院预约跟踪'].map(_ => ({
        title: _,
        status: {
          dec: '进行中',
          code: 'running',
        },
        all: +Math.random()
          .toString()
          .slice(12),
        id: Math.random(),
      })),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { tabActiveKey } = this.state;
    dispatch({
      type: 'followupLists/query',
      payload: {
        status: tabActiveKey,
      },
    });
  }

  handleTabChange = key => {
    this.setState({ tabActiveKey: key, loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500);
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
    router.push(`/satisfaction-management/satisfaction-lists/table/${e.id}`);
  };

  onChartClick = e => {
    router.push(`/satisfaction-management/satisfaction-lists/chart/${e.id}`);
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
    ];

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

    const CardInfo = ({ all }) => (
      <div className={styles.cardInfo}>
        <Statistic title="今日跟踪任务" value={all} />
      </div>
    );

    const { tabActiveKey, lists, loading } = this.state;
    const dataSource = lists.filter(_ => tabActiveKey === 'all' || _.status.code === tabActiveKey);
    return (
      <PageHeaderWrapper
        wrapperClassName={styles.wrapper}
        title="列表搜索"
        content={mainSearch}
        tabList={tabList}
        // tabBarExtraContent={tabBarExtraContent}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.content}>
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1 }}
            loading={loading}
            dataSource={dataSource}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  onClick={() => router.push('/appointment-tracking/edit')}
                >
                  <Card.Meta
                    style={{ cursor: 'pointer' }}
                    avatar={<Avatar size="small" src={item.avatar} />}
                    title={
                      <div>
                        {item.title} <span className={styles.status}>{item.status.dec}</span>
                      </div>
                    }
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo all={item.all} today={item.todayFollowup} />
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
