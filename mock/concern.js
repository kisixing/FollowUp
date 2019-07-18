import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
import { filter } from './utils';

const { Random } = mockjs;
export const festivalConcernList = mockjs.mock({
  decs: '问卷列表',
  'data|30': [
    {
      id: '@id',
      'title|1': () => `节日关怀${Random.natural(1, 30)}`,
      'status|1': () => Random.natural(0, 3),
      type: () => Random.natural(0, 2),
      countdown: () => Random.natural(1, 100),
      nextDate: Random.date(),
      answer: () => Random.natural(4000, 30000),
      date: () => Random.date(),
      month: () => Random.natural(0, 11),
    },
  ],
}).data;
export default delay(
  {
    'POST /api/festivalConcern/list': (req, res) => {
      const { type, month, status, title } = req.body;
      let data = filter(festivalConcernList, { month, type, status });
      if (title) {
        data = data.filter(_ => _.title.includes(title));
      }
      return res.json(data);
    },
  },
  1000
);
