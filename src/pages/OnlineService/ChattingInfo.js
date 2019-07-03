import { Input } from 'antd';
import styles from './ChattingInfo.less';
import { PatientInfo } from '@/components/Phone/Call';

function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    activeLeft: true,
  });
  const { activeLeft } = state;
  const activeSyle = { background: 'white', color: 'blue' };
  return (
    <div>
      <div className={styles.togglePane}>
        <div
          style={activeLeft ? activeSyle : {}}
          onClick={() => setState({ ...state, activeLeft: true })}
        >
          患者信息
        </div>
        <div
          style={!activeLeft ? activeSyle : {}}
          onClick={() => setState({ ...state, activeLeft: false })}
        >
          知识库
        </div>
      </div>
      <div style={{ margin: '10px' }}>
        {activeLeft ? (
          <PatientInfo name="黄庆仁" />
        ) : (
          <div className={styles.rightContent}>
            <Input.Search></Input.Search>
          </div>
        )}
      </div>
    </div>
  );
});
