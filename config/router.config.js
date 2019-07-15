import concern from './routers/concern';
import appointmentTracking from './routers/appointmentTracking';
import nursingTracking from './routers/nursingTracking';
import satisfactionManagement from './routers/satisfactionManagement';
import followupConfiguration from './routers/followupConfiguration';

export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './User/Register',
      },
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
      {
        path: '/',
        redirect: '/calendar',
        authority: ['admin', 'user'],
      },
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
      satisfactionManagement,
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
        ],
      },
      appointmentTracking,
      nursingTracking,
      concern,
      {
        path: '/online-service',
        name: 'online-service',
        icon: 'book',
        component: './OnlineService',
      },
      followupConfiguration,
      {
        path: '/knowledge',
        name: 'knowledge',
        icon: 'bar-chart',
        routes: [
          {
            path: '/knowledge/medication',
            name: 'medication',
            icon: 'bar-chart',
            component: './KnowledgeBase/MedicationGuide',
          },
          {
            path: '/knowledge/nursing',
            name: 'nursing',
            icon: 'bar-chart',
            component: './KnowledgeBase/NursingKnowledge',
          },
          {
            path: '/knowledge/faq',
            name: 'faq',
            icon: 'bar-chart',
            component: './KnowledgeBase/CommonProblem',
          },
          {
            path: '/knowledge/nursing/update',
            name: 'nursing-update',
            hideInMenu: true,
            component: './KnowledgeBase/UpdatePage',
          },
          {
            path: '/knowledge/faq/update',
            name: 'faq-update',
            hideInMenu: true,
            component: './KnowledgeBase/UpdatePage',
          },
        ],
      },
      {
        path: '/statistics',
        name: 'statistics',
        icon: 'bar-chart',
        routes: [
          {
            path: '/statistics/1',
            name: 'base',
            icon: 'area-chart',
            component: './Statistics/Analysis',
          },
          {
            name: 'satisfaction',

            icon: 'area-chart',
            path: '/statistics/2',
            component: './SatisfactionManagement/Statistics',
          },
          {
            path: '/statistics/3',
            name: 'followup',
            icon: 'area-chart',
            component: './FollowupManagement/TaskDetailsChart/index',
          },
          {
            path: '/statistics/4',
            name: 'work',
            icon: 'area-chart',
            component: './FollowupManagement/TaskDetailsChart/index',
          },
          {
            path: '/statistics/5',
            name: 'action',
            icon: 'area-chart',
            component: './FollowupManagement/TaskDetailsChart/index',
          },
          {
            path: '/statistics/6',
            name: 'research',
            icon: 'area-chart',
            component: './FollowupManagement/TaskDetailsChart/index',
          },
        ],
      },
      {
        path: '/system-settings',
        name: 'system-settings',
        icon: 'setting',
        routes: [
          {
            path: '/system-settings/user',
            name: 'user-add',
            icon: 'edit',
            component: './Management/User',
          },
          {
            path: '/system-settings/role',
            name: 'role',
            icon: 'aliwangwang',
            component: './Management/Role',
          },
          {
            path: '/system-settings/permission',
            name: 'permission',
            icon: 'check',
            component: './Management/Permission',
          },
          {
            path: '/system-settings/monitor-logs',
            name: 'monitor-logs',
            icon: 'read',
            component: './Management/MonitorLogs',
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
