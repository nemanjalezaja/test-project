import Vue from 'vue';
import moment from 'moment';
import ToastPlugin from 'vue-toast-notification';

import 'vue-toast-notification/dist/theme-default.css';
import globaComponents from '@/plugins/globalComponents';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import '@/assets/tailwind.css';

Object.keys(globaComponents.components).forEach((key) => {
  Vue.component(key, globaComponents.components[key]);
});

// THESE FILTERS SHOULD BE IN SEPERATED FILE...
export function momentToDate(seconds) {
  return moment.unix(seconds).local().format('DD.MM HH:mm');
}

export function momentToDateSeconds(seconds) {
  return moment.unix(seconds).local().format('DD.MM HH:mm:ss');
}

export function momentToDay(seconds) {
  return moment.unix(seconds).local().format('ddd');
}

export function momentToHour(seconds) {
  return moment.unix(seconds).local().format('HH:mm');
}

Vue.filter('momentToDate', momentToDate);
Vue.filter('momentToDateSeconds', momentToDateSeconds);
Vue.filter('momentToDay', momentToDay);
Vue.filter('momentToHour', momentToHour);

Vue.config.productionTip = false;

// THIS IS NOT NEEDED BECAUSE WE CALL SERVER FROM STORE ACTIONS
// import { api } from './api/axios';
// Vue.prototype.$api = api;

Vue.use(ToastPlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
