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
export default ({ value, onChange }) => {
  const [state, setState] = useState({
    active: false,
  });
  const { active } = state;
  useEffect(() => {
    eventEmitter.on('removeInputFocus', () => {
      setState({ ...state, active: false });
    });
    return () => {
      eventEmitter.off('removeInputFocus');
    };
  });
  return (
    <div
      className={styles[`${active ? 'active' : 'negative'}`]}
      onClick={e => {
        e.stopPropagation();
        setState({ ...state, active: true });
      }}
    >
      <input value={value} onChange={e => onChange && onChange(e.target.value)} />
    </div>
  );
};
