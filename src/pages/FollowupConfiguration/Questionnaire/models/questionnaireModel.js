/* eslint-disable no-plusplus */

import router from 'umi/router';
import { queryTaskTemplates } from '../Create/service';

export const MODEL = 'questionnaire_model';
export const DATASET = 'dataset';
export const TITLE = 'title';
export const SCORE = 'score';
export const TYPE = 'type';
export const ID = 'id';

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
    clickTargetQuestionIndex: '',
    questionnaireTitle: '',
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
      const {
        questionList,
        doesNewQuestionPlaceBefore,
        questionType,
        hoverTargetQuestionId,
      } = yield select(state => state.questionnaire_model);
      const newQuestion = {
        [TYPE]: questionType,
        [ID]: Math.random(),
        [TITLE]: '请输入题目标题',
        [DATASET]: [
          {
            [F_LABEL]: '选项1',
            [ID]: Math.random(),
          },
          {
            [F_LABEL]: '选项2',
            [ID]: Math.random(),
          },
        ],
      };
      // 拖拽添加
      if (hoverTargetQuestionId) {
        let index = questionList.findIndex(q => q.id === hoverTargetQuestionId);
        // eslint-disable-next-line no-unused-expressions
        doesNewQuestionPlaceBefore || (index += 1);
        questionList.splice(index, 0, newQuestion);
      } else {
        // 点击添加
        questionList.push(newQuestion);
      }
      yield put({ type: `updateState`, payload: { questionList, hoverTargetQuestionId: '' } });
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
      // debugger
      const newQuestionList = questionList.map(_ => {
        if (_.id === id) {
          return payload;
        }
        return _;
      });
      yield put({ type: `updateState`, payload: { questionList: newQuestionList } });
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
            ...question,
            dataset,
          },
        });
      }
    },
    *editQuestionnaire({ payload }, { put }) {
      const { questionnaireTitle } = payload;
      yield put({
        type: 'updateState',
        payload: {
          questionList: [
            {
              type: '单选题',
              dataset: [
                {
                  label: '选项1',
                  id: Math.random(),
                },
              ],
              id: Math.random(),
              title: '测试单选题',
            },
          ],
          questionnaireTitle,
        },
      });
      router.push('/followup-configuration/questionnaire/create/step2');
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
