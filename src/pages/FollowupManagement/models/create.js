import request from '@/utils/request';
export default {
  namespace: 'followupCreation_model',

  state: {
    step: 0, // 当前步骤
    lists: [
      {
        id: '11112222',
        title: '高危妊娠孕妇复诊管理',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '11111222',
        title: '妊娠糖尿病产后复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '111112221',
        title: '产后42天复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '1121112221',
        title: '妊娠高血压产后复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
    ],
    reservationDateType: [],
  },

  effects: {
    *fetchDataset({ payload }, { put, call }) {
      const data = yield call(request, '/api/followup/dataset');
      yield put({ type: 'updateState', payload: data });
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
