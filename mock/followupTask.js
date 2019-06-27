import mockjs from 'mockjs';

const { Random } = mockjs;




const statistic = mockjs.mock({
  decs: '随访任务列表',
  'data|30': [
    {
      id: '@id',
      'title|+1': (a, b, c) => {
        return `统计分析-${Random.natural(1, 50)}`
      },
      avatar: '',
      'status|1': [
        {
          code: 'running',
          dec: '运行中',
        },
        {
          code: 'pause',
          dec: '暂停',
        }
      ],
      allFollowup: () => Random.natural(90, 150),
      todayFollowup: () => Random.natural(1, 90),
    },
  ],
});
const source = {
  statistic
}
export default {
  // 支持值为 Object 和 Array
  'GET /api/followup/dataset': {
    reservationDateType: setMock(['预约日期', '末次就诊日期']),
    reservationDuringType: setMock(['之前', '当天', '之后']),
    reservationMediaType: setMock(['微信', '短信', '电话']),
  },
  'GET /api/list': (req, res) => {
    const dataSource = source.statistic
    const params = req.query;
    const { status } = params;
    let json = {};
    if (Object.keys(params).length === 0) {
      json = dataSource;
    }
    if (status) {
      json = {
        ...dataSource,
        data: dataSource.data.filter(item => item.status.code === status),
      };
    }
    return res.json(json);
  },
};

function setMock(arr, labelKey = 'label', valueKey = 'value') {
  return arr.map(a => {
    return {
      [valueKey]: Math.random()
        .toString(16)
        .slice(2),
      [labelKey]: a,
      // description: `description of content${a}`,
      // chosen:true
    };
  });
}



