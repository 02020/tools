/** @format */

import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import './test/test'

const app = createApp(App);
app.mount("#app");

 
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}