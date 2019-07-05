/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */

export default {
  namespace: 'step1',

  state: {
    lists: [],
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

  effects: {},

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
