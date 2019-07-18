import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
import { filter } from './utils';

const { Random } = mockjs;
export const satisfactionList = mockjs.mock({
  decs: '问卷列表',
  'data|30': [
    {
      id: '@id',
      'title|1': ['门诊复诊', '门诊手术', '医院服务', '妇科', '产科', '内科', '外科'].map(
        _ => `${_}满意度`
      ),
      'status|1': () => Random.natural(0, 4),
      type: () => Random.natural(0, 3),
      today: () => Random.natural(100, 500),
      all: () => Random.natural(500, 1000),
      scene: () => Random.natural(0, 4),
    },
  ],
}).data;
export default delay(
  {
    'POST /api/festivalConcern/list': (req, res) => {
      const { type, scene, status, title } = req.body;
      let data = filter(satisfactionList, { scene, type, status });
      if (title) {
        data = data.filter(_ => _.title.includes(title));
      }
      return res.json(data);
    },
  },
  1000
);
