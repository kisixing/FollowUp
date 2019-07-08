/* eslint-disable react/no-danger */
/*
 * @Description: 常见问题
 * @Author: zhong jun
 * @Date: 2019-07-03 22:21:40
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Icon } from 'antd';
import classNames from 'classnames';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import MenuTree from './MenuTree';
import styles from './styles.less';

const gData = [
  {
    key: '001',
    uuid: '2019-05-05-001',
    title: '家庭护理',
    isLeaf: false,
    children: [
      {
        key: '001-001',
        uuid: '2019-05-05-002',
        title: '极低出生体重儿',
        isLeaf: true,
      },
      {
        key: '001-002',
        uuid: '2019-05-05-003',
        title: '婴儿护理',
        isLeaf: true,
      },
      {
        key: '001-003',
        uuid: '2019-05-05-004',
        title: '皮肤护理',
        isLeaf: true,
      },
    ],
  },
  {
    key: '002',
    uuid: '2019-05-05-005',
    title: '护理注意事项',
    isLeaf: false,
    children: [
      {
        key: '002-001',
        uuid: '2019-05-05-006',
        title: '造口护理',
        isLeaf: true,
      },
    ],
  },
];

@connect(({ loading, knowledge }) => ({
  loading: loading.effects['knowledge/fetchFAQ'],
  faq: knowledge.faq,
}))
class CommonProblem extends PureComponent {
  state = {
    fullScreen: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/fetchFAQ',
      payload: {
        id: '2019-05-05-002',
      },
    });
  }

  onClick = item => {
    if (!item || (item && !item.uuid)) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/fetchFAQ',
      payload: {
        id: item.uuid,
      },
    });
  };

  toggleScreen = () => {
    const { fullScreen } = this.state;
    this.setState({
      fullScreen: !fullScreen,
    });
  };

  edit = () => {
    const { faq } = this.props;
    router.push({
      pathname: '/knowledge/faq/update',
      query: {
        article: faq,
      },
    });
  };

  render() {
    const { fullScreen } = this.state;
    const { loading, faq } = this.props;

    return (
      <PageHeaderWrapper>
        <div className={styles.wrapper}>
          <div className={styles.tree}>
            <div className={styles.titleBar}>
              <Icon type="menu" className={styles.menu} />
              <span>常见问题</span>
              <Icon type="setting" className={styles.setting} />
            </div>
            <div className={styles.content}>
              <MenuTree dataSource={gData} onClick={this.onClick} />
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.bar}>
              <div className={styles.navigation}>护理中心</div>
              <div className={styles.actions}>
                <Button type="link" icon="edit" ghost onClick={this.edit}>
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
            {loading ? (
              <PageLoading />
            ) : (
              <div className={styles.textbox}>
                <div className={styles.icon}>
                  <Icon type={fullScreen ? 'shrink' : 'arrows-alt'} onClick={this.toggleScreen} />
                </div>
                <div
                  className={classNames(styles.innerTextbox, {
                    [styles.centerTextbox]: fullScreen,
                  })}
                >
                  <h2>{faq.title}</h2>
                  {faq.updated_time && (
                    // <p>于 {moment(article.updated_time).format('YYYY-MM-DD HH:mm:ss')} 修改</p>
                    <p>于 {faq.updated_time.toLocaleString()} 修改</p>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: faq.content }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default CommonProblem;
