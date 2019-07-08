/*
 * @Author: Zhong Jun
 * @Date: 2019-07-04 17:04:13
 */

import { query, queryFAQ } from './service';

export default {
  namespace: 'knowledge',

  state: {
    article: {},
    faq: {},
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
    *fetchFAQ({ payload }, { call, put }) {
      const res = yield call(queryFAQ, payload);
      yield put({
        type: 'updateState',
        payload: {
          faq: res,
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
