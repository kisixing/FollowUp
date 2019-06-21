import { pathMatchRegexp } from '@/utils/utils';

export default {
  namespace: 'newFollowupLayout',

  state: {
    currentStep: 0,
    steps: [
      {
        title: '选择任务类型',
        step: 'step1',
        description: '选择任务类型',
        icon: '',
        status: 'process',
        // 可选：wait process finish error
      },
      {
        title: '选择对象',
        step: 'step2',
        description: '选择对象',
        icon: '',
        status: 'wait',
      },
      {
        title: '编辑任务内容',
        step: 'step3',
        description: '任务内容',
        icon: '',
        status: 'wait',
      },
      {
        title: '发布',
        step: 'step4',
        description: '发布',
        icon: '',
        status: 'wait',
      },
    ],
  },

  effects: {
    *setSteps({ payload }, { put, select }) {
      const steps = yield select(_ => _.newFollowupLayout.steps);
      const index = steps.findIndex(item => item.step === payload);
      const newSteps = steps.map((item, i) => {
        let { status } = item;
        if (i === index) {
          status = 'process';
        }
        return { ...item, status };
      });

      yield put({
        type: 'updateSteps',
        payload: {
          index,
          steps: newSteps,
        },
      });
    },
  },

  reducers: {
    updateSteps(state, { payload }) {
      return {
        ...state,
        currentStep: payload.index,
        steps: payload.steps,
      };
    },
  },

  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const isMatch = pathMatchRegexp('/followup-management/create/:step', pathname);
        if (isMatch) {
          const step = isMatch[1];
          dispatch({
            type: 'setSteps',
            payload: step,
          });
        }
      });
    },
  },
};
