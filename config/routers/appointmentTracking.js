const MODLE = 'AppointmentTracking';
export default {
  path: '/appointment-tracking',
  name: 'appointment-tracking',
  icon: 'project',
  routes: [
    {
      path: '/appointment-tracking',
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
