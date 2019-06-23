/* eslint-disable no-plusplus */

export default {
  namespace: 'followupLists',

  state: {
    selectedTags: {
      category: [],
      secondaryCategory: [],
    },
    lists: [
      {
        id: '4545454',
        title: '高危复诊提醒',
        avatar: '',
        status: {
          code: 1,
          dec: '运行中',
        },
        allFollowup: 50,
        todayFollowup: 25,
      },
      {
        id: '454545421',
        title: '高危妊娠复诊提醒',
        avatar: '',
        status: {
          code: 1,
          dec: '运行中',
        },
        allFollowup: 45,
        todayFollowup: 20,
      },
      {
        id: '4545454211',
        title: '高危高血糖复诊提醒',
        avatar: '',
        status: {
          code: 1,
          dec: '运行中',
        },
        allFollowup: 45,
        todayFollowup: 20,
      },
      {
        id: '4545415421',
        title: '高危复诊提醒1',
        avatar: '',
        status: {
          code: 1,
          dec: '运行中',
        },
        allFollowup: 45,
        todayFollowup: 20,
      },
      {
        id: '4545451421',
        title: '高危复诊提醒1',
        avatar: '',
        status: {
          code: 1,
          dec: '运行中',
        },
        allFollowup: 45,
        todayFollowup: 20,
      },
    ],
  },

  effects: {
    *removeTag({ payload }, { put, select }) {
      const selectedTags = yield select(_ => _.followupLists.selectedTags);
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
      const selectedTags = yield select(_ => _.followupLists.selectedTags);
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
