/* eslint-disable no-console */

import router from 'umi/router';

import { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Avatar, Button, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';

import styles from './index.less';

// const hierarchical = false
// const multiple = false
//
const list = ['情人节', '端午', '中秋'].map(_ => {
  const time = Math.round(Math.random() * 366);
  return {
    title: _,
    id: Math.random(),
    all: new Date(+new Date() + 1000 * 60 * 60 * 24 * time).toLocaleDateString(),
    time,
    status: { dec: '运行中', code: 'running' },
    avatar: '',
  };
});

const category1 = Array(12)
  .fill('月')
  .map((_, index) => `${index + 1}${_}`);
const category2 = ['中国传统节日', '24节气', '公众/国际节日'];

class FollowupManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabActiveKey: 'all',
      loading: false,
      selectedCategory1: [],
      selectedCategory2: [],
    };
  }

  componentDidMount() {
    // const { dispatch,  } = this.props;
    // const { tabActiveKey ,selectedTags} = this.state;
  }

  handleTabChange = key => {
    this.setState({ tabActiveKey: key });
  };

  handleFormSubmit = value => {
    console.log(value);
  };

  onDetailClick = () => {
    // const { match } = this.props;
    router.push(`/concern-management/praise-lists`);
  };

  onChartClick = () => {
    router.push(`statistics`);
  };

  // 选择标签
  handleTags = (target, checkedTag) => {
    this.setState({
      [target]: Array.isArray(checkedTag) ? checkedTag : [checkedTag],
      loading: true,
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 400);
  };

  handleTagClose = removedTag => {
    const { selectedCategory1, selectedCategory2 } = this.state;
    const index1 = selectedCategory1.indexOf(removedTag);
    const index2 = selectedCategory2.indexOf(removedTag);
    // const res = []
    if (index1 >= 0) {
      selectedCategory1.splice(index1, 1);
      this.setState({ selectedCategory1 });
    }
    if (index2 >= 0) {
      selectedCategory2.splice(index2, 1);
      this.setState({ selectedCategory2 });
    }
  };

  render() {
    const tabList = [
      {
        key: 'all',
        tab: '全部',
      },
      {
        key: 'running',
        tab: '运行中',
      },
      {
        key: 'pause',
        tab: '暂停',
      },
      {
        key: 'drafts',
        tab: '草稿箱',
      },
      {
        key: 'recycled',
        tab: '回收站',
      },
    ];

    const actionsTextMap = {
      expandText: '展开',
      collapseText: '收起',
      selectAllText: '全部',
    };

    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.alipay.com/">
            1、推荐 alipay
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.taobao.com/">
            2、推荐 taobao
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://www.tmall.com/">
            3、推荐 tmall
          </a>
        </Menu.Item>
      </Menu>
    );

    const mainSearch = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ maxWidth: 522, width: '100%' }}
        />
      </div>
    );

    const tabBarExtraContent = (
      <Button
        size="small"
        type="primary"
        icon="plus"
        onClick={() => router.push('/concern-management/festival-concern/create/step1')}
      >
        新建
      </Button>
    );

    const CardInfo = ({ all, today }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>下次节日日期</p>
          <p>{all}</p>
        </div>
        <div>
          <p>倒计时</p>
          <p>{today}</p>
        </div>
      </div>
    );

    const tagsMap = tags => {
      const tagChild = tags.map(tag => (
        <span key={tag} style={{ display: 'inline-block' }}>
          <Tag
            closable
            onClose={e => {
              e.preventDefault();
              this.handleTagClose(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      ));
      return tagChild;
    };

    const tagOptionsMap = options => {
      const tagChild = options.map(tag => (
        <TagSelect.Option key={tag} value={tag}>
          {tag}
        </TagSelect.Option>
      ));
      return tagChild;
    };

    const { tabActiveKey, loading, selectedCategory1, selectedCategory2 } = this.state;
    const selectedItems = selectedCategory1.concat(selectedCategory2).filter(_ => _ !== '');
    return (
      <PageHeaderWrapper
        wrapperClassName={styles.wrapper}
        title="列表搜索"
        content={mainSearch}
        tabList={tabList}
        tabBarExtraContent={tabBarExtraContent}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.content}>
          <Card>
            <Form layout="inline">
              <StandardFormRow title="已选类目" block style={{ paddingBottom: 11 }}>
                <div style={{ lineHeight: '32px' }}>
                  <TweenOneGroup
                    enter={{
                      scale: 0.8,
                      opacity: 0,
                      type: 'from',
                      duration: 100,
                      onComplete: e => {
                        e.target.style = '';
                      },
                    }}
                    leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                    appear={false}
                  >
                    {tagsMap(selectedItems)}
                  </TweenOneGroup>
                </div>
              </StandardFormRow>
              <StandardFormRow title="对象分类" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  <TagSelect
                    radio
                    expandable
                    // hideCheckAll
                    value={selectedCategory1}
                    onChange={tags => this.handleTags('selectedCategory1', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(category1)}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
              <StandardFormRow title="时间场景" block style={{ paddingBottom: 11 }}>
                <Form.Item>
                  <TagSelect
                    radio
                    expandable
                    // hideCheckAll
                    value={selectedCategory2}
                    onChange={tags => this.handleTags('selectedCategory2', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(category2)}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
            </Form>
          </Card>
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1 }}
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                  actions={[
                    <Tooltip title="暂停">
                      <Icon type="pause" />
                    </Tooltip>,
                    <Tooltip title="编辑">
                      <Icon
                        type="edit"
                        onClick={() =>
                          router.push('/concern-management/festival-concern/create/step2')
                        }
                      />
                    </Tooltip>,
                    <Tooltip title="统计">
                      <Icon type="line-chart" onClick={() => this.onChartClick(item)} />
                    </Tooltip>,
                    <Dropdown overlay={itemMenu}>
                      <Icon type="ellipsis" />
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    style={{ cursor: 'pointer' }}
                    avatar={<Avatar size="small" src={item.avatar} />}
                    title={
                      <div>
                        {item.title} <span className={styles.status}>{item.status.dec}</span>
                      </div>
                    }
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo all={item.all} today={item.time} />
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(FollowupManagement);
