/* eslint-disable no-console */

import router from 'umi/router';

import { Form, List, Card, Input, Button, Tag, Spin } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TagSelect from '@/components/TagSelect';
import StandardFormRow from '@/components/StandardFormRow';
import Item from './Item';
import styles from './index.less';
import request from '@/utils/request';

const category1 = Array(12)
  .fill('月')
  .map((_, index) => `${index + 1}${_}`);
export const category2 = ['中国传统节日', '24节气', '公众/国际节日'];

export default () => {
  const [state, setState] = useState({
    list: [],
    status: 'all',
    loading: false,
    selectedMonth: [],
    selectedType: [],
    title: '',
  });
  const { list, status, selectedMonth, selectedType, loading, title } = state;

  // 选择标签
  const handleTags = (target, checkedTag) => {
    setState({
      ...state,
      [target]: Array.isArray(checkedTag) ? checkedTag : [checkedTag],
    });
  };

  const handleTagClose = (type, value) => {
    const target = state[type];
    const index = target.indexOf(value);
    target.splice(index, 1);
    setState({ ...state, [type]: [...target] });
  };
  const fetchData = () => {
    setState({ ...state, loading: true });
    const month = selectedMonth.length === 1 ? selectedMonth[0] : null;
    const type = selectedType.length === 1 ? selectedType[0] : null;
    const _status = status === 'all' ? null : parseInt(status, 10);
    request
      .post('/api/festivalConcern/list', { data: { month, type, status: _status, title } })
      .then(data => {
        setState({ ...state, list: data, loading: false });
      });
  };
  useEffect(() => {
    fetchData();
  }, [selectedMonth, selectedType, status]);

  const tabList = [
    {
      key: 'all',
      tab: '全部',
    },
    {
      key: 0,
      tab: '运行中',
    },
    {
      key: 1,
      tab: '暂停',
    },
    {
      key: 2,
      tab: '草稿箱',
    },
    {
      key: 3,
      tab: '回收站',
    },
  ];

  const actionsTextMap = {
    expandText: '展开',
    collapseText: '收起',
    selectAllText: '全部',
  };

  const mainSearch = (
    <div style={{ textAlign: 'center' }}>
      <Input.Search
        value={title}
        onChange={e => setState({ ...state, title: e.target.value })}
        placeholder="请输入"
        enterButton="搜索"
        size="large"
        onSearch={() => fetchData()}
        style={{ maxWidth: 522, width: '100%' }}
      />
    </div>
  );

  const tabBarExtraContent = (
    <Button size="small" type="primary" icon="plus" onClick={() => router.push('create/step1')}>
      新建
    </Button>
  );

  const tagsMap = tags => {
    const tagChild = tags.map(({ type, value }, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <span key={index} style={{ display: 'inline-block' }}>
        <Tag
          closable
          onClose={e => {
            e.preventDefault();
            handleTagClose(type, value);
          }}
        >
          {type === 'selectedMonth' ? category1[value] : category2[value]}
        </Tag>
      </span>
    ));
    return tagChild;
  };

  const tagOptionsMap = options => {
    const tagChild = options.map((tag, index) => (
      <TagSelect.Option key={tag} value={index}>
        {tag}
      </TagSelect.Option>
    ));
    return tagChild;
  };

  const selectedItems = selectedMonth
    .map(_ => ({ type: 'selectedMonth', value: _ }))
    .concat(selectedType.map(_ => ({ type: 'selectedType', value: _ })));
  return (
    <PageHeaderWrapper
      wrapperClassName={styles.wrapper}
      title="列表搜索"
      content={mainSearch}
      tabList={tabList}
      tabBarExtraContent={tabBarExtraContent}
      tabActiveKey={status}
      onTabChange={key => {
        setState({ ...state, status: key });
      }}
    >
      <div className={styles.content}>
        <Card>
          <Spin spinning={loading}>
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
                    value={selectedMonth}
                    onChange={tags => handleTags('selectedMonth', tags)}
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
                    value={selectedType}
                    onChange={tags => handleTags('selectedType', tags)}
                    actionsText={actionsTextMap}
                  >
                    {tagOptionsMap(category2)}
                  </TagSelect>
                </Form.Item>
              </StandardFormRow>
            </Form>
          </Spin>
        </Card>
        <List
          rowKey="id"
          style={{ marginTop: 24 }}
          grid={{ gutter: 24, xxl: 4, xl: 3, lg: 2, md: 2, sm: 1 }}
          loading={loading}
          dataSource={list}
          renderItem={item => <Item {...item} />}
        />
      </div>
    </PageHeaderWrapper>
  );
};
