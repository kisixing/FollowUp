/*
 * @Description: 富文本修改页面
 * @Author: Zhong Jun
 * @Date: 2019-07-04 18:43:43
 */
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './styles.less';

import BraftEditor from './BraftEditor';

class UpdatePage extends PureComponent {
  state = {
    html: '',
  };

  componentDidMount() {
    const {
      location: { query },
    } = this.props;
    const { article } = query;
    this.setState({
      html: article.content,
    });
  }

  render() {
    const { html } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <BraftEditor html={html} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default UpdatePage;
