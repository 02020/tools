/** @format */
 
// import shared from './shared';
import shared from './shared/index'

import { loadMicroApp, start, addGlobalUncaughtErrorHandler, runAfterFirstMounted } from 'qiankun';

// import apps from "./apps";

// registerMicroApps(apps, {
//   beforeLoad: (app: any) => {
//     NProgress.start();
//     console.log("before load", app.name);
//     return Promise.resolve();
//   },
//   afterMount: (app: any) => {
//     NProgress.done();
//     console.log("after mount", app.name);
//     return Promise.resolve();
//   },
// });

// todo
// loadMicroApp({
//   name: 'esriMap',
//   entry: '//localhost:10101',
//   container: '#esri-gis',
//   props: { shared },
// });

loadMicroApp({
  name: 'vue',
  entry: '//localhost:10200',
  container: '#MicroApp',
  props: { shared },
});

/**
 * 全局
 */
addGlobalUncaughtErrorHandler((event ) => {
  console.error(event);
  const { message: msg } = event;
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    console.error('子应用加载失败，请检查应用是否可运行');
  }
});

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});

export default start;
