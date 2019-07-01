/* eslint-disable prefer-rest-params */

import React, { Component } from 'react';
import { connect } from 'dva';
import { Steps } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Layout.less';

@connect(({ global, QuestionnaireCreation_model }) => ({
  global,
  currentStep: QuestionnaireCreation_model.currentStep,
  steps: QuestionnaireCreation_model.steps,
}))
class Layout extends Component {
  constructor({ dispatch }) {
    super(...arguments);
    this.state = {};
    dispatch({ type: 'followupCreation_model/fetchDataset', payload: {} });
  }

  render() {
    const { children, steps, currentStep } = this.props;

    const mainSteps = (
      <Steps current={currentStep} className={styles.steps}>
        {steps.map(item => (
          <Steps.Step key={item.title} title={item.title} />
        ))}
      </Steps>
    );

    return (
      <PageHeaderWrapper title="新建随访任务" content={mainSteps}>
        <div className={styles.content}>{children}</div>
      </PageHeaderWrapper>
    );
  }
}

export default Layout;
