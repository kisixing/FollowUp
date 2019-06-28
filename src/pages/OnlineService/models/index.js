import request from '@/utils/request'
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
                name: '李志斌',
                text: '胡志勇主任什么时候出诊',
                num: 1,
                date: +new Date() - 5 * 60 * 1000,
                id: 2
            },

            {
                name: '李志斌',
                text: '胡志勇主任什么时候出诊',
                num: 2,
                date: +new Date() - 5 * 60 * 1000,
                id: 3
            }
        ],
        chattingId: 2,
        activeKey: "1"
    },
    reducers: {
        setState(state, { payload }) {

            return {
                ...state, ...payload
            }
        }
    },
    effects: {
        *fetchData({ payload }, { call }) {
            request()
        },
        *changeChatting({ chattingId }, { call, put, select }) {
            const { onlineService_model } = yield select()
            onlineService_model.chattingList.forEach(_ => {
                if (_.id === chattingId) {
                    _.num = 0
                }
            });
            yield put({
                type: 'setState', payload: {
                    chattingId,
                    chattingList: onlineService_model.chattingList
                }
            })
        }
    }
}