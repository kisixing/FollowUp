import { Modal, Timeline } from 'antd';
import WechatCard from '@/components/WechatCard'
import MessageCard from './MessageCard'

//预览
const yellowStyle = { "color": "orange", "fontWeight": "bold" }
export default function Preview({ visible, onOk, onCancel }) {
    // const [state,setState] = useState({
    //   visible:false
    // })
    return (
        <Modal visible={visible} onOk={onOk} onCancel={onCancel}>
            <Timeline>
                <Timeline.Item color="green">
                    预约日期 之后 1天 发送微信
          <WechatCard />

                </Timeline.Item>

                <Timeline.Item color="green">
                    <div style={yellowStyle}>预约日期 之后 5天 发送短信</div>
                    <MessageCard />
                </Timeline.Item>

                <Timeline.Item color="red">
                    <div>预约日期之后 7天</div>
                    <p>进入人工管理模式，可通过电话随访并记录随访内容</p>
                </Timeline.Item>
                <Timeline.Item>
                    <p>随访统计</p>
                </Timeline.Item>
            </Timeline>
            ,
    </Modal>
    );
}
