import mockjs from 'mockjs';
// eslint-disable-next-line import/no-unresolved
import { delay } from 'roadhog-api-doc';

const { Random } = mockjs;
const dataSource = mockjs.mock({
  decs: '随访任务列表',
  'data|30-50': [
    {
      id: '@id',
      title: () => `随访任务名称-${Random.natural(1, 50)}`,
      'type|1': ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'],
      'secondaryType|1': [
        '高危妊娠',
        '妊娠糖尿病',
        '妊娠高血压',
        '产后随访',
        '术后随访',
        '报告异常随访',
        '专项检测随访',
        '宣教类',
        '节日问候',
        '活动通知',
        '满意度调查',
        '投诉建议',
        '孕妇研究',
        '新生儿研究',
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
const item = {
  id: '10000',
  title: `高危妊娠复诊管理`,
  type: '科室随访',
  secondaryType: '高危妊娠',
  avatar: '',
  status: {
    code: 'running',
    dec: '运行中',
  },
  allFollowup: 55,
  todayFollowup: 22,
};
dataSource.data.unshift(item);
const templates = mockjs.mock({
  decs: '随访任务模板列表',
  'data|30-50': [
    {
      id: '@id',
      title: () => `随访任务名称-${Random.natural(1, 50)}`,
      hospital: '华侨医院',
      'type|1': ['科室随访', '专项随访', '关怀类随访', '管理类随访', '科研随访'],
      'secondaryType|1': [
        '高危妊娠',
        '妊娠糖尿病',
        '妊娠高血压',
        '产后随访',
        '术后随访',
        '报告异常随访',
        '专项检测随访',
        '宣教类',
        '节日问候',
        '活动通知',
        '满意度调查',
        '投诉建议',
        '孕妇研究',
        '新生儿研究',
      ],
      description: '自动发送复诊提醒 · 管理复诊结果',
      avatar: '',
    },
  ],
});

// 随访项目列表
export default delay(
  {
    'GET /api/followup/tasklists': (req, res) => {
      const params = req.query;
      const { status, type, secondaryType } = params;
      const { decs, data } = dataSource;
      let json = {};
      if (
        Object.keys(params).length === 0 ||
        (!status && !type && !secondaryType) ||
        (status === 'all' && !type && !secondaryType)
      ) {
        json = {
          decs,
          data,
        };
      }
      if (status && !type && !secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.status.code === status),
        };
      }
      if (status && type && !secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.status.code === status && _.type === type),
        };
      }
      if (status && type && secondaryType) {
        json = {
          decs,
          data: data.filter(
            _ => _.status.code === status && _.type === type && _.secondaryType === secondaryType
          ),
        };
      }
      if (!status && type && !secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.type === type),
        };
      }
      if (!status && !type && secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.secondaryType === secondaryType),
        };
      }
      return res.json(json);
    },
    'GET /api/followup/tasktemplates': (req, res) => {
      const params = req.query;
      const { type, secondaryType } = params;
      const { decs, data } = templates;
      let json = {};
      if (Object.keys(params).length === 0 || (!type && !secondaryType)) {
        json = templates;
      }
      if (type && !secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.type === type),
        };
      }
      if (!type && secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.secondaryType === secondaryType),
        };
      }
      if (type && secondaryType) {
        json = {
          decs,
          data: data.filter(_ => _.type === type && _.secondaryType === secondaryType),
        };
      }

      return res.json(json);
    },
  },
  1000
);
