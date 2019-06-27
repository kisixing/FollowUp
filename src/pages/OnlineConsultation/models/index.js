export default {
    namespace: 'onlineConsultation_model',
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
            }
        ]
    },
    reducers: {

    },
    effects: {

    }
}