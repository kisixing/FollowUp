import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import All from '@/components/FollowupConfiguration/Questionnaire/All';
import { Input } from 'antd';

class Questionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'All',
    };
  }

  // componentWillMount() {
  //   import('./Questionnaire/All').then(module => {
  //     let children = module.default
  //     console.log(children)
  //     // this.setState({ children: module.All })
  //   })
  // }

  handleTabChange = tabActiveKey => {
    this.setState({ tabActiveKey });
  };

  // handleFormSubmit = value => {
  // console.log(value);
  // };

  render() {
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

    const { tabActiveKey } = this.state;

    return (
      <PageHeaderWrapper
        title="搜索列表"
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <All />
      </PageHeaderWrapper>
    );
  }
}

export default Questionnaire;
