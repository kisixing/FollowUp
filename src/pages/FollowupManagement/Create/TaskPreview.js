import { Modal, Timeline } from 'antd';

//预览
export default function Preview({ visible, onOk, onCancel }) {
  // const [state,setState] = useState({
  //   visible:false
  // })
  return (
    <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
      <Timeline>
        <Timeline.Item color="green">
          预约日期 之后 1天 发送微信
          <div>
            复诊提醒
            <div></div>
          </div>
        </Timeline.Item>
        <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item color="red">
          <p>Solve initial network problems 111</p>
          <p>Solve initial network problems 2</p>
          <p>Solve initial network problems 3 2015-09-01</p>
        </Timeline.Item>
        <Timeline.Item>
          <p>Technical testing 1</p>
          <p>Technical testing 2</p>
          <p>Technical testing 3 2015-09-01</p>
        </Timeline.Item>
      </Timeline>
      ,
    </Modal>
  );
}
