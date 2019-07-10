export default {
  namespace: 'onlineService_model',
  state: {
    chattingList: [
      {
        name: '李志斌',
        text: '胡志勇主任什么时候出诊',
        num: 1,
        date: +new Date(),
        id: 1,
      },
      {
        name: '黄庆仁',
        text: '医院有停车场吗？',
        num: 0,
        date: +new Date() - 5 * 60 * 1000,
        id: 2,
      },

      {
        name: '刘志',
        text: '吴医生下午还有号嘛？',
        num: 2,
        date: +new Date() - 5 * 60 * 1000,
        id: 3,
      },
    ],
    chattingId: 2,
    activeKey: '1',
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    // *fetchData({ payload }, { call }) {
    //     request()
    // },
    *changeChatting({ chattingId }, { put, select }) {
      const { onlineService_model } = yield select();
      onlineService_model.chattingList.forEach(_ => {
        if (_.id === chattingId) {
          // eslint-disable-next-line no-param-reassign
          _.num = 0;
        }
      });
      yield put({
        type: 'setState',
        payload: {
          chattingId,
          chattingList: onlineService_model.chattingList,
        },
      });
    },
  },
};
