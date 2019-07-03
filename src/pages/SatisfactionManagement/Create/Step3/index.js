import { Button } from 'antd';
import router from 'umi/router';
import { mRb8 } from './index.less';
import { PreviewModal } from '../Step1';
import Content from './Content';

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
    modalVisible: false,
  });
  const { modalVisible } = state;

  function setVisible(_previewVisible) {
    setState({ ...state, modalVisible: _previewVisible });
  }

  return (
    <div>
      <Content />

      <div style={{ textAlign: 'center' }}>
        <Button className={mRb8} onClick={() => setVisible(true)}>
          预览{' '}
        </Button>

        <Button
          type="primary"
          className={mRb8}
          onClick={() => router.push('/satisfaction-management/satisfaction-lists')}
        >
          {' '}
          确定{' '}
        </Button>
      </div>
      <PreviewModal
        modalVisible={modalVisible}
        handleModalVisible={() => {
          setState({ ...state, modalVisible: false });
        }}
      />
    </div>
  );
};
