import { pathMatchRegexp } from '@/utils/utils';
import { appRouters } from '@/../config/router.config';
import EventEmitter from '@/utils/Event';
import { getValueOfFirstItem } from '@/utils/utils';
const configurationRouters = appRouters.routes.find(_ => _.name === 'followup-configuration');
const routes = (configurationRouters && configurationRouters.routes) || [];
/**
 * questionnaire
 * mission-care
 * medium
 */
const names = routes.map(_ => _.name);
// debugger
let tabListMap = {
  questionnaire: ['全部', '运行中', '暂停', '草稿箱', '回收站'],
  medium: ['全部', '科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'],
};
Object.entries(tabListMap).forEach(([k, v]) => {
  tabListMap[k] = v.map((_, index) => ({
    tab: _,
    key:
      index === 0
        ? 'all'
        : Math.random()
            .toString(16)
            .slice(2),
  }));
});
export default {
  namespace: 'followupConfiguration_model',
  state: {
    tabList: [],
    configurationName: '',
    tabActiveKey: '',
  },
  effects: {
    *initState({ configurationName }, { call, put }) {
      const tabList = tabListMap[configurationName] || [];
      yield put({
        type: 'setState',
        payload: {
          configurationName,
          tabList,
          tabActiveKey: getValueOfFirstItem(tabList, 'key', ''),
        },
      });
    },
    *search(_, { select }) {
      const name = yield select(({ followupConfiguration_model }) => {
        return followupConfiguration_model.configurationName;
      });
      EventEmitter.emit('folloupConfiguration:search', 'name');
    },
  },
  reducers: {
    setState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    a({ dispatch, history }) {
      history.listen(({ pathname }) => {
        for (let i = 0; i < names.length; i++) {
          const isMatch = pathMatchRegexp('/followup-configuration/*', pathname);

          if (isMatch) {
            const configurationName = isMatch[1];
            dispatch({
              type: 'initState',
              configurationName,
            });
            break;
          }
        }
      });
    },
  },
};
