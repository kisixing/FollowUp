import { MODEL } from '../models/questionnaireModel';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { previewData } = props;
  const {
    questionnaireTitle = '',
    // questionnaireSubTitle = '',
    // questionList = []
  } = previewData;
  // const { dispatch } = props;
  // const [state, setState] = useState({});
  // const { } = state;
  return (
    <div style={{ background: 'white', padding: '10px', textAlign: 'left' }}>
      {questionnaireTitle}
    </div>
  );
});
