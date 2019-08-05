import { MODEL } from '../models/questionnaireModel';
import DesktopLayout from './Layout';
import Strategies from './desktopStrategies';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(() => {
  // const { dispatch } = props;
  // const [state, setState] = useState({});
  // const { } = state;
  return <DesktopLayout Strategies={Strategies} />;
});
