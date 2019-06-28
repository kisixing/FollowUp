/* eslint-disable no-plusplus */

import { queryTaskTemplates } from '../service';

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

export default {
  namespace: 'questionnaire_model',

  state: {
    selectedTags: {
      category: '',
      secondaryCategory: '',
    },
    lists: [],
    category: [
      {
        name: '科室随访',
        subType: ['高危妊娠', '妊娠糖尿病', '妊娠高血压', '产后随访', '术后随访'],
      },
      {
        name: '专项随访',
        subType: ['报告异常随访', '专项检测随访'],
      },
      {
        name: '关怀类随访',
        subType: ['宣教类', '节日问候', '活动通知'],
      },
      {
        name: '管理类随访',
        subType: ['满意度调查', '投诉建议'],
      },
      {
        name: '科研随访',
        subType: ['孕妇研究', '新生儿研究'],
      },
    ],
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
    questionList: []
  },

  effects: {
    *query({ payload }, { call, put }) {
      const res = yield call(queryTaskTemplates, payload);
      yield put({
        type: 'updateState',
        payload: {
          lists: res.data,
        },
      });
    },
    *removeTag({ payload }, { put, select }) {
      const selectedTags = yield select(_ => _.questionnaire_model.selectedTags);
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
      const { selectedTags, category } = yield select(_ => _.questionnaire_model);
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

    pushQuestionList(state, { payload }) {
      state.questionList.push(payload)
      return {
        ...state
      }
    }
  },
};
