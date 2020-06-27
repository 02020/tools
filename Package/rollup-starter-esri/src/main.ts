import { loadScript, loadModules } from 'esri-loader';

import { App } from './app/app'

import './main.css';

let app: App;

document.addEventListener('DOMContentLoaded', e => {
    // get request token first
    initArcGisJsApi()
        .then(() => {
            // and then run app
            app = new App(document.getElementById('map') as HTMLDivElement);
            app.run();
        });

});

async function initArcGisJsApi(): Promise<void> {
    const baseUrl = 'https://app.gdeei.cn/arcgis-js-api/library/4.14';
    loadScript({
        url: `${baseUrl}/init.js`,
        css: `${baseUrl}/esri/css/main.css`,
        dojoConfig: {
            async: true,
            locale: 'zh-cn',
            has: {
                'esri-native-promise': true
            }
        }
    });
    // const [config] = await loadModules<[__esri.config]>(['esri/config']);
    // config.request.trustedServers.push('');
}
