import { MODEL } from '../models/questionnaireModel';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(() => {
  // const { dispatch } = props;
  // const [state, setState] = useState({});
  // const { } = state;
  return <div>desktop</div>;
});
