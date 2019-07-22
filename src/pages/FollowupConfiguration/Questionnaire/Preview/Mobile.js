import phone_bg from '@/assets/phone_bg.png';
import MobileContent from './MobileContent';

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
        backgroundSize: '372px 744px',
        width: '372px',
        height: '744px',
        display: 'inline-block',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '318px',
          height: '568px',
          marginTop: '74px',
          display: 'inline-block',
          background: 'white',
        }}
      >
        <MobileContent />
      </div>
    </div>
  );
});
