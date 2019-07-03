import { query } from '../services/logs';

export default {
  namespace: 'logs',

  state: {
    dataSource: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response.data,
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
