import { pathMatchRegexp } from '@/utils/utils';

export default {
  namespace: 'QuestionnaireCreation_model',

  state: {
    currentStep: 0,
    steps: [
      {
        title: '选择问卷类型',
        step: 'step1',
        description: '选择问卷类型',
        icon: '',
        status: 'process',
        // 可选：wait process finish error
      },
      {
        title: '编辑问卷',
        step: 'step2',
        description: '编辑问卷',
        icon: '',
        status: 'wait',
      },
      {
        title: '发布问卷',
        step: 'step3',
        description: '发布问卷',
        icon: '',
        status: 'wait',
      }
    ],
  },

  effects: {
    *setSteps({ payload }, { put, select }) {
      const steps = yield select(_ => _.QuestionnaireCreation_model.steps);
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
        const isMatch = pathMatchRegexp('/followup-configuration/questionnaire/create/:step', pathname);
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
