import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';
import { filter } from './utils';

const { Random } = mockjs;
export const list = mockjs.mock({
  decs: '问卷列表',
  'data|30': [
    {
      id: '@id',
      'title|1': ['超时复诊', '孕妇学校', '无创基因检后', 'GDM孕期体重指数控'].map(_ => `${_}回执`),
      'status|1': () => Random.natural(0, 2),
      tag: () => Random.natural(0, 3),
      type: () => Random.natural(0, 2),

      answer: () => Random.natural(4000, 30000),
      date: Random.date(),
    },
  ],
}).data;
const questionList = [
  {
    type: '单选题',
    id: '1',
    title: '现在是否有使用胰岛素控制血糖？',
    dataset: [
      {
        label: '是',
        id: '1-1',
      },
      {
        label: '否',
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
        label: '经常（6-7天/周）',
        id: '2-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '2-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '2-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '3-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '3-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '3-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '4-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '4-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '4-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '5-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '5-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '5-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '6-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '6-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '6-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '7-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '7-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '7-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '8-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '8-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '8-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '9-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '9-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '9-3',
      },
      {
        label: '无（0天）',
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
        label: '经常（6-7天/周）',
        id: '10-1',
      },
      {
        label: '一般（3-5天/周）',
        id: '10-2',
      },
      {
        label: '偶尔（1-2天/周）',
        id: '10-3',
      },
      {
        label: '无（0天）',
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
        label: '是',
        id: '11-1',
      },
      {
        label: '否',
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
        label: '是',
        id: '12-1',
      },
      {
        label: '否',
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
        label: '是',
        id: '13-1',
      },
      {
        label: '否',
        id: '13-2',
      },
    ],
  },
];

const getFakeQuestionnaireData = {
  questionnaireTitle: 'OGTT异常随访',
  questionList,
};

export default delay(
  {
    'GET /api/fake_questionnaire': getFakeQuestionnaireData,
    'POST /api/questionnaire/list': (req, res) => {
      const { status, type, title } = req.body;
      let data = filter(list, { status, type });
      if (title) {
        data = data.filter(_ => _.title.includes(title));
      }
      return res.json(data);
    },
  },
  1000
);
