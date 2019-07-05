import React, { Component } from 'react';
import { Input, Button, Modal, Form, Select, Upload, Icon, Row, Col } from 'antd';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import styles from './MissionCare.less';

const FormItem = Form.Item;
const SelectOption = Select.Option;

@Form.create()
class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
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

  submitContent = async () => {
    // const htmlContent = this.state.editorState.toHTML()
  };

  handleEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    const {
      form: { getFieldDecorator },
      visible,
      handleCancel,
      handleOk,
      type,
      name,
      text,
      cover,
    } = this.props;
    let { fileList, editorState } = this.state;
    const { previewVisible, previewImage } = this.state;

    fileList = cover || [];
    editorState = BraftEditor.createEditorState(text || null);

    const formItemLayout1 = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const formItemLayout2 = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const formItemLayout3 = {
      labelCol: { span: 3 },
      wrapperCol: { span: 19 },
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Modal
        title="新建素材"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
        width={800}
        style={{ top: 15 }}
        // bodyStyle={{ height: 650, overflow: 'auto' }}
      >
        <Form onSubmit={handleOk}>
          <Row gutter={48}>
            <Col span={12}>
              <FormItem label="文字标题" {...formItemLayout1}>
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '请输入标题 !',
                    },
                  ],
                  initialValue: name,
                })(<Input placeholder="请输入" />)}
              </FormItem>

              <FormItem label="类型" {...formItemLayout1} className={styles.formItem}>
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择类型 !',
                    },
                  ],
                  initialValue: type,
                })(
                  <Select placeholder="请输入">
                    <SelectOption value="健康宣教">健康宣教</SelectOption>
                    <SelectOption value="活动通知">活动通知</SelectOption>
                    <SelectOption value="孕妇学校">孕妇学校</SelectOption>
                  </Select>
                )}
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="选择封面" {...formItemLayout2} className={styles.formItem}>
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
            <FormItem label="简介" {...formItemLayout3}>
              {getFieldDecorator('introduction', {
                rules: [
                  {
                    required: true,
                    message: '请填写简介 !',
                  },
                ],
                initialValue: editorState,
              })(<BraftEditor className={styles.richTextBox} onChange={this.handleEditorChange} />)}
            </FormItem>
          </Row>

          <FormItem wrapperCol={{ offset: 9 }}>
            <Button type="primary" onClick={handleCancel}>
              取消
            </Button>
            <Button htmlType="submit" type="primary" style={{ marginLeft: 40 }}>
              确定
            </Button>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default Material;
