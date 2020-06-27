import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

 


let instance = null;
let router = null;

// if (!window.__POWERED_BY_QIANKUN__) {
//   render();
// }
render();
/**
 * 渲染函数
 * 主应用生命周期钩子中运行/子应用单独启动时运行
 */
function render(props = {}) {
  if (props) {
    // 注入 actions 实例
    console.log('主应用生命周期钩子中运行', props);
    // actions.setActions(props);
  }

  // 挂载应用
  instance = new Vue({
    render: h => h(App),
  }).$mount('#app');
}

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('vue mount', props);
  render(props);
}

export async function unmount() {
  console.log('vue unmount');
  instance.$destroy();
  instance = null;
  router = null;
}
