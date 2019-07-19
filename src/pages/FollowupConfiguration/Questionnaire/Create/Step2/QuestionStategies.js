import { Input, Button, Icon } from 'antd';
import DatasetItem from './DatasetItem';
import { ID, dispatchCreator } from '../../models/questionnaireModel';
import MyInput from './MyInput';
import { QUESTION_DATASET_SYMBOL } from './types';

const { other, normal } = QUESTION_DATASET_SYMBOL;

const QuestionType1 = React.memo(
  connect(null)(props => {
    const {
      dispatch,
      title,
      updateTitle,
      dataset,
      updateDataset,
      isClickTarget,
      id,
      questionType,
    } = props;
    const _dispatch = dispatchCreator(dispatch);
    const addNewDataset = data => {
      _dispatch('addNewDataset', {
        questionId: id,
        data,
      });
    };
    const DisplayButton = (
      <div style={{ opacity: isClickTarget ? '1' : '0', transition: 'all 0.5s' }}>
        <Button onClick={() => addNewDataset({ type: normal })}>添加选项</Button>
        <Button onClick={() => addNewDataset({ type: other, [F_LABEL]: '其他' })}>
          添加[其他]选项
        </Button>
      </div>
    );
    return (
      <div>
        <MyInput value={title} onChange={value => updateTitle(value)} />
        {dataset &&
          dataset.map(d => {
            return (
              <DatasetItem
                type={questionType}
                key={d[ID]}
                datasetId={d[ID]}
                questionId={id}
                datasetType={d.type}
                value={d[F_LABEL]}
                onChange={value => updateDataset(d[ID], value)}
              />
            );
          })}
        {DisplayButton}
      </div>
    );
  }),
  (prev, next) => {
    const a =
      prev.title === next.title &&
      prev.isClickTarget === next.isClickTarget &&
      JSON.stringify(prev.dataset) === JSON.stringify(next.dataset);
    return a;
  }
);

const QuestionType2 = React.memo(
  props => {
    const { questionType, title, updateTitle } = props;
    return (
      <div>
        <MyInput value={title} onChange={value => updateTitle(value)} />
        {questionType === '5' && (
          <div>
            {Array(5)
              .fill('')
              .map(() => (
                <Icon type="star" key={Math.random()} style={{ fontSize: '16px', margin: '5px' }} />
              ))}
          </div>
        )}
        {questionType === '4' && <Input value="" />}
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
    1: QuestionType1,
    2: QuestionType1,
    3: QuestionType1,
    4: QuestionType2,
    5: QuestionType2,
    6: QuestionType2,
  }[questionType];
  return <RenderType {...props} />;
});
