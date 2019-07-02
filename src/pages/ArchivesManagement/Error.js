import React from 'react';
import styles from './style.less';

export default function Error() {
  return (
    <div className={styles.error}>
      不存在账号或手机号为201906100012的患者！请输入有效的的就诊卡号或者手机号。
    </div>
  );
}
