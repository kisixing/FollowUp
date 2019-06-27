import React, { Component } from 'react';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MissionCareComponent from '@/components/FollowupConfiguration/MissionCare';

import { Input, Button, Modal, Form, Select, Upload, Icon, Row, Col } from 'antd';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class MissionCare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ],
    };
  }

  coverCancel = () => this.setState({ previewVisible: false });

  coverPreview = async file => {
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  coverChange = ({ fileList }) => {
    this.setState({ fileList })
  };

  handleOk = (e) => {
    e.preventDefault()
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { visible, fileList, previewVisible, previewImage } = this.state;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 13 },
    }


    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
        <Modal title="新建素材" visible={visible} footer={null} onCancel={this.handleCancel}>
          <Form
            onSubmit={this.handleOk}
            {...formItemLayout}
          >
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
                  <SelectOption value="select1">Option 1</SelectOption>
                  <SelectOption value="select2">Option 2</SelectOption>
                  <SelectOption value="select3">Option 3</SelectOption>
                </Select>
              )}
            </FormItem>

            <FormItem label="选择封面">
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.coverPreview}
                onChange={this.coverChange}
              >
                {fileList.length === 0 && uploadButton}
              </Upload>
            </FormItem>
            <Modal visible={previewVisible} footer={null}
              onCancel={this.coverCancel}
            >
              <img alt="封面" style={{ width: '100%' }} src={previewImage} />
            </Modal>

            <FormItem label="简介">
              {getFieldDecorator('introduction', {
                rules: [{ require: true }],
              })(<Input.TextArea
                autosize={{ minRows: 3 }}
              />)}
            </FormItem>

            <FormItem wrapperCol={{ offset: 6 }}>
              <Button type="primary" onClick={this.handleCancel}>
                取消
                  </Button>
              <Button htmlType="submit" type="primary" style={{ marginLeft: 20 }}>
                确定
                  </Button>
            </FormItem>
          </Form>
        </Modal>
      </div >
    );

    return (
      <PageHeaderWrapper title="搜索列表" content={mainSearch}>
        <MissionCareComponent />
      </PageHeaderWrapper>
    );
  }
}

export default MissionCare;
