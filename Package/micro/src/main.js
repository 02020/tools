/** @format */
import Vue from 'vue';
import App from './App.vue';

import './esriconfig';

Vue.config.productionTip = false;
console.log(`Node environment: ${process.env.NODE_ENV}`);
console.log(`VUE_APP_TITLE from .env: ${process.env.VUE_APP_TITLE}`);

// const router = new VueRouter({
//   mode: "history",
//   routes,
// });

new Vue({
  render: (h) => h(App),
}).$mount('#app');

console.log("global",global)
console.log("window",window)