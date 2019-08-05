import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Input, Button } from 'antd';
import MissionCareComponent from './MissionCare/MissionCareComponent';
import Material from './MissionCare/Material';

class MissionCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleOk = e => {
    e.preventDefault();
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    const mainSearch = (
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          // onSearch={}
          style={{ maxWidth: 522, width: '100%' }}
        />
        <Button
          style={{ float: 'right' }}
          type="primary"
          icon="plus"
          size="large"
          onClick={() => this.setState({ visible: true })}
        >
          新建材料
        </Button>
        <Material visible={visible} handleCancel={this.handleCancel} handleOk={this.handleOk} />
      </div>
    );

    return (
      <PageHeaderWrapper content={mainSearch}>
        <MissionCareComponent />
      </PageHeaderWrapper>
    );
  }
}

export default MissionCare;
