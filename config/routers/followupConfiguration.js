export default {
  path: '/followup-configuration',
  name: 'followup-configuration',
  icon: 'tool',
  routes: [
    {
      path: 'Questionnaire',
      name: 'questionnaire',
      routes: [
        {
          path: '/followup-configuration/Questionnaire',
          redirect: 'index',
        },
        {
          path: 'index',
          component: './FollowupConfiguration/Questionnaire',
        },
        {
          path: 'create',
          name: 'create',
          icon: 'edit',
          component: './FollowupConfiguration/Questionnaire/Create/Layout',
          hideInMenu: true,
          routes: [
            {
              // 选择任务类型
              path: 'step1',
              component: './FollowupConfiguration/Questionnaire/Create/Step1',
            },
            {
              // 选择对象
              path: 'step2',
              component: './FollowupConfiguration/Questionnaire/Create/Step2',
            },
          ],
        },
      ],
    },
    {
      path: 'mission-care',
      name: 'mission-care',
      component: './FollowupConfiguration/MissionCare',
    },
    {
      path: 'medium',
      name: 'medium',
      component: './FollowupConfiguration/Medium',
    },
  ],
};
