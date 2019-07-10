import { Input, Button, Icon } from 'antd';
import DatasetItem from './DatasetItem';
import { ID } from '../../models/questionnaireModel';
import MyInput from './MyInput';

const QuestionType1 = React.memo(
  props => {
    const { title, updateTitle, dataset, addNewDataset, updateDataset, isClickTarget, id } = props;
    const DisplayButton = (
      <div style={{ opacity: isClickTarget ? '1' : '0', transition: 'all 0.5s' }}>
        <Button onClick={() => addNewDataset()}>添加选项</Button>
      </div>
    );
    return (
      <div>
        <MyInput value={title} onChange={value => updateTitle(value)} />
        {dataset &&
          dataset.map(d => {
            return (
              <DatasetItem
                key={d[ID]}
                datasetId={d[ID]}
                questionId={id}
                value={d[F_LABEL]}
                onChange={value => updateDataset(d[ID], value)}
              />
            );
          })}
        {DisplayButton}
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.title === next.title &&
      prev.isClickTarget === next.isClickTarget &&
      JSON.stringify(prev.dataset) === JSON.stringify(next.dataset)
    );
  }
);

const QuestionType2 = React.memo(
  props => {
    const { questionType, title, updateTitle } = props;
    return (
      <div>
        <MyInput value={title} onChange={value => updateTitle(value)} />
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
  },
  (prev, next) => {
    return prev.title === next.title && prev.questionType === next.questionType;
  }
);
export default React.memo(props => {
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
});
