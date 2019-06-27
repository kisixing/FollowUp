import { Tabs, Menu, Button } from 'antd';
import router from 'umi/router';
import { mRb8 } from './index.less'
import Preview from './TaskPreview';
import Content from './Content';
const { TabPane } = Tabs;
const digits = '一二三四五六七八九十';
export function Title({ label, isTop }) {
  return (
    <div style={{ fontWeight: 'bold', marginTop: isTop || '30px', marginBottom: '10px' }}>
      {label}
    </div>
  );
}
export default props => {
  const [state, setState] = useState({
    activeKey: null,
    panes: [],
    previewVisible: false,
  });
  const { panes, activeKey, previewVisible } = state;

  const onChange = activeKey => {
    // debugger
    setState({ ...state, activeKey });
  };

  function setVisible(previewVisible) {
    setState({ ...state, previewVisible });
  }
  function getKey(index) {
    return `${index}newTab`;
  }
  const actions = {
    add() {
      const length = panes.length;
      if (length >= 10) {
        return;
      }
      const activeKey = getKey(length);
      panes.push({
        title: `步骤${digits[length]}`,
        content: (
          <Content
            index={length}

          />
        ),
        key: activeKey,
      });
      setState({ ...state, panes, activeKey });
    },

    remove(targetKey) {
      let activeKey = activeKey;
      let lastIndex;
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = panes.filter(pane => pane.key !== targetKey);
      if (activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      }
      setState({ ...state, panes, activeKey });
    },
  };

  const onEdit = (targetKey, action) => {
    actions[action](targetKey);
  };
  if (state.panes.length === 0) {
    actions.add();
  }

  return (
    <div>
      <Tabs
        // hideAdd={false}
        onChange={onChange}
        activeKey={activeKey}
        type="editable-card"
        onEdit={onEdit}
      >
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>




      <div style={{ textAlign: 'center' }}>
        <Button className={mRb8} onClick={() => setVisible(true)}>
          预览{' '}
        </Button>
        <Button type="primary" className={mRb8} onClick={() => {
          const index = parseInt(activeKey)
          if (index <= 0) {
            return;
          }
          setState({
            ...state,
            activeKey: getKey(index - 1),
          });
        }}>
          {' '}
          上一步{' '}
        </Button>
        <Button type="primary" className={mRb8} onClick={() => {
          const index = parseInt(activeKey)
          if (index >= panes.length - 1) {
            return;
          }

          setState({
            ...state,
            activeKey: getKey(index + 1),
          });
        }}>
          {' '}
          下一步{' '}
        </Button>
        <Button type="primary" className={mRb8} onClick={() => router.push('step4')}>
          {' '}
          确定{' '}
        </Button>
      </div>
      <Preview
        // formData={formData}
        visible={previewVisible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          setVisible(false);
        }}
      ></Preview>
    </div>
  );
};
