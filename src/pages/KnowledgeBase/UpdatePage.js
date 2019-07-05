/* eslint-disable no-console */
/*
 * @Description: 富文本修改页面
 * @Author: Zhong Jun
 * @Date: 2019-07-04 18:43:43
 */
import React, { PureComponent } from 'react';
import router from 'umi/router';
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

  onBack = () => {
    router.push('/knowledge/nursing');
  };

  onSave = value => {
    console.log('update', value);
  };

  render() {
    const { html } = this.state;
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <BraftEditor html={html} onBack={this.onBack} onSave={this.onSave} />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default UpdatePage;
