

import router from 'umi/router';

import { Form, List, Card, Tooltip, Menu, Input, Dropdown, Icon, Avatar, Button, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import { objFormatArr } from '@/utils/utils';

import styles from './index.less';

const category = ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'];


@connect(({ global, loading, taskStatistics_model }) => ({
  global,
  loading: loading.effects['taskStatistics_model/query'],
  selectedTags: taskStatistics_model.selectedTags,
  lists: taskStatistics_model.lists,
  tabActiveKey: taskStatistics_model.tabActiveKey,
}))
class FollowupManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskStatistics_model/query',
      payload: {},
    });
  }

  handleTabChange = key => {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskStatistics_model/query',
      payload: {
        status: key,
      },
    });
  };

  handleFormSubmit = value => {
    // eslint-disable-next-line
    console.log(value);
  };





  // 选择标签
  handleTags = (target, checkedTags) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskStatistics_model/updateTags',
      payload: {
        target,
        checkedTags,
      },
    });
  };

  handleTagClose = removedTag => {
    const { dispatch } = this.props;
    dispatch({
      type: 'taskStatistics_model/removeTag',
      payload: removedTag,
    });
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
      }
    ];




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
        type="primary"
        icon="plus"
        size="small"
        onClick={() => router.push('/followup-management/create')}
      >
        新建
      </Button>
    );

    const CardInfo = ({ all, today }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>随访患者</p>
          <p>{all}</p>
        </div>
        <div>
          <p>今日随访</p>
          <p>{today}</p>
        </div>
      </div>
    );





    const { loading, form, selectedTags, lists, tabActiveKey } = this.props;
    const { getFieldDecorator } = form;

    return (
      <PageHeaderWrapper
        wrapperClassName={styles.wrapper}
        title="列表搜索"
        content={mainSearch}
        tabList={tabList}
        // tabBarExtraContent={tabBarExtraContent}
        tabActiveKey={tabActiveKey}
        onTabChange={this.handleTabChange}
      >
        <div>
          <List
            rowKey="id"
            style={{ marginTop: 24 }}
            grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1 }}
            loading={loading}
            dataSource={lists}
            renderItem={item => (
              <List.Item key={item.id} onClick={() => router.push(`/followup-management/statistics/detail/${item.id}`)}>
                <Card
                  hoverable
                  bodyStyle={{ paddingBottom: 20 }}
                >
                  <Card.Meta
                    style={{ cursor: 'pointer' }}
                    title={
                      <div>
                        {item.title} <span className={styles.status}>{item.status.dec}</span>
                      </div>
                    }
                  />
                  <div className={styles.cardItemContent}>
                    <CardInfo all={item.allFollowup} today={item.todayFollowup} />
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
