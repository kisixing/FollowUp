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
    //   {
    //     // 节日问候-新建
    //     path: '/concern-management/festival-concern/create',
    //     name: 'festival-concern',
    //     // icon: 'edit',
    //     component: './ConcernManagement/FestivalConcern/Create',
    //   },
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
