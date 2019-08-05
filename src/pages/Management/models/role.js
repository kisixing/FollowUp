import { query, add, update, deleted } from '../services/role';

export default {
  namespace: 'roleManagemant',

  state: {
    dataSource: [],
    selectedRow: {},
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
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      // 增加成功，返回完整的用户列表，并更新
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response,
        },
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      // 更新成功，返回完整的用户列表，并更新
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response,
        },
      });
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleted, payload);
      // 删除成功，返回完整的用户列表，并更新
      yield put({
        type: 'updateState',
        payload: {
          dataSource: response,
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
