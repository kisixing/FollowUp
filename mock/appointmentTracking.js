import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
import { filter } from './utils';

const { Random } = mockjs;
export const list = mockjs.mock({
  decs: '问卷列表',
  'data|8': [
    {
      id: '@id',
      'title|1': () => `护理跟踪${Random.natural(1, 8)}`,
      'status|1': () => Random.natural(0, 1),
      all: () => Random.natural(1, 100),
    },
  ],
}).data;

export default delay(
  {
    'POST /api/appointmentTracking/list': (req, res) => {
      const { type, month, status, title } = req.body;
      let data = filter(list, { month, type, status });
      if (title) {
        data = data.filter(_ => _.title.includes(title));
      }
      return res.json(data);
    },
  },
  1000
);
