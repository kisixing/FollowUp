/* eslint-disable no-plusplus */

import { queryTaskTemplates } from '../service';

export const MODEL = 'questionnaire_model';
export const DATASET = 'dataset';
export const TITLE = 'title';
export const SCORE = 'score';
export const TYPE = 'type';
export const ID = 'id';
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
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryTaskTemplates, payload);
      yield put({
        type: 'updateState',
        payload: {
          lists: res.data,
        },
      });
    },

    *addNewQuestion(action, { put, select }) {
      const { questionList, doesNewQuestionPlaceBefore, questionType } = yield select(
        state => state.questionnaire_model
      );
      const newQuestion = {
        [TYPE]: questionType,
        [ID]: Math.random(),
        [TITLE]: '请输入',
      };
      if (doesNewQuestionPlaceBefore) {
        questionList.unshift(newQuestion);
      } else {
        questionList.push(newQuestion);
      }
      yield put({ type: `updateState`, payload: questionList });
    },
    *updateQuestion({ payload }, { put, select }) {
      const { id } = payload;
      const { questionList } = yield select(state => state.questionnaire_model);
      // debugger
      const newQuestionList = questionList.map(_ => {
        if (_.id === id) {
          return payload;
        }
        return _;
      });
      yield put({ type: `updateState`, payload: { questionList: newQuestionList } });
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
