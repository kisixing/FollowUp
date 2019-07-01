import { Input, Button } from 'antd';
import { MODEL, SCORE, DATASET, TITLE, ID, TYPE } from '../models';

function mapStateToProps(rootState) {
  return rootState[MODEL];
}

function getQuestionUI(_dispatch) {
  return question => {
    const type = question[TYPE];
    const title = question[TITLE];
    const id = question[ID];
    const dataset = question[DATASET];
    const score = question[SCORE];
    function updateTitle(value) {
      _dispatch(`updateQuestion`, { ...question, [TITLE]: value });
    }
    function updateDataset(datasetId, label) {
      const itemOfDataset = dataset.find(d => d[ID] === datasetId);
      itemOfDataset[F_LABEL] = label;
      _dispatch(`updateQuestion`, question);
    }
    function addNewDataset() {
      const oldDataset = Array.isArray(dataset) ? dataset : [];
      oldDataset.push({
        [ID]: Math.random(),
        [F_LABEL]: '',
      });
      _dispatch(`updateQuestion`, {
        ...question,
        dataset: oldDataset,
      });
    }

    return {
      单选题: () => {
        return (
          <div>
            <Input value={title} onChange={e => updateTitle(e.target.value)} />
            {dataset &&
              dataset.map(d => {
                return (
                  <div key={id}>
                    <div>圈</div>
                    <Input onChange={e => updateDataset(d[ID], e.target.value)} />
                  </div>
                );
              })}
            <Button onClick={() => addNewDataset()}>添加选项</Button>
          </div>
        );
      },
      多选题: () => {
        return <div>s</div>;
      },
      填空题: () => {
        return <div>s</div>;
      },
      下拉题: () => {
        return <div>s</div>;
      },
      打分提: () => {
        return <div>{score}</div>;
      },
      段落说明: () => {
        return <div>s</div>;
      },
    }[type];
  };
}

export default connect(mapStateToProps)(props => {
  const { dispatch, question } = props;
  const _dispatch = (actionType, payload) => {
    dispatch({
      type: `${MODEL}/${actionType}`,
      payload,
    });
  };
  const UI = getQuestionUI(_dispatch)(question);
  // const [state, setState] = useState({});
  // const { } = state;
  return (
    <div>
      <UI />
    </div>
  );
});
