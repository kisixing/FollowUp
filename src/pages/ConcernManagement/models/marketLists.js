const data = [
  {
    id: '0',
    title: `爱眼日义诊活动`,
    status: {
      code: 'expired',
      dec: '活动过期',
    },
    date: '2019-06-06',
    period: 45,
  },
  {
    id: '1',
    title: `爱牙日护齿讲座`,
    status: {
      code: 'running',
      dec: '运行中',
    },
    date: '2019-09-20',
    period: 45,
  },
];

export default {
  namespace: 'marketLists',

  state: {
    tabActiveKey: '',
    lists: [],
  },

  effects: {
    *query({ payload }, { put }) {
      yield put({
        type: 'updateState',
        payload: {
          tabActiveKey: payload.status || 'all',
          lists: data,
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
