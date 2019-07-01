import { objFormatArr } from '@/utils/utils';
import request from "@/utils/request";
import { stringify } from "qs";

export default {
  namespace: 'taskStatistics_model',

  state: {
    selectedTags: {
      category: [],
      secondaryCategory: [],
    },
    tabActiveKey: '',
    lists: [],
  },

  effects: {
    *query({ payload }, { call, put }) {
      const { status, type } = payload;
      let params = payload;
      if (status === 'all' && !type) {
        params = {};
      }
      if (status === 'all' && type) {
        params = { type };
      }
      const res = yield call(request, `/api/list?${stringify(params)}`);
      yield put({
        type: 'updateState',
        payload: {
          tabActiveKey: payload.status || 'all',
          lists: res.data,
        },
      });
    },
    *removeTag({ payload }, { put, select }) {
      const { tabActiveKey, selectedTags } = yield select(_ => _.followupLists);
      const types = Object.keys(selectedTags);
      let tags = [];
      for (let i = 0; i < types.length; i++) {
        const array = selectedTags[types[i]];
        const index = array.findIndex(tag => tag === payload);
        if (index > -1) {
          array.splice(index, 1);
          tags = {
            ...selectedTags,
            [types[i]]: array,
          };
        }
      }
      yield put({
        type: 'updateState',
        payload: {
          selectedTags: tags,
        },
      });
      // update lists
      const typeArr = objFormatArr(tags).join(',');
      yield put({
        type: 'query',
        payload: {
          status: tabActiveKey,
          type: typeArr,
        },
      });
    },
    *updateTags({ payload }, { put, select }) {
      const { tabActiveKey, selectedTags } = yield select(_ => _.followupLists);
      const { target, checkedTags } = payload;
      const tags = {
        ...selectedTags,
        [target]: checkedTags,
      };
      yield put({
        type: 'updateState',
        payload: {
          selectedTags: tags,
        },
      });
      // update lists
      const typeArr = objFormatArr(tags).join(',');
      yield put({
        type: 'query',
        payload: {
          status: tabActiveKey,
          type: typeArr,
        },
      });
    },
    // *removeTag({ payload }, { call, put }) {},
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
