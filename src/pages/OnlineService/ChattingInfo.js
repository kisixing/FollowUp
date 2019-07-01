import { Input, Timeline } from 'antd';
import styles from './ChattingInfo.less'

function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    activeLeft: true
  });
  const { activeLeft } = state;
  const activeSyle = { background: 'white', color: 'blue' }
  return (
    <div>
      <div className={styles.togglePane}>
        <div style={activeLeft ? activeSyle : {}} onClick={() => setState({ ...state, activeLeft: true })}>患者信息</div>
        <div style={!activeLeft ? activeSyle : {}} onClick={() => setState({ ...state, activeLeft: false })}>知识库</div>
      </div>
      <div style={{ margin: '10px' }}>
        {
          activeLeft ?
            (
              <div className={styles.leftContent}>
                <div className={styles.patientInfo}>
                  <div>姓名：黄庆仁</div>
                  <div>年龄：34</div>
                  <div>标签：<span style={{ background: 'skyblue', color: 'white', padding: '2px', borderRadius: '2px' }}>肿瘤术后</span></div>
                  <div>性别：男</div>

                </div>
                <div className={styles.treatmentInfo}>
                  <div>
                    <Timeline>


                      <Timeline.Item color="red">
                        <div>23+1周 2019.05.15</div>
                        <p>
                          <Tag text="诊" />
                          轻度贫血、早期妊娠
                        </p>
                        <p>
                          <Tag text="检" />
                          <a>血常规</a>、
                          <a>B超</a>
                        </p>
                        <p>
                          <Tag text="药" />
                          硫酸亚铁片
                        </p>
                      </Timeline.Item>

                    </Timeline>
                  </div>
                </div>
              </div>
            ) :
            (
              <div className={styles.rightContent}>
                <Input.Search></Input.Search>
              </div>

            )
        }
      </div>

    </div>
  );
});
function Tag({ text }) {
  return (
    <span style={{ display: 'inline-block', border: '1px solid blue', color: 'blue', background: '#eee', padding: '0 4px', borderRadius: '4px' }}>
      {text}
    </span>
  )
}