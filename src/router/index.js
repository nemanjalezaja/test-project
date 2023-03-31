import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/pages/Main.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/Home.vue'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/Users.vue'),
      },
      {
        path: '/users/:id',
        name: 'UserProfile',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/Profile.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/Profile.vue'),
      },
    ],
    meta: {
      guard: 'auth',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/Login.vue'),
    meta: {
      guard: 'guest',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/Register.vue'),
    meta: {
      guard: 'guest',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

const guards = {
  auth: (to, from, next) => {
    if (localStorage.getItem('accessToken')) {
      return next();
    }
    return next('/login');
  },
  guest: (to, from, next) => {
    if (localStorage.getItem('accessToken')) {
      return next('/');
    }
    return next();
  },
};

router.beforeEach((to, from, next) => {
  const routeGuard = to.meta.guard;
  if (routeGuard) {
    return guards[routeGuard](to, from, next);
  }
  return next();
});

export default router;
