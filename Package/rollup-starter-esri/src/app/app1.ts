import * as esri from 'esri-service';
import { loadModules } from 'esri-loader';

export class App {

    private sceneView: __esri.SceneView;

    constructor(private container: HTMLDivElement) { }

    public run() {
        this.init().then(() => {
            console.log('app init');
        }).catch(ex => {
            console.error(ex);
        });
    }

    private async init(): Promise<void> {
        await this.initMapView();
        // add your code here.
    }

    private async initMapView(): Promise<void> {
        const map = await esri.createWebScene({
            basemap: 'satellite',
            ground: 'world-elevation',
        });
        this.sceneView = await esri.createSceneView({
            container: this.container,
            map: map,
            zoom: 7,
            center: {
                longitude: 113.2,
                latitude: 23.4
            },
            viewingMode: 'global'
        });
        window['_sceneView'] = this.sceneView;
        await this.sceneView.when();
        console.log('SceneView inited!');
    }

}
