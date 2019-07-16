import { delay } from 'roadhog-api-doc';
import { festivalConcernList } from './data/concern';
import { filter } from './utils';

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
