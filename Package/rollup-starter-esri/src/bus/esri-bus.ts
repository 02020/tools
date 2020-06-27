/**
 * @format
 * @module event-bus/bus-core
 */
import Graphic from 'esri/Graphic';
import Popup from 'esri/widgets/Popup';
import View from 'esri/views/View';
import { VueConstructor } from 'vue';
// import store from '@/store';
import VueBus from './bus-core';
import baseLayer from '../layer/baseLayer';
import layerCURD from './layer-curd';
import esriMapEmit from './emit';
import { initDrawEmit, initEsriEmit } from './initEvents';

// 加载地图其他组件
import Measure from '../utils/measure-utils';

class EsriBus extends VueBus {
  layerList: Array<any>;
  view: View;
  hitTest: boolean; // 控制是否或是点击图形
  isPopup: boolean; // 点击是否显示弹窗

  /** 提供给组件使用 */
  private currentGraphic: Graphic;

  enable: boolean; // 启用事件分发

  constructor(vue: VueConstructor) {
    super(vue);
    this.layerList = [];
    this.hitTest = false;
    this.isPopup = true;
    this.enable = true;
  }
  // todo
  /**
   * @event curd
   * @param {*} id
   * @param {*} name
   * @param {*} type
   * @param {*} group
   */
  curd(id, name, type, group = 'default') {
    this.layerList.push({ id, name, type, group });

    ['add', 'select', 'update', 'delete'].forEach((x) => {
      // const eventName = 'esri' === layerId ? layerId : current + '-' + layerId;

      var m = 'esri' === id ? esriMapEmit(x, this) : layerCURD[x];

      this.on(id + '-' + x, m);
    });
  }

  /**
   * 增加图层
   * @function add
   * @param {Object} layerInfo 图层信息
   * @param {String} group 组名
   */
  add(layerInfo, group) {
    layerInfo.visible = false;
    let ly = baseLayer(layerInfo);
    console.log('add', ly);
    this.curd(ly.id, layerInfo.layerName, layerInfo.layerType, group);
    if (!!this.findLayerById(ly.id)) return;

    this.view.map.add(ly);
  }

  /**
   * 增加多个图层
   * @function addMany
   * @param {Array} list List<layerInfo>
   * @param {String} group 组名
   */
  addMany(list, group) {
    // const _list = list.map((x) => {
    //   x.visible = false;
    //   let ly = baseLayer(x);
    //   this.curd(ly.id, x.layerName, x.layerType, group);
    //   return ly;
    // });
    // 增加地图已经存在判断
    const _list = list.reduce((init, cur) => {
      cur.visible = false;
      let ly = baseLayer(cur);
      if (!this.findLayerById(cur.id)) {
        this.curd(ly.id, cur.layerName, cur.layerType, group);
        init.push(cur);
        return init;
      }
    }, []);

    console.log(_list);

    // fixme 暂时注释掉
    // this.view.map.addMany(_list);
  }
  // 获取图层
  findLayerById(id) {
    return this.view.map.findLayerById(id);
  }
  /**
   *  显示弹窗
   */
  popupInfo(response) {
    if (!this.isPopup || !this.hitTest) {
      this.currentGraphic = null;
      return;
    }
    const view = this.view;

    response.results.forEach((x) => {
      if ((x.graphic.type = 'polygon')) {
        // x.graphic.centroid
      }

      this.currentGraphic = x.graphic;

      const shape = x.graphic.$shape;

      if (!shape || !shape.popup) return;

      const comp = shape.popup.content;
      console.log('x.graphic', x.graphic.attributes);
      console.log('组件', comp);

      if (!comp) return;

      Object.keys(comp.attrs).forEach((key) => {
        comp.attrs[key] = x.graphic.attributes[key];
      });

      this.popup({
        title: shape.popup.title,
        content: comp.$el,
        location: x.mapPoint,
        visible: true,
        dockOptions: {
          buttonEnabled: false,

          breakpoint: {
            width: 600,
            height: 1000,
          },
        },
      });
      // x.graphic.layer.remove(x.graphic)  centroid
    });
  }

  popup(keys) {
    const { popup } = this.view;
    Object.keys(keys).forEach((key) => {
      popup[key] = keys[key];
    });

    console.log('修改-popup', popup);
  }

  /**
   * 修改图形 属性\样式
   * @param attrs
   * @param symbol
   */
  update(attrs, symbol) {
    if (!this.currentGraphic) {
      console.log('图形不存在');
      return;
    }
    const shape = this.currentGraphic.$shape;
    console.log('esri-update', arguments);
    if (!!attrs) shape.attrs(attrs);
    if (!!symbol) shape.style(symbol);
  }
  /**
   *  删除
   */
  delete() {
    if (!this.currentGraphic) {
      console.log('图形不存在');
      return;
    }
    this.currentGraphic.layer.remove(this.currentGraphic);
  }

  remove() {}

  removeMany() {}

  /** 修改图层 */
  reorder() {}

  init(view, current) {
    initEsriEmit(view, this, current);
  }
}

// 写成Vue插件形式，直接引入然后Vue.use($EventBus)进行使用
let $EventBus = {};

$EventBus.install = (Vue, option) => {
  const events = new EsriBus(Vue);

  Vue.events = events;

  Object.defineProperty(Vue.prototype, '$bus', {
    get() {
      return events;
    },
  });

  Vue.mixin({
    beforeDestroy() {
      //this.$eventBus.$offByUid(this._uid);
    },
    beforeCreate() {
      // console.log("this.$options", this.$options);
      if (typeof this.$options.events !== 'object') return;

      var eventMap = {};
      for (var key in this.$options.events) {
        eventMap[key] = this.$options.events[key].bind(this);
      }
      const component = this;

      this.$once('hook:beforeMount', () => {
        for (var key in eventMap) {
          events.on(key, eventMap[key]);
        }

        events.once('init', (view) => {
          // 代码注入 组件定义角色 注入指定方法
          component.initDraw = initDrawEmit(events.view, events);
          Measure.init(events.view);
          component.$Measure = Measure;
          console.log('init', component);
        });
      });

      this.$once('hook:beforeDestroy', () => {
        for (var key in eventMap) {
          events.off(key, eventMap[key]);
        }
        eventMap = null;

        // todo 还需要删除组件注册的
      });
    },
  });
};

export default $EventBus;

// https://github.com/ytftianwen/dynamic-vue-bus/blob/master/index.js
// https://github.com/wowill/vue-event-bus/blob/master/index.js
// https://juejin.im/post/5ea1a96c51882573672232a7  装饰器
