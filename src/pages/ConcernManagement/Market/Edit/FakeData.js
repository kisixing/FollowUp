export const first = [
  {
    value: '分类1',
    label: '分类1',
    children: [
      {
        value: '入院记录',
        label: '入院记录',
      },
      {
        value: '出院小结',
        label: '出院小结',
      },
    ],
  },
  {
    value: '分类2',
    label: '分类2',
    children: [
      {
        value: '门诊病历',
        label: '门诊病历',
        children: [
          {
            value: '首诊病历',
            label: '首诊病历',
          },
          {
            value: '复诊病历',
            label: '复诊病历',
          },
        ],
      },
    ],
  },
  {
    value: '分类3',
    label: '分类3',
    children: [
      {
        value: '手术评估单',
        label: '手术评估单',
      },
    ],
  },
];

export const second = {
  入院记录: [
    {
      label: '血压',
      value: '血压',
      children: [
        {
          label: '收缩压',
          value: '收缩压',
        },
        {
          value: '舒张压',
          label: '舒张压',
        },
        {
          value: '测量时间',
          label: '测量时间',
        },
      ],
    },
    {
      label: '体重',
      value: '体重',
      children: [
        {
          value: '体重值',
          label: '体重值',
        },
        {
          value: '测量时间',
          label: '测量时间',
        },
      ],
    },
  ],

  首诊病历: [
    {
      label: '年龄',
      value: '年龄',
      children: [
        {
          value: '年龄值',
          label: '年龄值',
        },
        {
          value: '测量时间',
          label: '测量时间',
        },
      ],
    },
    {
      label: '身体检查',
      value: '身体检查',
      children: [
        {
          value: '测量时间',
          label: '测量时间',
        },
      ],
    },
    {
      label: '脉搏',
      value: '脉搏',
      children: [
        {
          value: '脉搏值',
          label: '脉搏值',
        },
      ],
    },
  ],
  手术评估单: [
    {
      label: '身高',
      value: '身高',
      children: [
        {
          label: '身高值',
          value: '身高',
        },
      ],
    },
    {
      label: '诊断',
      value: '诊断',
      children: [
        {
          value: '近视',
          label: '近视',
        },
        {
          value: '屈光不正',
          label: '屈光不正',
        },
        {
          value: '斜视',
          label: '斜视',
        },
      ],
    },
    {
      label: '年龄',
      value: '年龄',
      children: [
        {
          value: '0年龄',
          label: '年龄',
        },
      ],
    },
  ],
};
