import { Icon } from 'antd';
// import { throttle } from "lodash";
import { MODEL, DATASET, TITLE, ID, TYPE, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionItem.less';
import QuestionStategies from './QuestionStategies';
// import eventEmitter from '@/utils/Event';

let lastY = 0;

// let flag = true;
// function removeActive() {
//   eventEmitter.emit('removeFocus');
// }
// if (flag) {
//   document.addEventListener('click', removeActive, true);
//   flag = false;
// }

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
  const { hoverTargetQuestionId, clickTargetQuestionId } = props[MODEL];
  const type = question[TYPE];
  const title = question[TITLE];
  const id = question[ID];
  const dataset = question[DATASET];

  const [state, setState] = useState({
    doesNewQuestionPlaceBefore: false,
  });
  // useEffect(() => {
  //   eventEmitter.on('removeFocus', () => {
  //     _dispatch('updateState', { clickTargetQuestionId: '' })
  //   });
  //   return () => {
  //     eventEmitter.off('removeFocus');
  //   };
  // });

  function updateTitle(value) {
    _dispatch(`updateQuestion`, { id: question.id, [TITLE]: value });
  }

  const onDragOver = e => {
    e.preventDefault();
    let _doesNewQuestionPlaceBefore = false;

    const { clientY } = e;
    if (clientY === lastY) {
      return;
    }
    if (clientY < lastY) {
      _doesNewQuestionPlaceBefore = true;
    }

    lastY = clientY;
    // _dispatch('updateState', {
    //   doesNewQuestionPlaceBefore: _doesNewQuestionPlaceBefore,
    //   hoverTargetQuestionId: question.id,
    // });
    setState({ ...state, doesNewQuestionPlaceBefore: _doesNewQuestionPlaceBefore });
  };

  function updateDataset(datasetId, label) {
    const newDataset = dataset.map(d => {
      if (d[ID] === datasetId) {
        return { ...d, [F_LABEL]: label };
      }
      return d;
    });

    _dispatch(`updateQuestion`, { id: question.id, [DATASET]: newDataset });
  }

  function addNewDataset() {
    const oldDataset = Array.isArray(dataset) ? dataset : [];
    const newDataset = oldDataset.concat({
      [ID]: Math.random(),
      [F_LABEL]: `选项${oldDataset.length + 1}`,
    });
    _dispatch(`updateQuestion`, {
      id: question.id,
      dataset: newDataset,
    });
  }

  // const [state, setState] = useState({});
  // const { } = state;
  const isHoverTarget = hoverTargetQuestionId === id;
  const isClickTarget = clickTargetQuestionId === id;
  const { doesNewQuestionPlaceBefore } = state;
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

          _dispatch('addNewQuestion', { doesNewQuestionPlaceBefore });
        }}
        onClick={e => {
          e.stopPropagation();
          _dispatch('updateState', { clickTargetQuestionId: id });
        }}
        onDragEnter={() => {
          _dispatch('updateState', {
            hoverTargetQuestionId: id,
          });
        }}
        onDragOver={onDragOver}
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
