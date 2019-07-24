import { queryTaskTemplates } from '../Create/service';
import { fakeQuestionnarieData } from '@/services/api';
import {
  QUESTION_DATASET_SYMBOL,
  QUESTION_SYMBOL,
} from '@/pages/FollowupConfiguration/Questionnaire/questionTypes';

export const MODEL = 'questionnaire_model';
export const DATASET = 'dataset';
export const TITLE = 'title';
export const SCORE = 'score';
export const TYPE = 'type';
export const ID = 'id';

function getId() {
  return Math.random()
    .toString(16)
    .slice(2);
}

const { single, multiple, dropdown } = QUESTION_SYMBOL;
const { normal } = QUESTION_DATASET_SYMBOL;
export const getDataset = (data = {}) => {
  return {
    [ID]: getId(),
    [F_LABEL]: `选项`,
    [TYPE]: normal,
    score: 0,
    ...data,
  };
};
export const dispatchCreator = dispatch => {
  return (actionType, payload) => {
    dispatch({
      type: `${MODEL}/${actionType}`,
      payload,
    });
  };
};

export default {
  namespace: MODEL,

  state: {
    questionnaireTitle: '',
    questionnaireSubTitle: '',
    questionList: [],
    doesNewQuestionPlaceBefore: false,
    questionType: '', // 将要新增的问题类型
    hoverTargetQuestionId: '',
    clickTargetQuestionId: '',
    latestQuestionId: '', // 新增的问题id,滚动后清空
    questionToScroll: '', // 预览滚动
    previewData: {
      questionnaireTitle: '',
      questionnaireSubTitle: '',
      questionList: [],
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(fakeQuestionnarieData);
      const { edit } = payload;
      yield put(
        edit
          ? {
              type: 'updateState',
              payload: response,
            }
          : {
              type: 'updateState',
              payload: {
                questionnaireTitle: '请填写问卷标题',
                questionnaireSubTitle: '感谢您能抽出几分钟参加本问卷，现在让我们开始吧',
                // questionList: [],
              },
            }
      );
    },

    *query({ payload }, { call, put }) {
      const res = yield call(queryTaskTemplates, payload);
      yield put({
        type: 'updateState',
        payload: {
          lists: res.data,
        },
      });
    },
    *fetchPreviewData({ payload }, { put, select }) {
      // eslint-disable-next-line no-unused-vars
      const { id } = payload;

      const { questionList, questionnaireTitle, questionnaireSubTitle } = yield select(
        state => state[MODEL]
      );
      yield put({
        type: `updateState`,
        payload: {
          previewData: {
            questionList,
            questionnaireTitle,
            questionnaireSubTitle,
          },
        },
      });
    },
    *addNewQuestion({ payload = {} }, { put, select }) {
      const { doesNewQuestionPlaceBefore } = payload;
      const {
        questionList,
        questionType,
        hoverTargetQuestionId,
        clickTargetQuestionId,
      } = yield select(state => state[MODEL]);
      const id = getId();
      const newQuestion = {
        [TYPE]: questionType,
        [ID]: id,
        [TITLE]: '请输入题目标题',
        [SCORE]: 0,
        jumps: [],
        compulsory: false,
        [DATASET]: [single, multiple, dropdown].includes(questionType) && [
          getDataset(),
          getDataset(),
        ],
      };
      // 拖拽添加
      if (hoverTargetQuestionId) {
        let index = questionList.findIndex(q => q.id === hoverTargetQuestionId);
        // eslint-disable-next-line no-unused-expressions
        doesNewQuestionPlaceBefore || (index += 1);
        questionList.splice(index, 0, newQuestion);

        // 点击添加
      } else if (clickTargetQuestionId) {
        const index = questionList.findIndex(q => q.id === clickTargetQuestionId) + 1;
        questionList.splice(index, 0, newQuestion);
      } else {
        questionList.push(newQuestion);
      }
      yield put({
        type: `updateState`,
        payload: {
          questionList,
          hoverTargetQuestionId: '',
          clickTargetQuestionId: id,
          latestQuestionId: id,
        },
      });
    },
    *removeQuestion({ payload }, { select, put }) {
      const { questionId } = payload;
      const { questionList, clickTargetQuestionId } = yield select(state => state[MODEL]);
      const delIndex = questionList.findIndex(_ => _[ID] === questionId);
      questionList.splice(delIndex, 1);
      const isClickTarget = clickTargetQuestionId === questionId;
      const next = questionList[delIndex];
      const nextId = (next && next.id) || '';
      yield put({
        type: `updateState`,
        payload: {
          questionList: [...questionList],
          clickTargetQuestionId: isClickTarget ? nextId : clickTargetQuestionId,
          latestQuestionId: isClickTarget ? nextId : '',
        },
      });
    },
    *updateQuestion({ payload }, { put, select }) {
      const { id } = payload;
      const { questionList } = yield select(state => state[MODEL]);
      const newQuestionList = questionList.map(_ => {
        if (_.id === id) {
          return { ..._, ...payload };
        }
        return { ..._ };
      });
      yield put({ type: `updateState`, payload: { questionList: newQuestionList } });
    },
    *addNewDataset({ payload }, { select, put }) {
      const { questionId, data = {} } = payload;
      const { questionList } = yield select(state => state[MODEL]);
      const question = questionList.find(q => q[ID] === questionId);
      const oldDataset = question[DATASET] || [];

      const newDataset = oldDataset.concat(
        getDataset({
          [F_LABEL]: `选项${oldDataset.length + 1}`,
          ...data,
        })
      );
      yield put({
        type: `updateQuestion`,
        payload: {
          id: questionId,
          dataset: newDataset,
        },
      });
    },
    *removeDatasetItem({ payload }, { put, select }) {
      const { questionId, datasetId } = payload;
      const { questionList } = yield select(state => state[MODEL]);
      const question = questionList.find(q => q[ID] === questionId);
      const dataset = question && [...question[DATASET]];
      if (dataset) {
        const delIndex = dataset.findIndex(d => d[ID] === datasetId);
        dataset.splice(delIndex, 1);
        yield put({
          type: `updateQuestion`,
          payload: {
            id: question[ID],
            dataset: [...dataset],
          },
        });
      }
    },
    *updateDateset({ payload }, { put, select }) {
      const { questionId, datasetId, data = {} } = payload;
      const { questionList } = yield select(state => state[MODEL]);
      const question = questionList.find(q => q[ID] === questionId);
      const dataset = question && question[DATASET];
      if (dataset) {
        const target = dataset.find(d => d[ID] === datasetId);
        Object.assign(target, data);
        yield put({
          type: `updateQuestion`,
          payload: {
            id: questionId,
            dataset: [...dataset],
          },
        });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
