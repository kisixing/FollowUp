export default {
  path: '/concern-management',
  name: 'concern-management',
  icon: 'book',
  routes: [
    {
      // 节日问候
      path: '/concern-management/festival-concern',
      name: 'festival-concern',
      // icon: 'edit',
      component: './ConcernManagement/FestivalConcern/index',
    },
    {
      // 节日问候-新建
      path: '/concern-management/festival-concern/create',
      name: 'festival-concern',
      // icon: 'edit',
      component: './ConcernManagement/FestivalConcern/Create/Layout',
      hideInMenu: true,

      routes: [
        {
          path: '/concern-management/festival-concern/create',
          redirect: '/concern-management/festival-concern/create/step1',
        },
        {
          // 选择任务类型
          path: '/concern-management/festival-concern/create/step1',
          name: 'step1',
          component: './ConcernManagement/FestivalConcern/Create/Step1',
          hideInMenu: true,
        },
        {
          // 选择对象
          path: '/concern-management/festival-concern/create/step2',
          name: 'step2',
          component: './ConcernManagement/FestivalConcern/Create/Step2',
          hideInMenu: true,
        },
        {
          // 编辑任务内容
          path: '/concern-management/festival-concern/create/step3',
          name: 'step3',
          component: './ConcernManagement/FestivalConcern/Create/Step3',
          hideInMenu: true,
        },
        {
          // 发布statistics
          path: '/concern-management/festival-concern/create/step4',
          name: 'step4',
          component: './ConcernManagement/FestivalConcern/Create/Step4',
          hideInMenu: true,
        },
      ],
    },

    //   {
    //     // 节日问候-统计
    //     path: '/concern-management/festival-concern/statistics',
    //     name: 'festival-concern',
    //     // icon: 'edit',
    //     component: './ConcernManagement/FestivalConcern/Statistics',
    //   },
    {
      // 生日问候
      path: '/concern-management/birthday-concern',
      name: 'birthday-concern',
      // icon: 'edit',
      component: './FollowupManagement/TaskManagement/index',
    },
    {
      // 市场活动
      path: '/concern-management/market',
      name: 'market',
      // icon: 'edit',
      component: './FollowupManagement/TaskManagement/index',
    },
  ],
};
