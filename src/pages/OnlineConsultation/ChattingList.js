import styles from './ChattingList.less'
import { Badge } from 'antd';

function mapStateToProps({ onlineConsultation_model }) {
    const { chattingList } = onlineConsultation_model
    return { chattingList }
}


export default connect(mapStateToProps)((props) => {
    const [state, setState] = useState({});
    const { chattingList } = props;
    const { } = state;
    return (
        <div>
            {
                chattingList.map(_ => {
                    return (
                        <div className={styles.container} key={_.id} style={{background:_.id===1?'rgba(245,245,245)':'white'}}>
                            <div className={styles.name}>

                                <Badge count={5} className={styles.floatRight}>
                                </Badge>
                                <div className={styles.name}>{_.name}</div>


                            </div>
                            <div className={styles.text}>
                                <div className={styles.floatRight}>
                                    {new Date(_.date).toLocaleDateString()}

                                </div>
                                <div>
                                    {
                                        _.text
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
