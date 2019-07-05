/*
 * @Author: Zhong Jun
 * @Date: 2019-07-04 17:04:13
 */

import { query } from './service';

export default {
  namespace: 'knowledge',

  state: {
    article: {},
  },

  effects: {
    *fetchArticle({ payload }, { call, put }) {
      const res = yield call(query, payload);
      yield put({
        type: 'updateState',
        payload: {
          article: res,
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
