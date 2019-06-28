import styles from './index.less'
import { Tabs } from "antd";
import ChattingList from './ChattingList'
import ChattingPane from './ChattingPane'
import ChattingInfo from './ChattingInfo'
import PatientToServe from './PatientToServe'

const TabPane = Tabs.TabPane
function mapStateToProps({ onlineService_model }) {
  return { onlineService_model }
}

export default connect(mapStateToProps)((props, context) => {
  const [state, setState] = useState({});
  const { onlineService_model, dispatch } = props;
  const { } = state;
  const { activeKey } = onlineService_model

  return <div className={styles.container}>
    <Tabs style={{ margin: '0 10px', background: '#fff', borderRadius: '4px' }} activeKey={activeKey} onChange={activeKey => {
      dispatch({ type: 'onlineService_model/setState', payload: { activeKey } })
    }}>
      <TabPane tab="待回复（19人）" key="1">
        <div className={styles.chatPane}>
          <div className={styles.chatLeft}>
            <ChattingList />
          </div>

          <div className={styles.chatRight}>
            <ChattingInfo />
          </div>

          <div className={styles.chatMiddle}>
            <ChattingPane />
          </div>

        </div>
      </TabPane>
      <TabPane tab="待接入（119人）" key="2">
        <div style={{ padding: '20px' }}>
          <PatientToServe />
        </div>
      </TabPane>
    </Tabs>
  </div>;
});
