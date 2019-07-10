import { Button, Modal, Form } from 'antd';
import router from 'umi/router';
import { mRb8 } from './index.less';
import Content from './Content';

const { Item } = Form;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

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
          onClick={() => router.push('/concern-management/birthday-concern')}
        >
          {' '}
          确定{' '}
        </Button>
      </div>
      <Modal
        visible={modalVisible}
        onCancel={() => {
          setState({ ...state, modalVisible: false });
        }}
        onOk={() => {
          setState({ ...state, modalVisible: false });
        }}
      >
        <Form {...formItemLayout}>
          <Item label="发送时间">
            <u>{new Date().toLocaleDateString()}</u>
          </Item>
          <Item label="发送媒介">
            <u>微信</u>
          </Item>
          <Item label="问候语">
            <u>您的安康，是我们的幸福。您的安康，是我们的祝愿。祝您节日愉快！</u>
          </Item>
        </Form>
      </Modal>
    </div>
  );
};
