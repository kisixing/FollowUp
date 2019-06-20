/*
 * @Description: 随访任务列表
 * @Author: jun
 * @Date: 2019-06-20 10:37:47
 */

import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';

import  { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Avatar, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './Lists.less';

@connect(({ global, followupLists }) => ({
  global,
  lists: followupLists.lists,
}))
class FollowupManagement extends Component {
  constructor (props) {
    super(props);
    this.state = {
      tabActiveKey: 'all',
    }
  }

  handleTabChange = key => {
    this.setState({ tabActiveKey: key });
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };

  cardClick = (e) => {
    const { match } = this.props;
    router.push(`/followup-management/lists/${e.id}`);
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
            1st alipay
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2nd taobao
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3d tmall
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
      <Button type="primary" icon="plus" size="small" style={{ lineHeight: 1 }}>新建</Button>
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

    const {
      loading,
      form,
      lists,
    } = this.props;
    const { getFieldDecorator } = form;
    const { tabActiveKey } = this.state;

    return (
      <PageHeaderWrapper
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
              <StandardFormRow title="您选择的类目" block style={{ paddingBottom: 11 }}>

              </StandardFormRow>
              <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  {getFieldDecorator('category')(
                    <TagSelect expandable actionsText={actionsTextMap}>
                      <TagSelect.Option value="cat1">科室随访</TagSelect.Option>
                      <TagSelect.Option value="cat2">专项随访</TagSelect.Option>
                      <TagSelect.Option value="cat3">关怀类随访</TagSelect.Option>
                      <TagSelect.Option value="cat4">管理类随访</TagSelect.Option>
                      <TagSelect.Option value="cat5">科研随访</TagSelect.Option>
                    </TagSelect>
                  )}
                </Form.Item>
              </StandardFormRow>
              <StandardFormRow title="二级类目" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  {getFieldDecorator('secondaryCategory')(
                    <TagSelect expandable actionsText={actionsTextMap}>
                      <TagSelect.Option value="cat001">高危妊娠管理</TagSelect.Option>
                      <TagSelect.Option value="cat002">妊娠糖尿病管理</TagSelect.Option>
                      <TagSelect.Option value="cat003">妊娠高血压管理</TagSelect.Option>
                      <TagSelect.Option value="cat004">产后随访</TagSelect.Option>
                      <TagSelect.Option value="cat005">术后随访</TagSelect.Option>
                    </TagSelect>
                  )}
                </Form.Item>
              </StandardFormRow>
            </Form>
          </Card>
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            loading={loading}
            dataSource={lists}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  // hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="下载">
                      <Icon type="download" />
                    </Tooltip>,
                    <Tooltip title="编辑">
                      <Icon type="edit" />
                    </Tooltip>,
                    <Tooltip title="分享">
                      <Icon type="share-alt" />
                    </Tooltip>,
                    <Dropdown overlay={itemMenu}>
                      <Icon type="ellipsis" />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    style={{ cursor: 'pointer'}}
                    onClick={() => this.cardClick(item)}
                    avatar={<Avatar size="small" src={item.avatar} />}
                    title={<div>{item.title} <span className={styles.status}>{item.status.dec}</span></div>}
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
    )
  }
}

export default Form.create()(FollowupManagement);
