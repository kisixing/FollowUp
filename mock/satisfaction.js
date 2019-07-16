import { delay } from 'roadhog-api-doc';
import { satisfactionList } from './data/satisfaction';
import { filter } from './utils';

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
