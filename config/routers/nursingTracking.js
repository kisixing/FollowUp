const MODLE = 'NursingTracking';

export default {
  path: '/nursing-tracking',
  name: 'nursing-tracking',
  icon: 'project',
  routes: [
    {
      path: '/nursing-tracking',
      redirect: 'list',
    },
    {
      path: 'list',
      name: 'list',
      component: `${MODLE}/List`,
      hideInMenu: true,
    },
    {
      path: 'edit',
      name: 'edit',
      component: `${MODLE}/Edit`,
      hideInMenu: true,
    },
    {
      path: 'detail',
      name: 'detail',
      component: `${MODLE}/Detail`,
      hideInMenu: true,
    },
  ],
};
