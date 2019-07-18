/* eslint-disable no-console */

// import router from 'umi/router';
import { List, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Item from './Item';
import styles from './index.less';
import request from '@/utils/request';

export default () => {
  const [state, setState] = useState({
    list: [],
    status: 'all',
    loading: false,
    title: '',
  });
  const { list, status, loading, title } = state;

  const fetchData = () => {
    setState({ ...state, loading: true });
    const _status = status === 'all' ? null : parseInt(status, 10);
    request
      .post('/api/appointmentTracking/list', { data: { status: _status, title } })
      .then(data => {
        setState({ ...state, list: data, loading: false });
      });
  };
  useEffect(() => {
    fetchData();
  }, [status]);

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
  ];

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

  // const tabBarExtraContent = (
  //   <Button size="small" type="primary" icon="plus" onClick={() => router.push('create/step1')}>
  //     新建
  //   </Button>
  // );

  return (
    <PageHeaderWrapper
      wrapperClassName={styles.wrapper}
      title="列表搜索"
      content={mainSearch}
      tabList={tabList}
      // tabBarExtraContent={tabBarExtraContent}
      tabActiveKey={status}
      onTabChange={key => {
        setState({ ...state, status: key });
      }}
    >
      <div className={styles.content}>
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
