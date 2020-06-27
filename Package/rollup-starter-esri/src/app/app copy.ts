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
            .catch((ex) => {
                console.error(ex);
            });
    }

    private async init(): Promise<void> {
        await this.initMapView();
        // add your code here.
    }

    private async initMapView(): Promise<void> {
        // const map = await esri.createWebScene({
        //     basemap: 'satellite',
        //     ground: 'world-elevation',
        // });

        // const vectorBaseLayer =  await esri.createVectorTileLayer({
        //     url: `https://www.arcgis.com/sharing/rest/content/items/2afe5b807fa74006be6363fd243ffb30/resources/styles/root.json`,
        //   });
        //   const vectorBaseReference =  await esri.createVectorTileLayer({
        //     url: `https://www.arcgis.com/sharing/rest/content/items/ba52238d338745b1a355407ec9df6768/resources/styles/root.json`,
        //     opacity: 0.7,
        //   });
        //   const vectorDetailLayer =  await esri.createVectorTileLayer({
        //     url: `https://www.arcgis.com/sharing/rest/content/items/97fa1365da1e43eabb90d0364326bc2d/resources/styles/root.json`,
        //     opacity: 0.35,
        //   });



        // const basemap = await esri.createBasemap({
        //     baseLayers: [vectorBaseLayer, vectorDetailLayer],
        //     referenceLayers: [vectorBaseReference],
        // });
        // this.sceneView = await esri.createSceneView({
        //     container: this.container,
        //     map: map,
        //     zoom: 7,
        //     center: {
        //         longitude: 113.2,
        //         latitude: 23.4
        //     },
        //     viewingMode: 'global'
        // });

        const esriMap = await esri.createMap({
            basemap: "osm"
        });

        this.view = await esri.createMapView({
            container: this.container,
            map: esriMap,
            center: [-99.74405, 38.1374], // longitude, latitude
            zoom: 3,
        });

        window["_sceneView"] = this.sceneView;
        await this.view.when();
        console.log("SceneView inited!");
    }
}
