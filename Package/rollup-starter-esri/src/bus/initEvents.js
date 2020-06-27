import Draw from 'esri/views/draw/Draw'
// import Draw from '../../script/Draw'
import Graphic from 'esri/Graphic'
import _ from 'lodash'
import geometryEngine from 'esri/geometry/geometryEngine'
import { createGraphic } from './draw'
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import Shape from './graphic'
import { createSymbol, getSymbol, symbol } from './symbols';

import Vue from 'vue';
/**
 *  MapView 事件
 */
const MAP_VIEW_EVENTS = ['blur', 'click', 'double-click', 'drag', 'focus', 'hold', 'mouse-wheel', 'resize', 'pointer-move'];

/**
 * 绘图事件
 */
const DRAW_EVENTS = ['point', "multipoint", 'polyline', 'polygon', 'rectangle']


/**
 * 注册地图事件, 加载地图的时候使用
 * @param {*} view 
 * @param {*} bus 
 * @param {*} current 
 */
const esriEmit = (view, bus, current = 'esri') => {
  bus.view = view;

  for (var i = 0; i < MAP_VIEW_EVENTS.length; i++) {
    const eventName = MAP_VIEW_EVENTS[i];
    view.on(eventName, (ev) => {

      if (!bus.enable) {
        console.log('停止分发事件!')
        return
      }


      if (eventName == 'click' && !!bus.hitTest) {
        view.hitTest(ev).then(function (response) {
          // console.log("hitTest", ev)
          // view.popup.location = response.mapPoint

          // 点击到图形处理
          if (response.length == 1) {

          }

          bus.emit(current + '-' + eventName, response);
        })
      } else {
        // eventName == 'click' && console.log("click", ev)
        bus.emit(current + '-' + eventName, ev);
      }
    });
  }
  // 地图改变事件
  view.map.allLayers.on('change', (params) => {
    bus.emit('esri-change', params);
  });
}

/**
 * 注册图形编辑事件
 * @param {*} view 
 * @param {*} bus 
 */
const drawEmit = (view, bus) => (drawAction, title, content) => {

  var draw = new Draw({
    view: view
  });


  var shape = new Shape({
    popup: { title, content },
    layer: graphicsLayer,
    text: '我走了',
    view,
    //  vertices: [[118.10783631892782, 24.5421018888646], [118.08451650669541, 24.49683401806049]],
    symbol: createSymbol(drawAction),
    type: drawAction,
    attributes: {}
  });



  var graphicsLayer = new GraphicsLayer({ id: "draw" });
  graphicsLayer.add(shape.graphic)
  view.map.add(graphicsLayer)



  var action = draw.create(drawAction);

  //todo 停止分发地图事件
  bus.enable = false

  action.on("vertex-add", function (evt) {
    shape.update(evt.vertices)
  });


  action.on("cursor-update", function (evt) {
    // point : { coordinates }
    shape.setMousePosition(evt.mapPoint || evt.coordinates)
  });


  action.on("draw-complete", function (evt) {
    bus.enable = true
    if ('point' == drawAction) {
      shape.update(evt.coordinates)
    }
    shape.clearTemp()
    // 返回中心点
  });


  action.on("vertex-remove", function (evt) {
    //  measureLine(evt.vertices);
    bus.emit(evt.type, evt.vertices)
  });

}



export { drawEmit as initDrawEmit, esriEmit as initEsriEmit }




/**
 *
 *
coordinates


  // view.popup.open({
  //   title: props.title,
  //   visible: false,

  //   // spinnerEnabled: false,


  // });


  view.popup.watch("visible", function (response) {
    console.log("view.popup", response)

    // view.popup.visible = true;
  });

pointer-move
  {
  pointerId: Number,
  pointerType: "mouse","touch",
  x: Number,
  y: Number,
  button: Number,
  buttons: Number,
  type: "pointer-move",
  stopPropagation: Function,
  timestamp: Number,
  native: Object
  }





 */