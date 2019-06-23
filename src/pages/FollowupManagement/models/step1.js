/* eslint-disable no-plusplus */

export default {
  namespace: 'step1',

  state: {
    selectedTags: {
      category: [],
      secondaryCategory: [],
    },
    lists: [
      {
        id: '11112222',
        title: '高危妊娠孕妇复诊管理',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '11111222',
        title: '妊娠糖尿病产后复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '111112221',
        title: '产后42天复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
      {
        id: '1121112221',
        title: '妊娠高血压产后复诊',
        description: '自动发送复诊提醒 · 管理复诊结果',
        avatar: '',
      },
    ],
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
    *removeTag({ payload }, { put, select }) {
      const selectedTags = yield select(_ => _.step1.selectedTags);
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
    },
    *updateTags({ payload }, { put, select }) {
      const selectedTags = yield select(_ => _.step1.selectedTags);
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
