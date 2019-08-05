import mockjs from 'mockjs';
// eslint-disable-next-line import/no-unresolved
import { delay } from 'roadhog-api-doc';

const { Random } = mockjs;

const LOGS = mockjs.mock({
  empty: false,
  first: true,
  last: false,
  number: 0,
  numberOfElements: 10,
  size: 10,
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    unpaged: false,
  },
  sort: {
    sorted: true,
    unsorted: false,
    empty: false,
  },
  totalElements: 88937,
  totalPages: 8894,
  'data|30-50': [
    {
      createTime: '@time("yyyy-MM-dd HH:mm:ss")',
      'description|1': ['查询定时任务', '查询字典详情', '查询字典', '查询Redis缓存', '查询部门'],
      exceptionDetail: null,
      id: '@id',
      logType: 'INFO',
      'method|1': [
        'me.zhengjie.modules.quartz.rest.QuartzJobController.getJobs()',
        'me.zhengjie.modules.system.rest.DictDetailController.getDictDetails()',
        'me.zhengjie.modules.system.rest.DictController.getDicts()',
        'me.zhengjie.modules.monitor.rest.RedisController.getRedis()',
      ],
      params:
        '{ criteria: JobQueryCriteria(jobName=null, isSuccess=null) pageable: Page request [number: 0, size 10, sort: id: DESC] }',
      'requestIp|1': ['61.142.114.74', '61.142.114.64', '61.142.114.54', '61.142.114.66'],
      'time|1': [1, 2, 3, 4, 5],
      'username|1': ['admin', 'guest', '貂蝉'],
    },
  ],
});

const USERS = mockjs.mock({
  desc: '用户表',
  'data|30-50': [
    {
      id: '@id',
      username: () => Random.cname(),
      phone: /^1[3-9]{10}$/,
      email: '@email',
      'department|1': ['医务科', '妇产科', '中医科', '康复科', '内科'],
      'position|1': ['护士长', '医生', '主任', '护士', '信息员', '院长'],
      'status|1': [true, false],
      createTime: '@time("yyyy-MM-dd HH:mm:ss")',
    },
  ],
});

const ROLES = mockjs.mock({
  desc: '角色',
  data: [
    {
      id: '2018009',
      nickname: '超级管理员',
      authority: '全部',
      grade: '1',
      desc: '系统所有权',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
    {
      id: '20180091',
      nickname: '普通管理员',
      authority: '自定义',
      grade: '2',
      desc: '普通管理员级别为2，使用该角色新增用户时只能赋予比普通管理员级别低的角色',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
    {
      id: '20180092',
      nickname: '主任用户',
      authority: '自定义',
      grade: '3',
      desc: '用于医护管理权限',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
    {
      id: '20180093',
      nickname: '医生用户',
      authority: '自定义',
      grade: '4',
      desc: '用于临床使用',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
    {
      id: '20180094',
      nickname: '护士长用户',
      authority: '自定义',
      grade: '5',
      desc: '用于护士管理',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
    {
      id: '20180095',
      nickname: '护士用户',
      authority: '自定义',
      grade: '6',
      desc: '用于系统基本功能使用',
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
      permissions: [],
    },
  ],
});

const PERMISSION = mockjs.mock({
  desc: '权限',
  'data|10-30': [
    {
      id: '@id',
      name: '@name',
      alias: () => Random.cname(),
      createdTime: '@time("yyyy-MM-dd HH:mm:ss")',
    },
  ],
});

export default delay(
  {
    'GET /api/management/logs': (req, res) => {
      // const params = req.query;
      return res.json(LOGS);
    },
    'GET /api/management/users': (req, res) => {
      // const params = req.query;
      return res.json(USERS);
    },
    'GET /api/management/roles': (req, res) => {
      // const params = req.query;
      return res.json(ROLES);
    },
    'GET /api/management/permission': (req, res) => {
      // const params = req.query;
      return res.json(PERMISSION);
    },
  },
  1000
);
