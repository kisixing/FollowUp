import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { Input } from 'antd';

class Medium extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'All',
    };
  }

  componentWillMount() {
    import(`./Medium/All`).then(module => {
      this.setState({ children: <module.default /> });
    });
  }

  handleTabChange = tabActiveKey => {
    this.setState({ tabActiveKey });
    import(`./Medium/${tabActiveKey}`).then(module =>
      this.setState({ children: <module.default /> })
    );
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  render() {
    const tabList = [
      {
        key: 'All ',
        tab: '全部',
      },
      {
        key: 'Department',
        tab: '科室随访',
      },
      {
        key: 'Special',
        tab: '专项随访',
      },
      {
        key: 'Care',
        tab: '关怀类随访',
      },
      {
        key: 'Management',
        tab: '管理类随访',
      },
      {
        key: 'Research',
        tab: '科研随访',
      },
    ];

    const mainSearch = (
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const { tabActiveKey, children } = this.state;

    return (
      <PageHeaderWrapper
        content={mainSearch}
        tabList={tabList}
        tabActiveKey={tabActiveKey}
        // onTabChange={this.handleTabChange}
      >
        {children}
      </PageHeaderWrapper>
    );
  }
}

export default Medium;
