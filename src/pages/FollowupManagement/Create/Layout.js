/*
 * @Description: 新建随访任务layout
 * @Author: jun
 * @Date: 2019-06-20 15:09:39
 */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Steps } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Layout.less';

const steps = [
  {
    title: '选择任务类型',
    content: '选择任务类型',
  },
  {
    title: '选择对象',
    content: '选择对象',
  },
  {
    title: '编辑任务内容',
    content: '任务内容',
  },
  {
    title: '发布',
    content: '发布',
  }
];

@connect(({ global, followupCreate }) => ({
  global,
  step: followupCreate.step,
}))
class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    const { match, children, location, step } = this.props;

    const mainSteps = (
      <Steps current={step} className={styles.steps}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
    );

    return (
      <PageHeaderWrapper
        title="新建随访任务"
        content={mainSteps}
      >
        <div className={styles.content}>
          {children}
        </div>
      </PageHeaderWrapper>
    )
  }
}

export default Layout;
