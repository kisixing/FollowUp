/*
 * @Author: Zhong Jun
 * @Date: 2019-07-02 14:32:06
 */
import { queryPatient, queryBriefHistory, queryTreatmentRecord } from './service';

export default {
  namespace: 'archivesManagement',

  state: {
    patient: {},
    briefHistory: [],
    treatmentRecord: [],
  },

  effects: {
    *fetchPatient({ payload }, { call, put }) {
      const res = yield call(queryPatient, payload);
      yield put({
        type: 'updateState',
        payload: {
          patient: res.data,
        },
      });
    },
    *fetchBriefHistory({ payload }, { call, put }) {
      const res = yield call(queryBriefHistory, payload);
      yield put({
        type: 'updateState',
        payload: {
          briefHistory: res.data,
        },
      });
    },
    *fetchTreatmentRecord({ payload }, { put, call }) {
      const res = yield call(queryTreatmentRecord, payload);
      yield put({
        type: 'updateState',
        payload: {
          treatmentRecord: res.data,
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
