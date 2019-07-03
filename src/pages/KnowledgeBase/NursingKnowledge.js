/*
 * @Description: 护理知识
 * @Author: zhong jun
 * @Date: 2019-07-03 22:21:40
 */
import React, { PureComponent } from 'react';
import { Button, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MenuTree from './MenuTree';
import BraftEditor from './BraftEditor';
import styles from './styles.less';

const gData = [
  {
    key: '000',
    title: '延续护理中心',
    isLeaf: true,
    icon: 'book',
  },
  {
    key: '001',
    title: '家庭护理',
    isLeaf: false,
    children: [
      {
        key: '001-001',
        title: '产后护理',
        isLeaf: true,
      },
      {
        key: '001-002',
        title: '婴儿护理',
        isLeaf: true,
      },
      {
        key: '001-003',
        title: '皮肤护理',
        isLeaf: true,
      },
    ],
  },
  {
    key: '002',
    title: '护理注意事项',
    isLeaf: false,
    children: [
      {
        key: '002-001',
        title: '造口护理',
        isLeaf: true,
      },
      {
        key: '002-002',
        title: '透析护理',
        isLeaf: true,
      },
      {
        key: '002-003',
        title: '皮肤护理',
        isLeaf: true,
      },
    ],
  },
  {
    key: '003',
    title: '糖尿病护理',
    isLeaf: true,
  },
  {
    key: '004',
    title: '高血压护理',
    isLeaf: true,
  },
];

class CommonProblem extends PureComponent {
  state = {};

  render() {
    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <div className={styles.tree}>
            <div className={styles.titleBar}>
              <Icon type="menu" className={styles.menu} />
              <span>护理知识库</span>
              <Icon type="setting" className={styles.setting} />
            </div>
            <div className={styles.content}>
              <MenuTree dataSource={gData} />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.bar}>
              <div className={styles.navigation}>护理中心</div>
              <div className={styles.actions}>
                <Button type="link" icon="edit" ghost>
                  编辑
                </Button>
                <Button type="link" icon="bell" ghost>
                  已关注
                </Button>
                <Button type="link" icon="ellipsis" ghost>
                  更多
                </Button>
              </div>
            </div>
            <div className={styles.textbox}>
              <BraftEditor />
            </div>
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CommonProblem;
