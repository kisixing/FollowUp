export default {
  namespace: 'followupLists',

  state: {
    selectedTags: {
      category: ['科室随访', '专项随访'],
      secondaryCategory: ['高危妊娠管理'],
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
        id: '4545454211',
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
    // *addTag({ payload }, { call, put }) {},
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
