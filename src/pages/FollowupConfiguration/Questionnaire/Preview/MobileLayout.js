import { MODEL } from '../models/questionnaireModel';
import { QUESTION_SYMBOL } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';

const { remark } = QUESTION_SYMBOL;

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

export default connect(mapStateToProps)(props => {
  const { previewData, Strategies } = props;
  const { questionnaireTitle = '', questionnaireSubTitle = '', questionList = [] } = previewData;
  // const { dispatch } = props;
  const [state, setState] = useState({
    formData: {},
  });
  const setFormData = (key, value) => {
    setState({ ...state, formData: { ...state.formData, [key]: value } });
  };
  const { formData } = state;
  return (
    <div style={{ background: 'white', padding: '10px', textAlign: 'left', fontSize: '16px' }}>
      <div style={{ fontSize: '18px', padding: '20px 0' }}>{questionnaireTitle}</div>
      <div style={{ fontSize: '14px', paddingBottom: '20px', color: '#999' }}>
        {questionnaireSubTitle}
      </div>

      {questionList.map((question, index) => {
        const { title, compulsory, id, type } = question;
        return (
          <div style={{ paddingBottom: '20px' }} key={id}>
            {type !== remark && (
              <div>
                {index}.{title} {compulsory ? <span style={{ color: 'red' }}>*</span> : null}
              </div>
            )}
            <Strategies
              {...question}
              onChange={value => setFormData(id, value)}
              value={formData[id]}
            />
          </div>
        );
      })}
    </div>
  );
});
