const MODLE = 'ConcernManagement';
export default {
  path: '/concern-management',
  name: 'concern-management',
  icon: 'book',
  routes: [
    {
      // 节日问候
      path: '/concern-management/festival-concern/',
      name: 'festival-concern',
      // icon: 'edit',
      routes: [
        {
          path: '/concern-management/festival-concern/',
          redirect: 'index',
        },
        {
          path: 'index',
          component: `${MODLE}/FestivalConcern/index`,
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: `${MODLE}/FestivalConcern/Statistics/index`,
          hideInMenu: true,
        },
        {
          // 节日问候-新建
          path: 'create',
          name: 'create',
          component: `${MODLE}/FestivalConcern/Create/Layout`,
          hideInMenu: true,

          routes: [
            {
              path: 'step1',
              name: 'step1',
              component: `${MODLE}/FestivalConcern/Create/Step1`,
              hideInMenu: true,
            },
            {
              path: 'step2',
              name: 'step2',
              component: `${MODLE}/FestivalConcern/Create/Step2`,
              hideInMenu: true,
            },
          ],
        },
      ],
    },
    {
      // 生日问候
      path: '/concern-management/birthday-concern',
      name: 'birthday-concern',
      // icon: 'edit',
      component: `${MODLE}/BirthdayConcern`,
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
