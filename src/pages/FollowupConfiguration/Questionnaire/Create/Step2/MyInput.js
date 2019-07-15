import styles from './MyInput.less';
import eventEmitter from '@/utils/Event';

let flag = true;
function removeActive() {
  eventEmitter.emit('removeInputFocus');
}
if (flag) {
  //   console.log('effect');
  document.addEventListener('click', removeActive, true);
  flag = false;
}
export default class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    eventEmitter.on('removeInputFocus', this.cb);
  }

  componentWillUnmount() {
    eventEmitter.off('removeInputFocus', this.cb);
  }

  cb = () => {
    this.setState({ active: false });
  };

  render() {
    const { active } = this.state;

    const { Left, Right, value, onChange } = this.props;
    return (
      <div
        className={styles[`${active ? 'active' : 'negative'}`]}
        onClick={() => {
          // e.stopPropagation();
          this.setState({ active: true });
        }}
      >
        {Left}
        <input
          className={styles.input}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
        />
        {Right}
      </div>
    );
  }
}
