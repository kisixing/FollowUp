import mockjs from 'mockjs';

const { Random } = mockjs;
const dataSource = mockjs.mock({
  decs: '随访任务列表',
  'data|30': [
    {
      id: '@id',
      'title|+1': () => `随访任务名称-${Random.natural(1, 50)}`,
      'type|1': ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'],
      'secondaryType|1': [
        '高危妊娠孕妇复诊管理',
        '妊娠糖尿病孕妇管理',
        '产后随访',
        '无创基因检查随访',
        'OGTT异常随访',
        '节日问候',
        '生日问候',
        '三伏天通知',
        '新生儿疾病护理讲座通知',
        '可是满意度',
        '投诉建议',
        '妊娠期体重管理与巨大儿',
        '妊娠糖尿病产后病情发展',
      ],
      avatar: '',
      'status|1': [
        {
          code: 'all',
          dec: '全部',
        },
        {
          code: 'running',
          dec: '运行中',
        },
        {
          code: 'pause',
          dec: '暂停',
        },
        {
          code: 'drafts',
          dec: '草稿箱',
        },
        {
          code: 'recycled',
          dec: '回收站',
        },
      ],
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
  ],
});

const templates = [
  {
    id: '11112222',
    title: '高危妊娠孕妇复诊管理',
    type: '科室随访',
    description: '自动发送复诊提醒 · 管理复诊结果',
    avatar: '',
  },
  {
    id: '11111222',
    title: '妊娠糖尿病产后复诊',
    type: '科室随访',
    description: '自动发送复诊提醒 · 管理复诊结果',
    avatar: '',
  },
  {
    id: '111112221',
    title: '产后42天复诊',
    type: '科室随访',
    description: '自动发送复诊提醒 · 管理复诊结果',
    avatar: '',
  },
  {
    id: '1121112221',
    title: '妊娠高血压产后复诊',
    type: '科室随访',
    description: '自动发送复诊提醒 · 管理复诊结果',
    avatar: '',
  },
];

// 随访项目列表
export default {
  'GET /api/followup/tasklists': (req, res) => {
    const params = req.query;
    const { status, type, secondaryType } = params;
    let json = {};
    if (Object.keys(params).length === 0) {
      json = dataSource;
    }
    if (status && !type && !secondaryType) {
      json = {
        ...dataSource,
        data: dataSource.data.filter(item => item.status.code === status),
      };
    }
    if (!status && type && !secondaryType) {
      const typeArr = type.split(',');
      json = {
        ...dataSource,
        data: dataSource.data.filter(item => typeArr.includes(item.type)),
      };
    }
    if (status && type) {
      const typeArr = type.split(',');
      json = {
        ...dataSource,
        data: dataSource.data.filter(
          item => item.status.code === status && typeArr.includes(item.type)
        ),
      };
    }
    return res.json(json);
  },
  'GET /api/followup/tasktemplates': (req, res) => {
    return res.json(templates);
  },
};
