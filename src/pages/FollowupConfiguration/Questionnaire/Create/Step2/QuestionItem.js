import { Input, Button, Icon } from 'antd';
import { MODEL, DATASET, TITLE, ID, TYPE, dispatchCreator } from '../models';
// import styles from './QuestionItem.less';

function mapStateToProps(rootState) {
  return { [MODEL]: rootState[MODEL] };
}

// function getQuestionUI(_dispatch) {
//     return question => {

//     };
// }

export default connect(mapStateToProps)(props => {
  const { dispatch, question } = props;
  const _dispatch = dispatchCreator(dispatch);
  const { hoverTargetQuestionId, doesNewQuestionPlaceBefore } = props[MODEL];
  const type = question[TYPE];
  const title = question[TITLE];
  const id = question[ID];
  const dataset = question[DATASET];
  function updateTitle(value) {
    _dispatch(`updateQuestion`, { ...question, [TITLE]: value });
  }
  function updateDataset(datasetId, label) {
    const newDataset = dataset.map(d => {
      if (d[ID] === d) {
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
      [F_LABEL]: '',
    });
    _dispatch(`updateQuestion`, {
      ...question,
      dataset: oldDataset,
    });
  }
  // const [state, setState] = useState({});
  // const { } = state;
  const isTarget = hoverTargetQuestionId === id;
  return (
    <div
      style={{
        [`border${doesNewQuestionPlaceBefore ? 'Top' : 'Bottom'}`]: `5px solid ${
          isTarget ? 'red' : 'transparent'
        }`,
      }}
    >
      <div
        style={{ background: 'white', padding: '5px', margin: '10px 0' }}
        onDrop={e => {
          e.preventDefault();
          // e.stopPropagation()
          // debugger
          _dispatch('addNewQuestion');
        }}
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
        <div>{question.type}</div>
        {
          {
            单选题: (
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
            ),
            多选题: (
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
            ),
            下拉题: (
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
            ),
            填空题: (
              <div>
                <Input value={title} onChange={e => updateTitle(e.target.value)} />
              </div>
            ),
            打分题: (
              <div>
                <Input value={title} onChange={e => updateTitle(e.target.value)} />
                <Icon type="star" />
                <Icon type="star" />
                <Icon type="star" />
                <Icon type="star" />
                <Icon type="star" />
              </div>
            ),
            段落说明: (
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
              </div>
            ),
          }[type]
        }
      </div>
    </div>
  );
});
