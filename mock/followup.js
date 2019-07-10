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
      'departments|1': ['产科', '妇科', '肾内科', '泌尿外科', '健康管理中心'],
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
const dataSource1 = mockjs.mock({
  decs: '随访任务列表',
  data: [
    {
      id: '@id',
      title: '产前筛查随访', // 无创基因随访、GDM随访、产后42天随访、高危随访、复诊到访随访,
      type: '专项随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '无创基因随访', // GDM随访、产后42天随访、高危随访、复诊到访随访,
      type: '科研随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'drafts',
        dec: '草稿箱',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: 'GDM随访', // 产后42天随访、高危随访、复诊到访随访,
      type: '管理类随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'recycled',
        dec: '回收站',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '产后42天随访', // 高危随访、复诊到访随访,
      type: '专项随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '高危随访', // 复诊到访随访,
      type: '管理类随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '复诊到访随访',
      type: '管理类随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '产科', // '妇科', '肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'pause',
        dec: '暂停',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: 'PAC随访', // 妇科肿瘤随访、妇科术后随访
      type: '管理类随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '妇科', // 肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '妇科肿瘤随访', // 妇科术后随访
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '妇科', // 肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'pause',
        dec: '暂停',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '妇科术后随访',
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '妇科', // 肾内科', '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '高尿酸血症随访', // 肾病综合征随访、尿毒症覆膜透析、慢性肾病随访
      type: '专项随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '肾内科', // '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '肾病综合征随访', // 尿毒症覆膜透析、慢性肾病随访
      type: '管理类随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '肾内科', // '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '尿毒症覆膜透析', // 慢性肾病随访
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '肾内科', // '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '慢性肾病随访',
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '肾内科', // '泌尿外科', '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '前列腺炎随访', // 混合型尿失禁、膀胱癌随访
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '泌尿外科', // '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '混合型尿失禁', // 膀胱癌随访
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '泌尿外科', // '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '膀胱癌随访',
      type: '专科随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '泌尿外科', // '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '高血压随访', // 糖尿病随访、高血脂随访、脑卒中随访
      type: '科研随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '糖尿病随访', // 、高血脂随访、脑卒中随访
      type: '科研随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '高血脂随访', // 脑卒中随访
      type: '科研随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
      allFollowup: () => Random.natural(40, 60),
      todayFollowup: () => Random.natural(20, 40),
    },
    {
      id: '@id',
      title: '脑卒中随访',
      type: '科研随访', // '专项随访', '关怀类随访', '管理类随访', '科研随访',
      avatar: '',
      departments: '健康管理中心',
      status: {
        code: 'running',
        dec: '运行中',
      },
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
    'GET /api/followup/tasklists1': (req, res) => {
      const params = req.query;
      const { status, type /* secondaryType */ } = params;
      const { decs, data } = dataSource1;
      let json = {};
      if (status === '' || (status === 'all' && !type)) {
        json = {
          decs,
          data,
        };
      }
      if (status && status !== 'all') {
        json = {
          decs,
          data: data.filter(_ => _.status.code === status),
        };
      }
      if (type && status) {
        json = {
          decs,
          data: data.filter(_ => _.status.code === status && _.type === type),
        };
      }
      if (type && (status === '' || status === 'all' || !status)) {
        json = {
          decs,
          data: data.filter(_ => _.type === type),
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
