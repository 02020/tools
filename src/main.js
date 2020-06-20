/** @format */

import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import ProxyVue from './learn/mvvm-proxy/Proxy.Vue'

let vm = new ProxyVue({
  el: '#proxy-app',
  data: {
    num: 0,
    arr: [],
  },
  methods: {
    addList() {
      this.arr.push(this.num);
      console.log(this.arr);
    },
  },
});

createApp(App).mount('#app');
