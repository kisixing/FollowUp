import mockjs from 'mockjs';

const { Random } = mockjs;
export const list = mockjs.mock({
  decs: '问卷列表',
  'data|30': [
    {
      id: '@id',
      'title|1': ['超时复诊', '孕妇学校', '无创基因检后', 'GDM孕期体重指数控'].map(_ => `${_}回执`),
      'status|1': () => Random.natural(0, 2),
      tag: () => Random.natural(0, 3),
      type: () => Random.natural(0, 2),

      answer: () => Random.natural(4000, 30000),
      date: Random.date(),
    },
  ],
}).data;

export default {};
