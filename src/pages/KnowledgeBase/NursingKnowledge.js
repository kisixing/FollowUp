/* eslint-disable no-console */
/* eslint-disable react/no-danger */
/*
 * @Description: 护理知识
 * @Author: zhong jun
 * @Date: 2019-07-03 22:21:40
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Icon, Menu, Dropdown } from 'antd';
// import moment from 'moment';
import classNames from 'classnames';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageLoading from '@/components/PageLoading';
import MenuTree from './MenuTree';
import styles from './styles.less';

// moment.locale('zh-cn');

const gData = [
  {
    key: '000',
    uuid: '2019-05-05-001',
    title: '延续护理中心',
    isLeaf: true,
    icon: 'book',
  },
  {
    key: '001',
    uuid: '2019-05-05-002',
    title: '家庭护理',
    isLeaf: false,
    children: [
      {
        key: '001-001',
        uuid: '2019-05-05-003',
        title: '产后护理',
        isLeaf: true,
      },
    ],
  },
  {
    key: '002',
    uuid: '2019-05-05-004',
    title: '护理注意事项',
    isLeaf: false,
    children: [
      {
        key: '002-001',
        uuid: '2019-05-05-005',
        title: '造口护理',
        isLeaf: true,
      },
      {
        key: '002-002',
        uuid: '2019-05-05-006',
        title: '透析护理',
        isLeaf: true,
      },
    ],
  },
  {
    key: '003',
    uuid: '2019-05-05-007',
    title: '糖尿病护理',
    isLeaf: true,
  },
];

@connect(({ loading, knowledge }) => ({
  loading: loading.effects['knowledge/fetchArticle'],
  article: knowledge.article,
}))
class CommonProblem extends PureComponent {
  state = {
    fullScreen: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/fetchArticle',
      payload: {
        id: '2019-05-05-001',
      },
    });
  }

  onClick = item => {
    if (!item || (item && !item.uuid)) {
      return;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'knowledge/fetchArticle',
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
    const { article } = this.props;
    router.push({
      pathname: '/knowledge/nursing/update',
      query: {
        article,
      },
    });
  };

  moreMenu = () => (
    <Menu>
      <Menu.Item key="0">
        <a href="#">查看页面历史</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">导出到word</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">添加到页面模板</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="#">复制页面</a>
      </Menu.Item>
    </Menu>
  );

  render() {
    const { fullScreen } = this.state;
    const { article, loading } = this.props;

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
                <Dropdown overlay={this.moreMenu()} trigger={['click']}>
                  <Button type="link" icon="ellipsis" ghost>
                    更多
                  </Button>
                </Dropdown>
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
                  <h2>{article.title}</h2>
                  {article.updated_time && (
                    // <p>于 {moment(article.updated_time).format('YYYY-MM-DD HH:mm:ss')} 修改</p>
                    <p>于 {article.updated_time.toLocaleString()} 修改</p>
                  )}
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
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
