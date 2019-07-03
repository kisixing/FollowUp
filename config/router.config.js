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
      { path: '/', redirect: '/calendar', authority: ['admin', 'user'] },
      {
        path: '/calendar',
        name: 'calendar',
        icon: 'calendar',
        component: './Calendar',
      },
      {
        path: '/patient-management',
        name: 'patient-management',
        icon: 'user',
        component: './PatientManagement',
      },
      {
        path: '/archives-management',
        name: 'archives-management',
        icon: 'book',
        component: './ArchivesManagement/index',
      },
      {
        path: '/satisfaction-management',
        name: 'satisfaction-management',
        icon: 'book',
        routes: [
          {
            // 投诉建议
            path: '/satisfaction-management/complaint-lists',
            name: 'complaint-lists',
            // icon: 'edit',
            component: './SatisfactionManagement/TaskManagement/index',
          },
          {
            // 表扬
            path: '/satisfaction-management/praise-lists',
            name: 'praise-lists',
            // icon: 'edit',
            component: './SatisfactionManagement/TaskManagement/index',
          },
          {
            // 满意度
            path: '/satisfaction-management/satisfaction-lists',
            name: 'satisfaction-lists',
            // icon: 'edit',
            component: './SatisfactionManagement/TaskManagement/index',
          },
          {
            path: '/satisfaction-management/satisfaction-lists/create',
            name: 'create',
            // icon: 'edit',
            component: './SatisfactionManagement/Create/Layout',
            hideInMenu: true,

            routes: [
              {
                path: '/satisfaction-management/satisfaction-lists/create',
                redirect: '/satisfaction-management/satisfaction-lists/create/step1',
              },
              {
                // 选择任务类型
                path: '/satisfaction-management/satisfaction-lists/create/step1',
                name: 'stpe1',
                component: './SatisfactionManagement/Create/Step1',
                hideInMenu: true,
              },
              {
                // 选择对象
                path: '/satisfaction-management/satisfaction-lists/create/step2',
                name: 'step2',
                component: './SatisfactionManagement/Create/Step2',
                hideInMenu: true,
              },
              {
                // 编辑任务内容
                path: '/satisfaction-management/satisfaction-lists/create/step3',
                name: 'step3',
                component: './SatisfactionManagement/Create/Step3',
                hideInMenu: true,
              },
              {
                // 发布statistics
                path: '/satisfaction-management/satisfaction-lists/create/step4',
                name: 'step4',
                component: './SatisfactionManagement/Create/Step4',
                hideInMenu: true,
              },
            ],
          },
        ],
      },
      {
        path: '/followup-management',
        name: 'followup-management',
        icon: 'file-text',
        routes: [
          {
            // 随访任务列表
            path: '/followup-management/task-lists',
            name: 'task-lists',
            // icon: 'edit',
            component: './FollowupManagement/TaskManagement/index',
          },
          {
            // 单个随访任务患者统计列表
            path: '/followup-management/task-lists/table/:followupId',
            name: 'details-table',
            icon: 'edit',
            component: './FollowupManagement/TaskDetails/index',
            hideInMenu: true,
          },
          {
            // 单个随访任务图形分析统计
            path: '/followup-management/task-lists/chart/:followupId',
            name: 'details-chart',
            icon: 'area-chart',
            component: './FollowupManagement/TaskDetailsChart/index',
            hideInMenu: true,
          },
          {
            path: '/followup-management/create',
            name: 'create',
            // icon: 'edit',
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
                // 发布statistics
                path: '/followup-management/create/step4',
                name: 'issue',
                component: './FollowupManagement/Create/Step4',
                hideInMenu: true,
              },
            ],
          },
          // {
          //   // 全部随访的统计分析
          //   path: '/followup-management/statistics',
          //   name: 'statistics',
          //   icon: 'table',
          //   component: './FollowupManagement/Statistics/index',
          // },
          // {
          //   // 单个随访任务图形分析统计
          //   path: '/followup-management/statistics/detail/:followupId',
          //   name: 'statistics-detail',
          //   icon: 'bar-chart',
          //   component: './FollowupManagement/Statistics/detail',
          //   hideInMenu: true,
          // }
        ],
      },
      {
        path: '/appointment-tracking',
        name: 'appointment-tracking',
        icon: 'book',
        component: './AppointmentTracking/List',
      },
      {
        path: '/appointment-tracking/edit',
        name: 'appointment-tracking-edit',
        icon: 'book',
        component: './AppointmentTracking/Edit',
        hideInMenu: true,
      },
      {
        path: '/nursing-tracking',
        name: 'nursing-tracking',
        icon: 'book',
        component: './ArchivesManagement/index',
      },
      {
        path: '/concern-management',
        name: 'concern-management',
        icon: 'book',
        routes: [
          {
            // 节日问候
            path: '/concern-management/festival-concern',
            name: 'festival-concern',
            // icon: 'edit',
            component: './FollowupManagement/TaskManagement/index',
          },
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
      },
      {
        path: '/online-service',
        name: 'online-service',
        icon: 'book',
        component: './OnlineService',
      },
      {
        path: '/followup-configuration',
        name: 'followup-configuration',
        icon: 'tool',
        routes: [
          {
            path: '/followup-configuration',
            redirect: '/followup-configuration/Questionnaire',
          },
          {
            path: '/followup-configuration/Questionnaire',
            name: 'questionnaire',
            // icon: 'snippets',
            component: './FollowupConfiguration/Questionnaire',
          },
          // {
          //   path: '/followup-configuration/Questionnaire/Create',
          //   name: 'questionnaire-create',
          //   icon: 'snippets',
          //   component: './FollowupConfiguration/QuestionnaireCreate',
          //   hideInMenu: true
          // },
          {
            path: '/followup-configuration/questionnaire/create',
            // name: 'questionnaire-create',
            icon: 'edit',
            component: './FollowupConfiguration/Questionnaire/Create/Layout',
            hideInMenu: true,
            routes: [
              {
                path: '/followup-configuration/questionnaire/create',
                redirect: '/followup-configuration/questionnaire/create/step1',
              },
              {
                // 选择任务类型
                path: '/followup-configuration/questionnaire/create/step1',
                // name: 'questionnaire-create1',
                component: './FollowupConfiguration/Questionnaire/Create/Step1',
                hideInMenu: true,
              },
              {
                // 选择对象
                path: '/followup-configuration/questionnaire/create/step2',
                // name: 'questionnaire-create2',
                component: './FollowupConfiguration/Questionnaire/Create/Step2',
                hideInMenu: true,
              },
              {
                // 编辑任务内容
                path: '/followup-configuration/questionnaire/create/step3',
                // name: 'questionnaire-create3',
                component: './FollowupConfiguration/Questionnaire/Create/Step3',
                hideInMenu: true,
              },
            ],
          },
          {
            path: '/followup-configuration/mission-care',
            name: 'mission-care',
            // icon: 'heart',
            component: './FollowupConfiguration/MissionCare',
          },
          {
            path: '/followup-configuration/medium',
            name: 'medium',
            // icon: 'wechat',
            component: './FollowupConfiguration/Medium',
          },
        ],
      },
      {
        path: '/knowledge',
        name: 'knowledge',
        icon: 'bar-chart',
        routes: [
          {
            path: '/knowledge/medicine',
            name: 'medicine',
            redirect: '/followup-configuration/questionnaire/create/step1',
          },
          {
            path: '/knowledge/nursing',
            name: 'nursing',
            redirect: '/followup-configuration/questionnaire/create/step1',
          },
          {
            path: '/knowledge/faq',
            name: 'faq',
            redirect: '/followup-configuration/questionnaire/create/step1',
          },
        ],
      },
      {
        path: '/statistics',
        name: 'statistics',
        icon: 'bar-chart',
        component: './Statistics/Analysis',
      },

      // {
      //   path: '/schedule-reminder',
      //   name: 'schedule-reminder',
      //   icon: 'book',
      //   routes: [
      //     {
      //       path: '/schedule-reminder/create',
      //       name: 'create',
      //       icon: 'edit',
      //       // component: './ScheduleReminder/Create',
      //     },
      //     {
      //       path: '/schedule-reminder/management',
      //       name: 'management',
      //       icon: 'edit',
      //       // component: './ScheduleReminder/Management',
      //     },
      //   ],
      // },

      {
        path: '/system-settings',
        name: 'system-settings',
        icon: 'setting',
        routes: [
          {
            path: '/system-settings/user',
            name: 'user-add',
            icon: 'edit',
            // component: './ScheduleReminder/Create',
          },
          {
            path: '/system-settings/permission',
            name: 'permission',
            icon: 'check',
            // component: './ScheduleReminder/Management',
          },
          {
            path: '/system-settings/record',
            name: 'record',
            icon: 'read',
            // component: './ScheduleReminder/Management',
          },
          {
            path: '/system-settings/monitor ',
            name: 'monitor',
            icon: 'book',
            // component: './Monitor',
          },
        ],
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
