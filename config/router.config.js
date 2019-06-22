export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/workplace', authority: ['admin', 'user'] },
      {
        path: '/workplace',
        name: 'workplace',
        icon: 'dashboard',
        component: './Workplace',
      },
      {
        path: '/patient-management',
        name: 'patient-management',
        icon: 'book',
        component: './PatientManagement',
      },
      {
        path: '/archives-management',
        name: 'archives-management',
        icon: 'book',
        // component: './ArchivesManagement',
      },
      {
        path: '/followup-management',
        name: 'followup-management',
        icon: 'book',
        routes: [
          {
            // 随访任务列表
            path: '/followup-management/lists',
            name: 'lists',
            icon: 'edit',
            component: './FollowupManagement/Lists',
          },
          {
            // 单个随访任务患者统计列表
            path: '/followup-management/lists/table/:followupId',
            name: 'followup-patientLists',
            icon: 'edit',
            component: './FollowupManagement/FollowupPatientLists/index',
            hideInMenu: true,
          },
          {
            // 单个随访任务图形分析统计
            path: '/followup-management/lists/chart/:followupId',
            name: 'followup-chart',
            icon: 'area-chart',
            component: './FollowupManagement/FollowupPatientChart/index',
            hideInMenu: true,
          },
          {
            path: '/followup-management/create',
            name: 'create',
            icon: 'edit',
            component: './FollowupManagement/Create/Layout',
            routes: [
              {
                path: '/followup-management/create',
                redirect: '/followup-management/create/step1',
              },
              {
                // 选择任务类型
                path: '/followup-management/create/step1',
                name: 'select-type',
                component: './FollowupManagement/Create/Step1',
                hideInMenu: true,
              },
              {
                // 选择对象
                path: '/followup-management/create/step2',
                name: 'select-object',
                component: './FollowupManagement/Create/Step2',
                hideInMenu: true,
              },
              {
                // 编辑任务内容
                path: '/followup-management/create/step3',
                name: 'task-definition',
                component: './FollowupManagement/Create/Step3',
                hideInMenu: true,
              },
              {
                // 发布
                path: '/followup-management/create/step4',
                name: 'issue',
                component: './FollowupManagement/Create/Step4',
                hideInMenu: true,
              },
            ],
          },
        ],
      },
      {
        path: '/followup-configuration',
        name: 'followup-configuration',
        icon: 'book',
        routes: [
          {
            path: '/followup-configuration/questionnaire',
            name: 'questionnaire',
            icon: 'edit',
            // component: './FollowupConfiguration/Questionnaire',
          },
        ],
      },
      {
        path: '/schedule-reminder',
        name: 'schedule-reminder',
        icon: 'book',
        routes: [
          {
            path: '/schedule-reminder/create',
            name: 'create',
            icon: 'edit',
            // component: './ScheduleReminder/Create',
          },
          {
            path: '/schedule-reminder/management',
            name: 'management',
            icon: 'edit',
            // component: './ScheduleReminder/Management',
          },
        ],
      },
      {
        path: '/system-settings',
        name: 'system-settings',
        icon: 'book',
        // component: './SystemSettings',
      },
      {
        path: '/Monitor ',
        name: 'Monitor',
        icon: 'book',
        // component: './Monitor',
      },
      {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        hideInMenu: true,
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
