import { Icon } from 'antd';
// import { throttle } from "lodash";
import { MODEL, DATASET, TITLE, ID, TYPE, dispatchCreator } from '../../models/questionnaireModel';
import styles from './QuestionItem.less';
import QuestionStategies from './QuestionStategies';
// import eventEmitter from '@/utils/Event';
import useScroll from '@/utils/useScroll';
import { getLabel } from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';

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
  const { hoverTargetQuestionId, clickTargetQuestionId, latestQuestionId } = props[MODEL];
  const type = question[TYPE];
  const title = question[TITLE];
  const id = question[ID];
  const dataset = question[DATASET];

  const [state, setState] = useState({
    doesNewQuestionPlaceBefore: false,
  });

  const [ref, scroll] = useScroll();
  // useEffect(() => {
  //   eventEmitter.on('removeFocus', () => {
  //     _dispatch('updateState', { clickTargetQuestionId: '' })
  //   });
  //   return () => {
  //     eventEmitter.off('removeFocus');
  //   };
  // });
  useEffect(() => {
    if (latestQuestionId === id) {
      scroll();
      _dispatch('updateState', { latestQuestionId: '' });
    }
  }, [latestQuestionId]);
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

  // const [state, setState] = useState({});
  // const { } = state;
  const isHoverTarget = hoverTargetQuestionId === id;
  const isClickTarget = clickTargetQuestionId === id;
  const { doesNewQuestionPlaceBefore } = state;
  return (
    <div
      ref={ref}
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
          // scroll();
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
          {`${index + 1}. ${getLabel(type)}`}
          <Icon
            type="delete"
            onClick={e => {
              _dispatch('removeQuestion', { questionId: id });
              e.stopPropagation();
            }}
            className={styles.delete}
          />
        </div>
        <QuestionStategies
          questionType={type}
          title={title}
          updateTitle={updateTitle}
          dataset={dataset}
          id={id}
          updateDataset={updateDataset}
          isClickTarget={isClickTarget}
        />
      </div>
    </div>
  );
});
