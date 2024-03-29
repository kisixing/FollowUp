/* eslint-disable no-console */
/* eslint-disable no-plusplus */

import { queryLists1 } from '../service';

const secondaryCategoryData = [
  '高危妊娠',
  '妊娠糖尿病',
  '妊娠高血压',
  '产后随访',
  '术后随访',
  '报告异常随访',
  '专项检测随访',
  '宣教类',
  '节日问候',
  '活动通知',
  '满意度调查',
  '投诉建议',
  '孕妇研究',
  '新生儿研究',
];
const departments = ['产科', '妇科', '肾内科', '泌尿外科', '健康管理中心'];

export default {
  namespace: 'followupLists',

  state: {
    selectedTags: {
      category: '',
      secondaryCategory: '',
    },
    tabActiveKey: '',
    lists: [],
    category: [
      {
        name: '专科随访',
        subType: ['高危妊娠', '妊娠糖尿病', '妊娠高血压', '产后随访', '术后随访'],
      },
      {
        name: '科研随访',
        subType: ['孕妇研究', '新生儿研究'],
      },
      {
        name: '管理类随访',
        subType: ['满意度调查', '投诉建议'],
      },
      {
        name: '专项随访',
        subType: ['报告异常随访', '专项检测随访'],
      },
    ],
    secondaryCategory: secondaryCategoryData,
    departments,
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryLists1, payload);
      yield put({
        type: 'updateState',
        payload: {
          tabActiveKey: payload.status || 'all',
          lists: res.data,
        },
      });
    },
    *removeTag({ payload }, { put, select }) {
      console.log('123', payload);
      const { tabActiveKey, selectedTags } = yield select(_ => _.followupLists);
      const types = Object.keys(selectedTags);
      let tags = [];
      for (let i = 0; i < types.length; i++) {
        const array = selectedTags[types[i]];
        if (array === payload) {
          tags = {
            ...selectedTags,
            [types[i]]: '',
          };
        }
      }
      yield put({
        type: 'updateState',
        payload: {
          selectedTags: tags,
        },
      });

      // 切换二级类目
      const secondaryName = tags.category;
      if (!secondaryName) {
        yield put({
          type: 'updateState',
          payload: {
            secondaryCategory: secondaryCategoryData,
          },
        });
      }

      // update lists
      yield put({
        type: 'query',
        payload: {
          status: tabActiveKey,
          type: tags.category,
          secondaryType: tags.secondaryCategory,
          department: '',
        },
      });
    },
    *updateTags({ payload }, { put, select }) {
      const { tabActiveKey, selectedTags, category } = yield select(_ => _.followupLists);
      const { target, checkedTag } = payload;
      const tags = {
        ...selectedTags,
        [target]: checkedTag,
      };
      yield put({
        type: 'updateState',
        payload: {
          selectedTags: tags,
        },
      });

      // 切换二级类目
      const secondaryName = tags.category;
      if (secondaryName) {
        const secondary = category.filter(e => e.name === secondaryName);
        const secondaryType = secondary[0].subType;
        yield put({
          type: 'updateState',
          payload: {
            secondaryCategory: secondaryType,
          },
        });
      }
      // update lists
      console.log('8888888888', tags);
      yield put({
        type: 'query',
        payload: {
          status: tabActiveKey,
          type: tags.category,
          secondaryType: tags.secondaryCategory,
          department: '',
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
