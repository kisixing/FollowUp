import { MODEL } from '../models/questionnaireModel';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { previewData } = props;
  const { questionnaireTitle = '', questionnaireSubTitle = '', questionList = [] } = previewData;
  // const { dispatch } = props;
  // const [state, setState] = useState({});
  // const { } = state;
  return (
    <div style={{ background: 'white', padding: '10px', textAlign: 'left', fontSize: '16px' }}>
      <div style={{ fontSize: '18px', padding: '20px 0' }}>{questionnaireTitle}</div>
      <div style={{ fontSize: '14px', paddingBottom: '20px', color: '#999' }}>
        {questionnaireSubTitle}
      </div>

      {questionList.map(({ title }, index) => {
        return (
          <div style={{ paddingBottom: '20px' }}>
            {index}.{title}
          </div>
        );
      })}
    </div>
  );
});
