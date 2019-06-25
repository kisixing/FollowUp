import styles from './WeChatCard.less'
import {Icon} from 'antd'
export default (props) => {
    return (
        <div className={styles.wrap}>
            复诊提醒
            <div className={styles.date}>4月24日</div>
            <div>姓名：张女士</div>
            <div>预约日期：2019年6月25日</div>
            <div>我掐指一算，您已经迟到1天了哦！尽快来医院复诊吧！</div>
            <div className={styles.detail}>
                详情
                <Icon type="right" style={{float:'right',marginTop:'3px',color:'#999'}} />
            </div>
        </div>
    )
}