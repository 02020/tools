import * as esri from "esri-service";
import { loadModules } from "esri-loader";

export class App {
    private sceneView: __esri.SceneView;
    private view: __esri.MapView;

    constructor(private container: HTMLDivElement) {}

    public run() {
        this.init()
            .then(() => {
                console.log("app init");
            })
            .catch(ex => {
                console.error(ex);
            });
    }

    private async init(): Promise<void> {
        await this.initMapView();
        // add your code here.
    }

    private async initMapView(): Promise<void> {
        const map = await esri.createMap({
            basemap: "satellite" // satellite 影像   topo 矢量
        });
        this.view = await esri.createMapView({
            container: this.container,
            map: map,
            zoom: 16,
            center: {
                longitude: 118.12,
                latitude: 24.48
            }
        });
        window["_view"] = this.view;
        this.view.on("click", ev => {
            console.log(ev, this.view.toMap(ev));
        });
        await this.view.when();
        console.log("SceneView inited!");
    }
}
