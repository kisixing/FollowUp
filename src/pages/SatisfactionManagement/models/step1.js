/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */

import { queryTaskTemplates } from '../service';
import { category, secondaryCategoryData } from './lists';

export default {
  namespace: 'step1',

  state: {
    selectedTags: {
      category: '',
      secondaryCategory: '',
    },
    lists: [],
    category,
    secondaryCategory: secondaryCategoryData,
    templateList: [
      {
        id: '11211132221',
        title: '妊娠高血压产后复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11211142221',
        title: '高危复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11216112221',
        title: '产后42天复诊复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
      {
        id: '11211712221',
        title: '妊娠糖尿病产后复诊提醒',
        hospital: '华侨医院',
        description: '自动发送复诊提醒 · 管理复诊结果',
      },
    ],
  },

  effects: {
    *query(action, { call, put }) {
      const res = yield call(queryTaskTemplates);

      yield put({
        type: 'updateState',
        payload: {
          lists: res.data.map(_ => ({ ..._, title: _.title.replace('随访', '满意度') })),
        },
      });
    },
    *removeTag({ payload }, { put, select }) {
      const selectedTags = yield select(_ => _.step1.selectedTags);
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
          type: tags.category,
          secondaryType: tags.secondaryCategory,
        },
      });
    },
    *updateTags({ payload }, { put, select }) {
      const { selectedTags, category } = yield select(_ => _.step1);
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
          type: tags.category,
          secondaryType: tags.secondaryCategory,
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
