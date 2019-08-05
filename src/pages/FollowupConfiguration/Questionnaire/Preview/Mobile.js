import phone_bg from '@/assets/phone_bg.png';
import MobileLayout from './Layout';
import styles from './Mobile.less';
import Strategies from './mobileStrategies';

function mapStateToProps(rootState) {
  return rootState;
}

export default connect(mapStateToProps)(() => {
  // const { dispatch } = props;
  // const [state, setState] = useState({});
  // const { } = state;
  return (
    <div
      style={{
        backgroundImage: `url(${phone_bg})`,
      }}
      className={styles.containner}
    >
      <div className={styles.contentWrap}>
        <MobileLayout Strategies={Strategies} isMobile />
      </div>
    </div>
  );
});
