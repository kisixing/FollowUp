import { Icon } from 'antd';
import { MODEL, DATASET, TITLE, ID, TYPE, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionItem.less';
import QuestionStategies from './QuestionStategies';

function mapStateToProps(rootState) {
  return { [MODEL]: rootState[MODEL] };
}

// function getQuestionUI(_dispatch) {
//     return question => {

//     };
// }

export default connect(mapStateToProps)(props => {
  const { dispatch, question, index } = props;
  const _dispatch = dispatchCreator(dispatch);
  const { hoverTargetQuestionId, doesNewQuestionPlaceBefore, clickTargetQuestionId } = props[MODEL];
  const type = question[TYPE];
  const title = question[TITLE];
  const id = question[ID];
  const dataset = question[DATASET];
  function updateTitle(value) {
    _dispatch(`updateQuestion`, { ...question, [TITLE]: value });
  }

  function updateDataset(datasetId, label) {
    const newDataset = dataset.map(d => {
      if (d[ID] === datasetId) {
        return { ...d, [F_LABEL]: label };
      }
      return d;
    });

    _dispatch(`updateQuestion`, { ...question, [DATASET]: newDataset });
  }

  function addNewDataset() {
    const oldDataset = Array.isArray(dataset) ? dataset : [];
    oldDataset.push({
      [ID]: Math.random(),
      [F_LABEL]: `选项${oldDataset.length + 1}`,
    });
    _dispatch(`updateQuestion`, {
      ...question,
      dataset: oldDataset,
    });
  }

  // const [state, setState] = useState({});
  // const { } = state;
  const isHoverTarget = hoverTargetQuestionId === id;
  const isClickTarget = clickTargetQuestionId === id;

  return (
    <div
      className={styles.container}
      style={{
        [`border${doesNewQuestionPlaceBefore ? 'Top' : 'Bottom'}`]: `5px solid ${
          isHoverTarget ? 'red' : 'transparent'
        }`,
      }}
    >
      <div
        style={{ border: `2px solid ${isClickTarget ? 'skyblue' : 'transparent'}` }}
        className={styles.content}
        onDrop={e => {
          e.preventDefault();
          // e.stopPropagation()
          // debugger
          _dispatch('addNewQuestion');
        }}
        onClick={() =>
          _dispatch('updateState', { clickTargetQuestionId: id, clickTargetQuestionIndex: index })
        }
        onDragOver={e => {
          e.preventDefault();
          const { target, clientY } = e;
          const rect = target.getBoundingClientRect();
          const _doesNewQuestionPlaceBefore = clientY < rect.height / 2 + rect.top;
          _dispatch('updateState', {
            doesNewQuestionPlaceBefore: _doesNewQuestionPlaceBefore,
            hoverTargetQuestionId: question.id,
          });
        }}
        onDragLeave={() => {
          _dispatch('updateState', { hoverTargetQuestionId: '' });
        }}
      >
        <div>
          {`${index + 1}. ${question.type}`}
          <Icon
            type="delete"
            onClick={() => _dispatch('removeQuestion', { questionId: id })}
            className={styles.delete}
          />
        </div>
        <QuestionStategies
          questionType={type}
          title={title}
          updateTitle={updateTitle}
          dataset={dataset}
          id={id}
          addNewDataset={addNewDataset}
          updateDataset={updateDataset}
          isClickTarget={isClickTarget}
        />
      </div>
    </div>
  );
});
