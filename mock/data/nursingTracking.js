import mockjs from 'mockjs';

const { Random } = mockjs;
export const list = mockjs.mock({
  decs: '问卷列表',
  'data|8': [
    {
      id: '@id',
      'title|1': ['预约挂号跟踪', '住院预约跟踪', 'B超预约跟踪', '住院预约跟踪'],
      'status|1': () => Random.natural(0, 1),
      all: () => Random.natural(1, 100),
    },
  ],
}).data;

export default {};
