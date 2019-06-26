import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MissionCareComponent from '@/components/FollowupConfiguration/MissionCare';

import { Input, Button, Modal, Form, Select, Upload } from 'antd';

const FormItem = Form.Item;
const SelectOpion = Select.Option;

@Form.create()
class MissionCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleFormSubmit = value => {
    console.log(value);
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { visible } = this.state;

    const mainSearch = (
      <div style={{ textAlign: 'center', marginBottom: 25 }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
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
        <Modal title="新建素材" visible={visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form>
            <FormItem label="文字标题">
              {getFieldDecorator('title', {
                rules: [{ require: true }],
              })(<Input placeholder="请输入" />)}
            </FormItem>
            <FormItem label="类型">
              {getFieldDecorator('type', {
                rules: [{ require: true }],
              })(
                <Select placeholder="请输入">
                  <SelectOpion value="select1">select1</SelectOpion>
                  <SelectOpion value="select2">select2</SelectOpion>
                  <SelectOpion value="select3">select3</SelectOpion>
                </Select>
              )}
            </FormItem>
            <FormItem label="选择封面">
              {getFieldDecorator('cover', {
                rules: [{ require: true }],
              })(<Upload />)}
            </FormItem>
            <FormItem label="简介">
              {getFieldDecorator('introduction', {
                rules: [{ require: true }],
              })(<Input.TextArea palceholder="请输入" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );

    return (
      <PageHeaderWrapper title="搜索列表" content={mainSearch}>
        <MissionCareComponent />
      </PageHeaderWrapper>
    );
  }
}

export default MissionCare;
