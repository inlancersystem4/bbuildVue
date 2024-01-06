import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore, useAlertStore } from '@/stores';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: import('../pages/home.vue')
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: () => import('../pages/userCrud/UserList.vue')
    },
    {
      path: '/add-user',
      name: 'AddUser',
      component: () => import('../pages/userCrud/AddUser.vue')
    },
    {
      path: '/edit-user/:id',
      name: 'EditUser',
      component: () => import('../pages/userCrud/EditUser.vue')
    },
    {
      path: '/customerlist',
      name: 'CustomerList',
      component: () => import('../pages/customerCrud/CustomerList.vue')
    },
    {
      path: '/add-customer',
      name: 'AddCustomer',
      component: () => import('../pages/customerCrud/AddCustomer.vue')
    },
    {
      path: '/edit-customer/:id',
      name: 'EditCustomer',
      component: () => import('../pages/customerCrud/EditCustomer.vue')
    },
    {
      path: '/roles',
      name: 'Roles',
      component: () => import('../pages/roles/Roles.vue')
    },
    {
      path: '/add-role',
      name: 'AddRole',
      component: () => import('../pages/roles/AddRole.vue')
    },
    {
      path: '/edit-role/:name/:id',
      name: 'EditRole',
      component: () => import('../pages/roles/EditRole.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../pages/profile/Profile.vue')
    },
    {
      path: '/project-list',
      name: 'ProjectList',
      component: () => import('../pages/project/ProjectList.vue')
    },
    {
      path: '/project/:projectId',
      name: 'Project',
      component: () => import('../pages/project/Project.vue')
    },
    {
      path: '/inventory-list',
      name: 'InventeryList',
      component: () => import('../pages/inventeryList/List.vue')
    },
    {
      path: '/inventory-details/:inventoryId',
      name: 'InventeryDetails',
      component: () => import('../pages/inventeryList/subcomponents/InventeryDetails.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('../pages/Settings.vue')
    },
    {
      path: '/reminder-list',
      name: 'ReminderList',
      component: () => import('../pages/reminder/ReminderList.vue')
    },
    {
      path: '/reminder/:reminderId',
      name: 'AddReminder',
      component: () => import('../pages/reminder/AddReminder.vue')
    },
    {
      path: '/edit-reminder/:reminderId',
      name: 'EditReminder',
      component: () => import('../pages/reminder/EditReminder.vue')
    },
    {
      path: '/operation-list',
      name: 'OperationList',
      component: () => import('../pages/operation/OperationList.vue')
    },
    {
      path: '/amenities-list',
      name: 'AmenitiesList',
      component: () => import('../pages/amenitie/AmenitiesList.vue')
    },
    {
      path: '/log-in',
      name: 'Login',
      component: () => import('../auth/Login.vue')
    },
    {
      path: '/forget-password',
      name: 'Forget_password',
      component: () => import('../auth/Forget_password.vue')
    },
    {
      path: '/page-not-found',
      name: '404',
      component: () => import('../pages/404.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/page-not-found'
    }
  ]
})

router.beforeEach(async (to) => {
  const alertStore = useAlertStore();
  alertStore.clear();

  const publicPages = ['/log-in', '/forget-password'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/log-in';
  }
});

export default router
