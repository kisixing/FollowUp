/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */

import { queryLists } from '../service';

export const secondaryCategoryData = ['全部', '看诊', '住院', '检验检查', '咨询', '手术'];
export const category = [
  {
    name: '全部',
  },
  {
    name: '全院',
  },
  {
    name: '科室',
  },
  {
    name: '医生',
  },
  {
    name: '其他',
  },
].map(_ => ({ ..._, subType: secondaryCategoryData }));
export default {
  namespace: 'satisfactionList',

  state: {
    selectedTags: {
      category: '',
      secondaryCategory: '',
    },
    tabActiveKey: '',
    lists: [],
    category,
    secondaryCategory: secondaryCategoryData,
  },

  effects: {
    *query({ payload }, { call, put }) {
      yield call(queryLists, payload);
      yield put({
        type: 'updateState',
        payload: {
          tabActiveKey: payload.status || 'all',
          lists: [
            '门诊复诊满意度',
            '门诊手术满意度',
            '医院服务满意度',
            '妇科满意度调查',
            '产科满意度调查',
            '内科满意度调查',
            '外科满意度调查',
          ].map(_ => ({
            title: _,
            status: {
              dec: '运行中',
              code: 'running',
            },
            todayFollowup: Math.round(Math.random() * 200),
            allFollowup: Math.round(Math.random() * 1000) + 200,
          })),
        },
      });
    },
    *removeTag({ payload }, { put, select }) {
      const { tabActiveKey, selectedTags } = yield select(_ => _.satisfactionList);
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
        },
      });
    },
    *updateTags({ payload }, { put, select }) {
      const { tabActiveKey, selectedTags, category } = yield select(_ => _.satisfactionList);
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
      yield put({
        type: 'query',
        payload: {
          status: tabActiveKey,
          type: tags.category,
          secondaryType: tags.secondaryCategory,
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
