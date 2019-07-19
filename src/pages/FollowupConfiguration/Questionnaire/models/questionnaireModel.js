import { queryTaskTemplates } from '../Create/service';
import { fakeQuestionnarieData } from '@/services/api';
import { QUESTION_DATASET_SYMBOL } from '../Create/Step2/types';

export const MODEL = 'questionnaire_model';
export const DATASET = 'dataset';
export const TITLE = 'title';
export const SCORE = 'score';
export const TYPE = 'type';
export const ID = 'id';

// const { single, multiple, dropdown, blank, score, remark, } = QUESTION_SYMBOL
const { normal } = QUESTION_DATASET_SYMBOL;
export const getDataset = (data = {}) => {
  return {
    [ID]: Math.random(),
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
    templateList: [
      {
        id: '11211132221',
        title: '妊娠高血压产后复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11211142221',
        title: '高危复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11216112221',
        title: '产后42天复诊复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11211712221',
        title: '妊娠糖尿病产后复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
    ],
    questionList: [],
    doesNewQuestionPlaceBefore: false,
    questionType: '',
    hoverTargetQuestionId: '',
    clickTargetQuestionId: '',
    questionnaireTitle: '',
    latestQuestionId: '',
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
                questionList: [],
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

    *addNewQuestion({ payload = {} }, { put, select }) {
      const { doesNewQuestionPlaceBefore } = payload;
      const {
        questionList,
        questionType,
        hoverTargetQuestionId,
        clickTargetQuestionId,
      } = yield select(state => state.questionnaire_model);
      const id = Math.random();
      const newQuestion = {
        [TYPE]: questionType,
        [ID]: id,
        [TITLE]: '请输入题目标题',
        [SCORE]: 0,
        jumps: [],
        [DATASET]: ['1', '2', '3'].includes(questionType) && [getDataset(), getDataset()],
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
      const { questionList } = yield select(state => state.questionnaire_model);
      const delIndex = questionList.findIndex(_ => _[ID] === questionId);
      questionList.splice(delIndex, 1);
      yield put({
        type: `updateState`,
        payload: {
          questionList,
        },
      });
    },
    *updateQuestion({ payload }, { put, select }) {
      const { id } = payload;
      const { questionList } = yield select(state => state.questionnaire_model);

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
      const { questionList } = yield select(state => state.questionnaire_model);
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
      const { questionList } = yield select(state => state.questionnaire_model);
      const question = questionList.find(q => q[ID] === questionId);
      const dataset = question && question[DATASET];
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
      const { questionList } = yield select(state => state.questionnaire_model);
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
      // console.log(payload)
      return {
        ...state,
        ...payload,
      };
    },
  },
};
