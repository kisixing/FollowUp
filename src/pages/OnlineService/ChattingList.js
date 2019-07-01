import { Badge } from 'antd';
import styles from './ChattingList.less'

function mapStateToProps({ onlineService_model }) {
  return { onlineService_model }
}


export default connect(mapStateToProps)((props) => {

  // const [state, setState] = useState({});
  const { dispatch, onlineService_model } = props;
  // const { } = state;
  const { chattingList, chattingId } = onlineService_model
  function changeChatting(_chattingId) {
    dispatch({
      type: 'onlineService_model/changeChatting',
      chattingId: _chattingId
    })
  }
  return (
    <div>
      {
        chattingList.map(({ id, name, text, date, num }) => {
          return (
            <div className={styles.container} onClick={() => changeChatting(id)} key={id} style={{ background: id === chattingId ? 'rgba(245,245,245)' : 'white' }}>
              <div className={styles.name}>

                <Badge count={num} className={styles.floatRight} />
                <div className={styles.name}>{name}</div>


              </div>
              <div className={styles.text}>
                <div className={styles.floatRight}>
                  {new Date(date).toLocaleDateString()}

                </div>
                <div>
                  {
                    text
                  }
                </div>

              </div>
            </div>
          )
        })
      }
    </div>
  );
});
