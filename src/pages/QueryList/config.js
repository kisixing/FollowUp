export default {
  // 与后端的接口
  url: {
    search: 'www.baidu.com',
  },
  // table表头设置：
  // key：后端对应字段；title：前端显示字段
  // width(string|number): 每列宽度，可省略;如果列分组（有子列）需要在最下层子列设置宽度。支持：'10%','10px',100等设置
  // sort(string): 排序。支持：'number'，'date'
  // search(object): 头部Search.js处需要搜索的列。支持：{type:'input'},{type:'date',format:'YYYY-MM-DD'}(format内容要对应数据库里数据格式)
  // fixed(string): 固定某些列，如果列分组（有子列）需要在最上层设置fixed。注意：非固定列宽度<=scroll.x。支持：'left','rightn'
  columns: [
    {
      key: 'name',
      title: '产妇姓名',
      fixed: 'left',
      children: [
        {
          key: 'firstName',
          title: '姓',
          width: 50,
        },
        {
          key: 'lastName',
          title: '名',
          width: 100,
        },
      ],
    },
    {
      key: 'IDCard',
      title: '身份证',
      width: 200,
      sort: 'number',
      search: { type: 'input' },
      filter: true,
    },
    {
      key: 'phone',
      title: '手机号码',
      sort: 'number',
      search: { type: 'input' },
      width: 200,
      filter: true,
    },
    {
      key: 'highRiskFactor',
      title: '高危因素',
      width: 100,
      search: { type: 'input' },
    },
    {
      key: 'highRiskLevel',
      title: '高危等级',
      width: '10%',
      map: 100,
      search: {
        type: 'select',
        options: [
          {
            key: 3,
            title: '高危',
          },
          {
            key: 2,
            title: '轻微',
          },
          {
            key: 1,
            title: '正常',
          },
          {
            key: 0,
            title: '良好',
          },
        ],
      },
      editable: {
        inputType: 'select',
        options: [
          {
            key: 3,
            title: '高危',
          },
          {
            key: 2,
            title: '轻微',
          },
          {
            key: 1,
            title: '正常',
          },
          {
            key: 0,
            title: '良好',
          },
        ],
      },
    },
    {
      key: 'startDate',
      title: '建档时间',
      sort: 'date',
      search: {
        type: 'date',
        format: 'YYYY-MM-DD',
      },
      width: 300,
    },
    {
      key: 'sendQuantity',
      title: '问卷发送数量',
      sort: 'number',
      width: 200,
      search: { type: 'input' },
    },
    {
      key: 'responseQuantity',
      title: '问卷回复数量',
      sort: 'number',
      width: 200,
      search: { type: 'input' },
    },
    {
      key: 'recentDate',
      title: '最近随访时间',
      sort: 'date',
      width: 300,
    },
    {
      key: 'action',
      title: '操作',
      actionType: ['edit'],
      fixed: 'right',
      width: 200,
    },
  ],
  scroll: {
    x: 2000,
    y: 400,
  },
  pagination: 5,
};
