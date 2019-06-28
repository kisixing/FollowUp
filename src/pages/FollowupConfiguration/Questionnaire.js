import React, { Component } from 'react';
import router from 'umi/router';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Input, Button } from 'antd';
import { router } from 'umi';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'All',
    };
  }

  componentWillMount() {
    import(`@/components/FollowupConfiguration/Questionnaire/All`)
      .then(module => {
        this.setState({ children: <module.default /> })
      })
  };

  handleTabChange = tabActiveKey => {
    this.setState({ tabActiveKey });
    import(`@/components/FollowupConfiguration/Questionnaire/${tabActiveKey}`)
      .then(module =>
        this.setState({ children: <module.default /> })
      )
  };

  // handleFormSubmit = value => {
  // console.log(value);
  // };

  render() {
    const { tabActiveKey, children } = this.state;

    const tabList = [
      {
        key: 'All ',
        tab: '全部',
      },
      {
        key: 'Running',
        tab: '运行中',
      },
      {
        key: 'Pause',
        tab: '暂停',
      },
      {
        key: 'Draft',
        tab: '草稿箱',
      },
      {
        key: 'Recycle',
        tab: '回收箱',
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

    const tabBarExtraContent = (
      <Button
        type="primary"
        icon="plus"
        onClick={() => router.push('/followup-configuration/questionnaire/create')}
      >
        新建
        </Button>
    )

    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        // onTabChange={this.handleTabChange}
        tabBarExtraContent={tabBarExtraContent}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Questionnaire;
