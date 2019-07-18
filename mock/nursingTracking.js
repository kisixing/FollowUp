import { delay } from 'roadhog-api-doc';
import { list } from './data/appointmentTracking';
import { filter } from './utils';

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
