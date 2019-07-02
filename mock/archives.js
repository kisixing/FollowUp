/*
 * @Author: Zhong Jun
 * @Date: 2019-07-02 14:40:57
 */

import mockjs from 'mockjs';
import { delay } from 'roadhog-api-doc';

const PATIENT = {
  desc: '患者个人信息',
  data: {
    cardID: '20180115112',
    name: '陈思文',
    avatar: '',
    gender: '女',
    paymentType: '自费',
    age: '28',
    maritalStatus: '已婚',
    nation: '汉族',
    birth: '1991-02-13',
    profession: '',
    workPlace: '',
    address: '广东省广州市越秀区先烈南路',
    allergy: '磺胺噻唑,青霉素',
  },
};

const TREATMENT = mockjs.mock({
  decs: '随访任务列表',
  'data|1-5': [
    {
      id: '@id',
      'title|1': ['盆底肌康复治疗', '孕前高血压康复治疗'],
      date: '@time',
      course: 10,
      surplus: 3,
      period: '一周一次',
      'record|3-10': [
        {
          'number|+1': 1,
          date: '@date("yyyy-MM-dd")',
          'therapist|1': ['范启青', '李大夫', '梁大夫'],
        },
      ],
    },
  ],
});

const HISTORY = [
  {
    marker: '住院',
    date: '2019-06-28',
  },
  {
    marker: '手术',
    date: '2019-06-27',
  },
  {
    marker: '门诊',
    date: '2019-06-10',
  },
  {
    marker: '门诊',
    date: '2019-06-01',
  },
  {
    marker: '门诊',
    date: '2019-0-22',
  },
];

export default delay(
  {
    'GET /api/archives/patient': (req, res) => {
      return res.json(PATIENT);
    },
    'GET /api/archives/briefHistory': (req, res) => {
      return res.json(HISTORY);
    },
    'GET /api/archives/treatmentRecord': (req, res) => {
      // const params = req.query;
      return res.json(TREATMENT);
    },
  },
  1000
);
