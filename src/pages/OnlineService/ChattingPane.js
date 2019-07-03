import { Input, Button } from 'antd';
import styles from './ChattingPane.less';

function mapStateToProps(rootState) {
  return { rootState };
}

export default connect(mapStateToProps)(() => {
  const [state, setState] = useState({
    list: ['aa'],
    text: '',
  });
  let contentRef;
  // const { } = props;
  const { list, text } = state;
  useEffect(() => {
    contentRef.scroll(0, 999999999);
  }, [list]);
  return (
    <div className={styles.containner}>
      <div className={styles.chatTitle}>
        <span>黄庆仁</span>
      </div>
      <div
        ref={el => {
          contentRef = el;
        }}
        className={styles.messages}
      >
        <div className={styles.time}>12:00</div>
        <div className={styles.leftMessage}>
          <div>医院有停车场吗？</div>
        </div>
        <div className={styles.rightMessage}>
          <div>你好</div>
        </div>
        <div className={styles.rightMessage}>
          <div>本院设有停车场</div>
        </div>
        <div className={styles.leftMessage}>
          <div>好的谢谢</div>
        </div>
        {list.map((_, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.rightMessage} key={index}>
              <div>{_}</div>
            </div>
          );
        })}
      </div>
      <div className={styles.inputPane}>
        <div className={styles.tools} />
        <Button
          type="primary"
          className={styles.sendBtn}
          onClick={() => {
            setState({ ...state, text: '', list: state.list.concat(state.text) });
          }}
        >
          发送
        </Button>
        <Input.TextArea
          value={text}
          onChange={e => setState({ ...state, text: e.target.value })}
          style={{ borderRadius: '0', height: '100px' }}
        />
      </div>
    </div>
  );
});
