const questionList = [
  {
    type: '单选题',
    id: '1',
    title: '现在是否有使用胰岛素控制血糖？',
    dataset: [
      {
        lable: '是',
        id: '1-1',
      },
      {
        lable: '否',
        id: '1-2',
      },
    ],
  },
  {
    type: '单选题',
    id: '2',
    title: '每周平时利用饮食控制管理血糖的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '2-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '2-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '2-3',
      },
      {
        lable: '无（0天）',
        id: '2-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '3',
    title: '每周蔬菜摄入量为400-500g/天的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '3-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '3-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '3-3',
      },
      {
        lable: '无（0天）',
        id: '3-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '4',
    title: '每周水果摄入量控制在200-300g/天的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '4-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '4-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '4-3',
      },
      {
        lable: '无（0天）',
        id: '4-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '5',
    title: '在每日的主食中，杂粮占有比例约为20%的频率？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '5-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '5-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '5-3',
      },
      {
        lable: '无（0天）',
        id: '5-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '6',
    title: '每周的蛋白质摄入涵盖水产品、蛋肉类、奶和豆制品的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '6-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '6-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '6-3',
      },
      {
        lable: '无（0天）',
        id: '6-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '7',
    title: '每周能做到少食多餐的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '7-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '7-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '7-3',
      },
      {
        lable: '无（0天）',
        id: '7-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '8',
    title: '进食时，将干、湿不同形态的食物隔开时间吃的频率？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '8-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '8-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '8-3',
      },
      {
        lable: '无（0天）',
        id: '8-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '9',
    title: '每周通过运动控制管理血糖的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '9-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '9-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '9-3',
      },
      {
        lable: '无（0天）',
        id: '9-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '10',
    title: '每周运动的时间达到30-40分钟/天的天数？',
    dataset: [
      {
        lable: '经常（6-7天/周）',
        id: '10-1',
      },
      {
        lable: '一般（3-5天/周）',
        id: '10-2',
      },
      {
        lable: '偶尔（1-2天/周）',
        id: '10-3',
      },
      {
        lable: '无（0天）',
        id: '10-4',
      },
    ],
  },
  {
    type: '单选题',
    id: '11',
    title: '每周是否有动态监测1-2天的全天血糖？',
    dataset: [
      {
        lable: '是',
        id: '11-1',
      },
      {
        lable: '否',
        id: '11-2',
      },
    ],
  },
  {
    type: '单选题',
    id: '12',
    title: '每周是否有空腹比较自己的体重变化？',
    dataset: [
      {
        lable: '是',
        id: '12-1',
      },
      {
        lable: '否',
        id: '12-2',
      },
    ],
  },
  {
    type: '单选题',
    id: '13',
    title: '您的体重是在按孕期的推荐体重在增长吗？',
    dataset: [
      {
        lable: '是',
        id: '13-1',
      },
      {
        lable: '否',
        id: '13-2',
      },
    ],
  },
];

const getFakeQuestionnaireData = {
  questionnaireTitle: 'OGTT异常随访',
  questionList,
};

export default {
  'GET /api/fake_questionnaire': getFakeQuestionnaireData,
};
