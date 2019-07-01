/* eslint-disable no-plusplus */

import { queryTaskTemplates } from '../service';



export default {
  namespace: 'questionnaire_model',

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
    questionList: []
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
