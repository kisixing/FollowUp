import { Input, Button, Icon } from 'antd';
import DatasetItem from './DatasetItem';
import { ID } from '../../models/questionnaireModel';

const MyInput = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      style={{ margin: '5px 0', border: '0', padding: '5px', width: '100%' }}
    />
  );
};
function QuestionType1(props) {
  const { title, updateTitle, dataset, addNewDataset, updateDataset, isClickTarget, id } = props;
  const DisplayButton = (
    <div style={{ opacity: isClickTarget ? '1' : '0', transition: 'all 0.5s' }}>
      <Button onClick={() => addNewDataset()}>添加选项</Button>
    </div>
  );
  return (
    <div>
      <MyInput value={title} onChange={e => updateTitle(e.target.value)} />
      {dataset &&
        dataset.map(d => {
          return (
            <DatasetItem
              key={d[ID]}
              datasetId={d[ID]}
              questionId={id}
              value={d[F_LABEL]}
              onChange={e => updateDataset(d[ID], e.target.value)}
            />
          );
        })}
      {DisplayButton}
    </div>
  );
}

function QuestionType2(props) {
  const { questionType, title, updateTitle } = props;

  return (
    <div>
      <MyInput value={title} onChange={e => updateTitle(e.target.value)} />
      {questionType === '打分题' && (
        <div>
          <Icon type="star" />
          <Icon type="star" />
          <Icon type="star" />
          <Icon type="star" />
          <Icon type="star" />
        </div>
      )}
      {questionType === '填空题' && <Input value="" />}
    </div>
  );
}
export default props => {
  const { questionType } = props;
  const RenderType = {
    单选题: QuestionType1,
    多选题: QuestionType1,
    下拉题: QuestionType1,
    填空题: QuestionType2,
    打分题: QuestionType2,
    段落说明: QuestionType2,
  }[questionType];
  return <RenderType {...props} />;
};
