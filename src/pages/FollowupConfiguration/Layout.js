import { Steps } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './Layout.less';
import { Input, Button } from 'antd';

function mapStateToProps({ followupConfiguration_model }) {
  const { tabList, tabActiveKey, configurationName } = followupConfiguration_model;
  return { tabList, tabActiveKey, configurationName };
}

export default connect(mapStateToProps)(
  ({ tabList, tabActiveKey, children, dispatch, configurationName }, context) => {
    const [state, setState] = useState({});
    const mainSearch = (
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={() => {
            dispatch('followupConfiguration_model/search');
          }}
          style={{ maxWidth: 522, width: '100%' }}
        />
        {configurationName === 'medium' ? null : (
          <Button type="primary" icon="plus" size="large" style={{ float: 'right' }}>
            新增
          </Button>
        )}
      </div>
    );

    const handleTabChange = tabActiveKey => {
      dispatch({ type: 'followupConfiguration_model/setState', payload: { tabActiveKey } });
    };
    return (
      <div>
        <PageHeaderWrapper
          wrapperClassName={styles.wrapper}
          title="随访任务列表"
          content={mainSearch}
          tabList={tabList}
          // tabBarExtraContent={tabBarExtraContent}
          tabActiveKey={tabActiveKey}
          onTabChange={handleTabChange}
        >
          <div className={styles.content}>{children}</div>
        </PageHeaderWrapper>
      </div>
    );
  }
);
