/*
 * @Description: 富文本编辑器组建
 * @Author: Zhong Jun
 * @Date: 2019-07-04 14:54:42
 */
import React, { Component } from 'react';
import Editor from 'braft-editor';
import 'braft-editor/dist/index.css';

class BraftEditor extends Component {
  state = {
    editorState: Editor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    outputHTML: '<p></p>',
  };

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000);
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
    if (this.isLivinig) {
      this.setState({
        editorState: Editor.createEditorState('<p>你好，<b>世界!</b><p>'),
      });
    }
  };

  render() {
    const { editorState, outputHTML } = this.state;

    return (
      <div>
        <div className="editor-wrapper">
          <Editor value={editorState} onChange={this.handleChange} />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </div>
    );
  }
}

export default BraftEditor;
