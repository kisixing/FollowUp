import { Button, Modal, Form } from 'antd';
import router from 'umi/router';
import { mRb8 } from './index.less';
import Content from './Content';

const FormItem = Form.Item;
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
    <div style={{ background: '#fff', padding: '20px' }}>
      <Content />

      <div style={{ textAlign: 'center', marginTop: 20 }}>
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
      <Modal
        visible={modalVisible}
        onCancel={() => {
          setState({ ...state, modalVisible: false });
        }}
        onOk={() => {
          setState({ ...state, modalVisible: false });
        }}
      >
        <Form labelCol={{ xs: 4 }} wrapperCol={{ xs: 10 }}>
          <FormItem label="时间">
            <u>预约前5天 12:00</u>
          </FormItem>
          <FormItem label="选择媒介">
            <u>微信</u>
          </FormItem>
          <FormItem label="提示文字">
            <u>你好，请输入提示文字</u>
          </FormItem>
        </Form>
      </Modal>
    </div>
  );
};
