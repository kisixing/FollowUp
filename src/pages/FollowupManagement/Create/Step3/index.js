import { Tabs, Button } from 'antd';
import router from 'umi/router';
import { mRb8 } from './index.less';
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
export default () => {
  const [state, setState] = useState({
    activeKey: null,
    panes: [],
    previewVisible: false,
  });
  const { panes, activeKey, previewVisible } = state;

  const onChange = _activeKey => {
    // debugger
    setState({ ...state, activeKey: _activeKey });
  };

  function setVisible(_previewVisible) {
    setState({ ...state, previewVisible: _previewVisible });
  }
  function getKey(index) {
    return `${index}newTab`;
  }
  const actions = {
    add() {
      const { length } = panes;
      if (length >= 10) {
        return;
      }
      const _activeKey = getKey(length);
      panes.push({
        title: `步骤${digits[length]}`,
        content: <Content index={length} />,
        key: _activeKey,
      });
      setState({ ...state, panes, activeKey: _activeKey });
    },

    remove(targetKey) {
      let _activeKey = activeKey;
      let lastIndex;
      panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const _panes = panes.filter(pane => pane.key !== targetKey);
      if (activeKey === targetKey) {
        if (lastIndex >= 0) {
          _activeKey = _panes[lastIndex].key;
        } else {
          _activeKey = _panes[0].key;
        }
      }
      setState({ ...state, panes: _panes, activeKey: _activeKey });
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
        <Button
          type="primary"
          className={mRb8}
          onClick={() => {
            const index = parseInt(activeKey, 10);
            if (index <= 0) {
              return;
            }
            setState({
              ...state,
              activeKey: getKey(index - 1),
            });
          }}
        >
          {' '}
          上一步{' '}
        </Button>
        <Button
          type="primary"
          className={mRb8}
          onClick={() => {
            const index = parseInt(activeKey, 10);
            if (index >= panes.length - 1) {
              return;
            }

            setState({
              ...state,
              activeKey: getKey(index + 1),
            });
          }}
        >
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
      />
    </div>
  );
};
