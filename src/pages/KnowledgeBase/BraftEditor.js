/*
 * @Description: 富文本编辑器组建
 * @Author: Zhong Jun
 * @Date: 2019-07-04 14:54:42
 */
import React, { Component } from 'react';
import Editor from 'braft-editor';
import styles from './BraftEditor.less';
import 'braft-editor/dist/index.css';

class BraftEditor extends Component {
  state = {
    editorState: Editor.createEditorState(''), // 设置编辑器初始内容
    outputHTML: '<p></p>',
  };

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 1000);
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = editorState => {
    this.setState({
      editorState,
      outputHTML: editorState.toHTML(),
    });
  };

  setEditorContentAsync = () => {
    const { html } = this.props;
    if (this.isLivinig) {
      this.setState({
        editorState: Editor.createEditorState(html),
      });
    }
  };

  render() {
    const { editorState, outputHTML } = this.state;
    const { onSave = () => {}, onBack = () => {} } = this.props;

    const extendControls = [
      {
        key: 'goback',
        type: 'button',
        text: '返回',
        onClick: onBack,
      },
      {
        key: 'onSave',
        type: 'button',
        className: 'ant-btn ant-btn-primary ant-btn-sm',
        text: '保存',
        onClick: () => onSave(outputHTML),
      },
    ];

    return (
      <div className={styles.wrapper}>
        <Editor
          extendControls={extendControls}
          value={editorState}
          onChange={this.handleChange}
          onSave={() => onSave(outputHTML)}
        />
      </div>
    );
  }
}

export default BraftEditor;
