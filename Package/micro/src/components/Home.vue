<template>
  <!-- Navbar -->

  <div id="Home">
    <navbar @panel-change="handlePanel"></navbar>
    <!-- Map  -->
    <esri-map></esri-map>
    <panel-template v-for="(panel, index) in panels" :title="panel.name" :panelid="panel.panelid" :glyphicon="panel.glyphicon" :key="index+1" :position="panel.position">
      <component v-bind:is="panel.panelid" v-bind:mapinfo="mapView"></component>
    </panel-template>

  </div>
</template>

<script>

import Panel from './Panel.vue';
import Navbar from './Navbar.vue';
import EsriMap from './Map.vue';

import InfoPanel from './Panels/InfoPanel.vue';
import LegendPanel from './Panels/LegendPanel.vue';
import QueryPanel from './Panels/QueryPanel.vue';
import LoginPanel from './Panels/LoginPanel.vue';
import BottomPanel from './Panels/BottomPanel.vue';

//const req = require.context('./Panels', true, /.*\.vue$/)
//console.log(req.keys());

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    "bottom-panel": BottomPanel,
    "navbar": Navbar,
    "panel-template": Panel,
    "info-panel": InfoPanel,
   "esri-map": EsriMap,
    "legend-panel": LegendPanel,
    "query-panel": QueryPanel,
    "login-panel": LoginPanel  
    }
  ,
  methods: {
    handlePanel: function (chosenpanel, position) {
      //remove panel with same position
      this.activePanels = this.activePanels.filter(panel => panel.position != position);
      //get new panel
      let newPanel = this.panels.filter(panel => panel.panelid == chosenpanel);
      this.activePanels.push(newPanel[0])
      //}

    }
  },
  data: function () {
    return {
      panels: [
        { "panelid": "query-panel", "name": "Query", "glyphicon": "esri-icon-question" },
        { "panelid": "info-panel", "name": "About", "glyphicon": "esri-icon-notice-round" },
        { "panelid": "legend-panel", "name": "Legend", "glyphicon": "esri-icon-collection" },
        { "panelid": "bottom-panel", "name": "Bottom", "glyphicon": "esri-icon-layer-list", "position": "bottom" },
        { "panelid": "login-panel", "name": "Login", "glyphicon": "esri-icon-user" },

      ],
      activePanels: [],
      //just used to map intialPanels to active panels so as not to repeat code...
      initialPanels: ['query-panel'],
      mapView: null,
      title: "ArcGIS Webpack Vue Boilerplate",
      subtitle: "A Vue CLI 3 Starter Template using ArcGIS Webpack Plugin"

    }
  },

  beforeMount: function () {
    this.activePanels = this.panels.filter((panel) => {
      let iPanels = this.initialPanels;
      return iPanels.includes(panel.panelid);
    });
  }
}
</script>