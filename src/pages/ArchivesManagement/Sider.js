import React, { Component } from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import avatar from '../../assets/default-avatar.png';

import styles from './Sider.less';

@connect(({ archivesManagement }) => ({
  patient: archivesManagement.patient,
}))
class Sider extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'archivesManagement/fetchPatient',
      payload: {
        id: '201810100089',
      },
    });
  }

  render() {
    const { patient } = this.props;

    return (
      <div className={styles.sider}>
        <div className={styles.avatar}>
          <Avatar
            shape="square"
            style={{ width: '60px', height: '60px' }}
            src={patient.avatar || avatar}
          />
          <div>
            <h2>{patient.name}</h2>
            <div>{patient.cardID}</div>
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <span className={styles.label}>性别：</span>
            <span className={styles.value}>{patient.gender}</span>
          </div>
          <div>
            <span className={styles.label}>费别：</span>
            <span className={styles.value}>{patient.paymentType}</span>
          </div>
          <div>
            <span className={styles.label}>年龄：</span>
            <span className={styles.value}>{patient.age}</span>
          </div>
          <div>
            <span className={styles.label}>婚姻：</span>
            <span className={styles.value}>{patient.maritalStatus}</span>
          </div>
          <div>
            <span className={styles.label}>民族：</span>
            <span className={styles.value}>{patient.nation}</span>
          </div>
          <div>
            <span className={styles.label}>出生日期：</span>
            <span className={styles.value}>{patient.birth}</span>
          </div>
          <div>
            <span className={styles.label}>职业：</span>
            <span className={styles.value}>{patient.profession}</span>
          </div>
          <div>
            <span className={styles.label}>工作单位：</span>
            <span className={styles.value}>{patient.workPlace}</span>
          </div>
          <div>
            <span className={styles.label}>住址：</span>
            <span className={styles.value}>{patient.address}</span>
          </div>
          <div>
            <span className={styles.label}>药物过敏：</span>
            <span className={styles.value}>{patient.allergy}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Sider;
