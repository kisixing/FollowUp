const MODLE = 'ConcernManagement';
export default {
  path: '/concern-management',
  name: 'concern-management',
  icon: 'heart',
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
      routes: [
        {
          path: '/concern-management/birthday-concern/',
          redirect: 'index',
        },
        {
          path: 'index',
          component: `${MODLE}/BirthdayConcern/index`,
        },
        {
          // 节日问候-新建
          path: 'edit',
          name: 'edit',
          component: `${MODLE}/BirthdayConcern/Edit/index`,
          hideInMenu: true,
        },
      ],
    },
    {
      // 市场活动
      path: '/concern-management/market',
      name: 'market',
      component: './ConcernManagement/Market/index',
    },
    {
      // 市场活动-统计
      path: '/concern-management/market/statistics/:id',
      component: './ConcernManagement/Market/Statistics',
    },
    {
      path: '/concern-management/market/Edit/Step1/:id',
      component: './ConcernManagement/Market/Edit/Step1',
    },
    {
      path: '/concern-management/market/Edit/Step2/:id',
      component: './ConcernManagement/Market/Edit/Step2',
    },
  ],
};
