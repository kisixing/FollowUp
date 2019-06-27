import styles from './index.less'
import { Tabs } from "antd";
import ChattingList from './ChattingList'
const TabPane = Tabs.TabPane
function mapStateToProps({ onlineConsultation_model }) {
  return {}
}

export default connect(mapStateToProps)((props, context) => {
  const [state, setState] = useState({});
  const { } = props;
  const { } = state;
  return <div className={styles.container}>
    <Tabs style={{ margin: '0 10px', background: '#fff', borderRadius: '4px' }}>
      <TabPane tab="待回复（19人）" key="1">
        <div className={styles.chatPane}>
          <div className={styles.chatLeft}>
            <ChattingList />
          </div>
          <div className={styles.chatMiddle}>
   
          </div>
          <div className={styles.chatRight}></div>
        </div>
      </TabPane>
      <TabPane tab="待接入（119人）" key="2">
        <div></div>
      </TabPane>
    </Tabs>
  </div>;
});
