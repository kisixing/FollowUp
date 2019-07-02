import React, { Component } from 'react';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Input, Button, Modal, Form, Select, Upload, Icon, Row, Col } from 'antd';
import MissionCareComponent from './MissionCareComponent';

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
        // {
        //   uid: '-1',
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ],
      editorState: BraftEditor.createEditorState(null),
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
    this.setState({ fileList });
  };

  handleOk = e => {
    e.preventDefault();
    this.setState({ visible: false });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  submitContent = async () => {
    // const htmlContent = this.state.editorState.toHTML()
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, fileList, previewVisible, previewImage, editorState } = this.state;

    const formItemLayout1 = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const formItemLayout2 = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

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
        <Modal
          title="新建素材"
          visible={visible}
          footer={null}
          onCancel={this.handleCancel}
          width={800}
          style={{ top: 15 }}
        >
          <Form onSubmit={this.handleOk} {...formItemLayout1}>
            <Row gutter={48}>
              <Col span={16}>
                <FormItem label="文字标题">
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        message: '请输入标题 !',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </FormItem>

                <FormItem label="类型">
                  {getFieldDecorator('type', {
                    rules: [
                      {
                        required: true,
                        message: '请选择类型 !',
                      },
                    ],
                  })(
                    <Select placeholder="请输入">
                      <SelectOption value="select1">Option 1</SelectOption>
                      <SelectOption value="select2">Option 2</SelectOption>
                      <SelectOption value="select3">Option 3</SelectOption>
                    </Select>
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
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
                <Modal visible={previewVisible} footer={null} onCancel={this.coverCancel}>
                  <img alt="封面" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Col>
            </Row>

            <Row>
              <FormItem label="简介" {...formItemLayout2}>
                {getFieldDecorator('introduction', {
                  rules: [
                    {
                      required: true,
                      message: '请填写简介 !',
                    },
                  ],
                  initialValue: editorState,
                })(
                  <BraftEditor
                    onChange={this.handleEditorChange}
                    style={{ border: '2px ridge ' }}
                  />
                )}
              </FormItem>
            </Row>

            <FormItem wrapperCol={{ offset: 10 }}>
              <Button type="primary" onClick={this.handleCancel}>
                取消
              </Button>
              <Button htmlType="submit" type="primary" style={{ marginLeft: 20 }}>
                确定
              </Button>
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
