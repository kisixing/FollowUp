export default {
  path: '/satisfaction-management',
  name: 'satisfaction-management',
  icon: 'book',
  routes: [
    {
      // 投诉建议
      path: 'complaint-lists',
      name: 'complaint-lists',
      // icon: 'edit',
      component: './SatisfactionManagement/TaskManagement/ManualFollowUp',
    },
    {
      // 表扬
      path: 'praise-lists',
      name: 'praise-lists',
      // icon: 'edit',
      component: './SatisfactionManagement/TaskManagement/ManualFollowUp',
    },
    {
      // 专项管理
      path: 'satisfaction-lists',
      name: 'satisfaction-lists',
      // icon: 'edit',
      routes: [
        {
          path: '/satisfaction-management/satisfaction-lists',
          redirect: 'index',
        },
        {
          path: 'index',
          component: './SatisfactionManagement/TaskManagement/index',
        },
        // 人工随访列表
        {
          path: 'manual-followup',
          component: './SatisfactionManagement/TaskManagement/ManualFollowUp',
        },
        {
          path: 'statistics',
          component: './SatisfactionManagement/Statistics',
        },
        {
          path: 'create',
          name: 'create',
          component: './SatisfactionManagement/Create/Layout',
          hideInMenu: true,

          routes: [
            {
              // 选择任务类型
              path: 'step1',
              component: './SatisfactionManagement/Create/Step1',
            },
            {
              // 选择对象
              path: 'step2',
              component: './SatisfactionManagement/Create/Step2',
            },
            {
              // 编辑任务内容
              path: 'step3',
              component: './SatisfactionManagement/Create/Step3',
            },
            {
              // 发布statistics
              path: 'step4',
              component: './SatisfactionManagement/Create/Step4',
            },
          ],
        },
      ],
    },
  ],
};
